import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTicketAlt, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '../config/config';
import Loader from '../components/Loader';
import { formatDate, formatCurrency } from '../utils/format';
import { useAuth } from '../context/AuthContext';

const MisReservas = () => {
  const { user, isAuthenticated } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        if (!isAuthenticated) {
          setError('Debes iniciar sesión para ver tus reservas');
          setLoading(false);
          return;
        }

        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/reservas/mis-reservas`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setReservas(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener reservas:', err);
        setError('No pudimos cargar tus reservas. Por favor, intenta de nuevo más tarde.');
        setLoading(false);
      }
    };

    fetchReservas();
  }, [isAuthenticated]);

  const handleCancelarReserva = async (reservaId) => {
    if (!window.confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/reservas/${reservaId}/cancelar`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Actualizar la lista de reservas
      const updatedReservas = reservas.map(reserva => 
        reserva.id === reservaId ? { ...reserva, estado: 'cancelada' } : reserva
      );
      setReservas(updatedReservas);
      setLoading(false);
      alert('Reserva cancelada correctamente');
    } catch (err) {
      console.error('Error al cancelar reserva:', err);
      setError('No pudimos cancelar tu reserva. Por favor, intenta de nuevo más tarde.');
      setLoading(false);
    }
  };

  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'confirmada':
        return <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">Confirmada</span>;
      case 'pendiente':
        return <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">Pendiente</span>;
      case 'cancelada':
        return <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">Cancelada</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">{estado}</span>;
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Ha ocurrido un error</h2>
          <p className="text-red-600 mb-6">{error}</p>
          {!isAuthenticated && (
            <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition duration-300">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (reservas.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mis Reservas</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <FaCalendarAlt className="text-gray-400 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No tienes reservas</h2>
          <p className="text-gray-600 mb-6">Aún no has realizado ninguna reserva para eventos.</p>
          <Link to="/eventos" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition duration-300">
            Explorar eventos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mis Reservas</h1>
      
      <div className="grid grid-cols-1 gap-8">
        {reservas.map((reserva) => (
          <div key={reserva.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gray-100 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{reserva.evento?.titulo}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaCalendarAlt className="mr-2" />
                    <span>{formatDate(reserva.evento?.fecha)}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <span className="ml-6">{reserva.evento?.hora}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{reserva.evento?.ubicacion}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  {getStatusBadge(reserva.estado)}
                </div>
              </div>
              
              <div className="md:w-2/3 p-6">
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <FaUsers className="mr-2 text-gray-600" />
                      <span>Número de plazas:</span>
                    </div>
                    <span className="font-semibold">{reserva.cantidad}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Precio por plaza:</span>
                    <span>{formatCurrency(reserva.precio_unitario)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200">
                    <span>Total:</span>
                    <span>{formatCurrency(reserva.total)}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-6">
                  <Link 
                    to={`/eventos/${reserva.evento_id}`} 
                    className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition duration-300"
                  >
                    Ver evento
                  </Link>
                  
                  {reserva.estado !== 'cancelada' && (
                    <button 
                      onClick={() => handleCancelarReserva(reserva.id)}
                      className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-red-50 transition duration-300 flex items-center"
                    >
                      <FaExclamationTriangle className="mr-2" />
                      Cancelar reserva
                    </button>
                  )}
                </div>
                
                {reserva.estado === 'pendiente' && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
                    <FaTicketAlt className="inline-block mr-2" />
                    Tu reserva está pendiente de confirmación. Recibirás un correo cuando sea confirmada.
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/eventos" className="bg-white border border-primary text-primary px-6 py-3 rounded-full hover:bg-gray-50 transition duration-300">
          Explorar más eventos
        </Link>
      </div>
    </div>
  );
};

export default MisReservas;