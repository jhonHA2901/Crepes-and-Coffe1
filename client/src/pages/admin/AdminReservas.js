import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaEye, FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '../../config/config';
import { formatDate, formatCurrency } from '../../utils/format';
import Loader from '../../components/Loader';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroEvento, setFiltroEvento] = useState('');
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [eventos, setEventos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [reservaActual, setReservaActual] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        // Obtener todas las reservas
        const reservasResponse = await axios.get(`${API_URL}/reservas`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Obtener todos los eventos para el filtro
        const eventosResponse = await axios.get(`${API_URL}/eventos`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setReservas(reservasResponse.data);
        setEventos(eventosResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('Error al cargar los datos. Por favor, intenta de nuevo.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCambiarEstado = async (reservaId, nuevoEstado) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/reservas/${reservaId}/estado`, { estado: nuevoEstado }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Actualizar la lista de reservas
      const updatedReservas = reservas.map(reserva => 
        reserva.id === reservaId ? { ...reserva, estado: nuevoEstado } : reserva
      );
      setReservas(updatedReservas);
      
      alert(`Estado de la reserva actualizado a: ${nuevoEstado}`);
    } catch (err) {
      console.error('Error al cambiar estado de reserva:', err);
      alert('Error al actualizar el estado de la reserva. Por favor, intenta de nuevo.');
    }
  };

  const openModal = (reserva) => {
    setReservaActual(reserva);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setReservaActual(null);
  };

  // Filtrar reservas
  const reservasFiltradas = reservas.filter(reserva => {
    const matchesEstado = filtroEstado ? reserva.estado === filtroEstado : true;
    const matchesEvento = filtroEvento ? reserva.evento_id.toString() === filtroEvento : true;
    const matchesBusqueda = filtroBusqueda
      ? (reserva.usuario?.nombre?.toLowerCase().includes(filtroBusqueda.toLowerCase()) ||
         reserva.usuario?.email?.toLowerCase().includes(filtroBusqueda.toLowerCase()) ||
         reserva.id.toString().includes(filtroBusqueda))
      : true;
    return matchesEstado && matchesEvento && matchesBusqueda;
  });

  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'confirmada':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Confirmada</span>;
      case 'pendiente':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pendiente</span>;
      case 'cancelada':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Cancelada</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{estado}</span>;
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Reservas</h1>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
              <input
                type="text"
                value={filtroBusqueda}
                onChange={(e) => setFiltroBusqueda(e.target.value)}
                placeholder="Buscar por cliente o ID de reserva"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="md:w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por evento</label>
              <select
                value={filtroEvento}
                onChange={(e) => setFiltroEvento(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Todos los eventos</option>
                {eventos.map(evento => (
                  <option key={evento.id} value={evento.id}>{evento.titulo}</option>
                ))}
              </select>
            </div>
            <div className="md:w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por estado</label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plazas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservasFiltradas.length > 0 ? (
                reservasFiltradas.map(reserva => (
                  <tr key={reserva.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{reserva.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-gray-400 mr-2" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {reserva.evento?.titulo || 'Evento no disponible'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(reserva.evento?.fecha)} | {reserva.evento?.hora}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaUser className="text-gray-400 mr-2" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {reserva.usuario?.nombre || 'Usuario no disponible'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {reserva.usuario?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reserva.cantidad}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(reserva.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(reserva.estado)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(reserva.fecha_reserva)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal(reserva)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Ver detalles"
                        >
                          <FaEye />
                        </button>
                        
                        {reserva.estado !== 'confirmada' && (
                          <button
                            onClick={() => handleCambiarEstado(reserva.id, 'confirmada')}
                            className="text-green-600 hover:text-green-900"
                            title="Confirmar reserva"
                          >
                            <FaCheck />
                          </button>
                        )}
                        
                        {reserva.estado !== 'cancelada' && (
                          <button
                            onClick={() => handleCambiarEstado(reserva.id, 'cancelada')}
                            className="text-red-600 hover:text-red-900"
                            title="Cancelar reserva"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No se encontraron reservas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal para ver detalles de reserva */}
      {modalVisible && reservaActual && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Detalles de la Reserva #{reservaActual.id}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Estado de la reserva</h3>
                {getStatusBadge(reservaActual.estado)}
              </div>
              
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => {
                    handleCambiarEstado(reservaActual.id, 'confirmada');
                    setReservaActual({...reservaActual, estado: 'confirmada'});
                  }}
                  disabled={reservaActual.estado === 'confirmada'}
                  className={`px-3 py-1 rounded-md text-sm flex items-center ${reservaActual.estado === 'confirmada' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                >
                  <FaCheck className="mr-1" /> Confirmar
                </button>
                
                <button
                  onClick={() => {
                    handleCambiarEstado(reservaActual.id, 'pendiente');
                    setReservaActual({...reservaActual, estado: 'pendiente'});
                  }}
                  disabled={reservaActual.estado === 'pendiente'}
                  className={`px-3 py-1 rounded-md text-sm flex items-center ${reservaActual.estado === 'pendiente' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}
                >
                  <FaExclamationTriangle className="mr-1" /> Pendiente
                </button>
                
                <button
                  onClick={() => {
                    handleCambiarEstado(reservaActual.id, 'cancelada');
                    setReservaActual({...reservaActual, estado: 'cancelada'});
                  }}
                  disabled={reservaActual.estado === 'cancelada'}
                  className={`px-3 py-1 rounded-md text-sm flex items-center ${reservaActual.estado === 'cancelada' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                >
                  <FaTimes className="mr-1" /> Cancelar
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Información del Evento</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="font-medium text-gray-800 mb-2">{reservaActual.evento?.titulo}</p>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaCalendarAlt className="mr-2" />
                    <span>{formatDate(reservaActual.evento?.fecha)}</span>
                    <span className="mx-2">|</span>
                    <span>{reservaActual.evento?.hora}</span>
                  </div>
                  <p className="text-sm text-gray-600">{reservaActual.evento?.ubicacion}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3">Información del Cliente</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="font-medium text-gray-800 mb-1">{reservaActual.usuario?.nombre}</p>
                  <p className="text-gray-600 mb-2">{reservaActual.usuario?.email}</p>
                  <p className="text-sm text-gray-600">{reservaActual.usuario?.telefono || 'Sin teléfono'}</p>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="font-semibold text-lg mb-3">Detalles de la Reserva</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Fecha de reserva:</span>
                    <span className="font-medium">{formatDate(reservaActual.fecha_reserva)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Número de plazas:</span>
                    <span className="font-medium">{reservaActual.cantidad}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Precio por plaza:</span>
                    <span className="font-medium">{formatCurrency(reservaActual.precio_unitario)}</span>
                  </div>
                  <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
                    <span className="text-gray-800 font-semibold">Total:</span>
                    <span className="font-bold text-primary">{formatCurrency(reservaActual.total)}</span>
                  </div>
                </div>
              </div>
              
              {reservaActual.mercadopago_id && (
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-lg mb-3">Información de Pago</h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">ID de MercadoPago:</span>
                      <span className="font-medium">{reservaActual.mercadopago_id}</span>
                    </div>
                    {reservaActual.mercadopago_payment_id && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">ID de Pago:</span>
                        <span className="font-medium">{reservaActual.mercadopago_payment_id}</span>
                      </div>
                    )}
                    {reservaActual.mercadopago_status && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Estado del pago:</span>
                        <span className="font-medium">{reservaActual.mercadopago_status}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReservas;