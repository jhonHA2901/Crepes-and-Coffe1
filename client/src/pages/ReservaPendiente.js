import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaClock, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTicketAlt } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '../config/config';
import Loader from '../components/Loader';
import { formatDate, formatCurrency } from '../utils/format';

const ReservaPendiente = () => {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Debes iniciar sesión para ver esta página');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/reservas/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setReserva(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener la reserva:', err);
        setError('No pudimos cargar los detalles de tu reserva. Por favor, contacta con atención al cliente.');
        setLoading(false);
      }
    };

    fetchReserva();
  }, [id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Ha ocurrido un error</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <Link to="/" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition duration-300">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!reserva) return null;

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 mb-8 text-center">
        <FaClock className="text-yellow-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-yellow-700 mb-2">Reserva en Proceso</h1>
        <p className="text-lg text-yellow-600 mb-4">Tu pago está siendo procesado.</p>
        <p className="text-gray-600">Te notificaremos por correo electrónico cuando se confirme tu reserva.</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="bg-primary text-white p-6">
          <h2 className="text-2xl font-bold">Detalles de la Reserva</h2>
          <p className="text-sm opacity-80">Código de reserva: #{reserva.id}</p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">{reserva.evento?.titulo}</h3>
            <div className="flex items-center text-gray-600 mb-2">
              <FaCalendarAlt className="mr-2" />
              <span>{formatDate(reserva.evento?.fecha)}</span>
              <span className="mx-2">|</span>
              <span>{reserva.evento?.hora}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <FaMapMarkerAlt className="mr-2" />
              <span>{reserva.evento?.ubicacion}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
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

          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2 flex items-center">
              <FaTicketAlt className="mr-2 text-yellow-500" />
              Estado de la reserva
            </h4>
            <div className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
              Pendiente de confirmación
            </div>
            <p className="mt-2 text-sm text-gray-600">
              El pago está siendo procesado. Una vez confirmado, recibirás un correo electrónico con los detalles de tu reserva.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/mis-reservas" className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition duration-300">
          Ver mis reservas
        </Link>
        <Link to="/eventos" className="bg-white border border-primary text-primary px-6 py-3 rounded-full hover:bg-gray-50 transition duration-300">
          Explorar más eventos
        </Link>
      </div>
    </div>
  );
};

export default ReservaPendiente;