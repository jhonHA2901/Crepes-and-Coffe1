import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaEye, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '../../config/config';
import { formatDate, formatCurrency } from '../../utils/format';
import Loader from '../../components/Loader';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [eventoActual, setEventoActual] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    duracion: '',
    ubicacion: '',
    precio: '',
    capacidad: '',
    plazas_disponibles: '',
    imagen: '',
    categoria_id: '',
    destacado: false,
    activo: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        // Obtener eventos
        const eventosResponse = await axios.get(`${API_URL}/eventos`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Obtener categorías
        const categoriasResponse = await axios.get(`${API_URL}/eventos/categorias/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setEventos(eventosResponse.data);
        setCategorias(categoriasResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('Error al cargar los datos. Por favor, intenta de nuevo.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      fecha: '',
      hora: '',
      duracion: '',
      ubicacion: '',
      precio: '',
      capacidad: '',
      plazas_disponibles: '',
      imagen: '',
      categoria_id: '',
      destacado: false,
      activo: true
    });
    setEventoActual(null);
  };

  const openModal = (evento = null) => {
    if (evento) {
      // Editar evento existente
      setEventoActual(evento);
      setFormData({
        titulo: evento.titulo,
        descripcion: evento.descripcion,
        fecha: evento.fecha.split('T')[0], // Formatear fecha para input date
        hora: evento.hora,
        duracion: evento.duracion,
        ubicacion: evento.ubicacion,
        precio: evento.precio,
        capacidad: evento.capacidad,
        plazas_disponibles: evento.plazas_disponibles,
        imagen: evento.imagen,
        categoria_id: evento.categoria_id,
        destacado: evento.destacado,
        activo: evento.activo
      });
    } else {
      // Nuevo evento
      resetForm();
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      // Validar que plazas_disponibles no sea mayor que capacidad
      if (parseInt(formData.plazas_disponibles) > parseInt(formData.capacidad)) {
        alert('Las plazas disponibles no pueden ser mayores que la capacidad total');
        return;
      }
      
      if (eventoActual) {
        // Actualizar evento existente
        await axios.put(`${API_URL}/eventos/${eventoActual.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Actualizar la lista de eventos
        const updatedEventos = eventos.map(evento => 
          evento.id === eventoActual.id ? { ...evento, ...formData } : evento
        );
        setEventos(updatedEventos);
      } else {
        // Crear nuevo evento
        const response = await axios.post(`${API_URL}/eventos`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Añadir el nuevo evento a la lista
        setEventos([...eventos, response.data]);
      }
      
      closeModal();
      alert(eventoActual ? 'Evento actualizado correctamente' : 'Evento creado correctamente');
    } catch (err) {
      console.error('Error al guardar evento:', err);
      alert('Error al guardar el evento. Por favor, intenta de nuevo.');
    }
  };

  const handleDeleteEvento = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/eventos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Actualizar la lista de eventos (marcar como inactivo)
      const updatedEventos = eventos.map(evento => 
        evento.id === id ? { ...evento, activo: false } : evento
      );
      setEventos(updatedEventos);
      
      alert('Evento eliminado correctamente');
    } catch (err) {
      console.error('Error al eliminar evento:', err);
      alert('Error al eliminar el evento. Por favor, intenta de nuevo.');
    }
  };

  // Filtrar eventos
  const eventosFiltrados = eventos.filter(evento => {
    const matchesCategoria = filtroCategoria ? evento.categoria_id.toString() === filtroCategoria : true;
    const matchesBusqueda = filtroBusqueda
      ? evento.titulo.toLowerCase().includes(filtroBusqueda.toLowerCase()) ||
        evento.descripcion.toLowerCase().includes(filtroBusqueda.toLowerCase())
      : true;
    return matchesCategoria && matchesBusqueda;
  });

  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Eventos</h1>
          <button
            onClick={() => openModal()}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaPlus className="mr-2" /> Nuevo Evento
          </button>
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
                placeholder="Buscar por título o descripción"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="md:w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por categoría</label>
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Todas las categorías</option>
                {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {eventosFiltrados.length > 0 ? (
                eventosFiltrados.map(evento => (
                  <tr key={evento.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {evento.imagen && (
                          <img
                            src={evento.imagen}
                            alt={evento.titulo}
                            className="h-10 w-10 rounded-full mr-3 object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{evento.titulo}</div>
                          <div className="text-sm text-gray-500">
                            {evento.categoria ? evento.categoria.nombre : 'Sin categoría'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-gray-400 mr-2" />
                        <div>
                          <div>{formatDate(evento.fecha)}</div>
                          <div className="text-sm text-gray-500">{evento.hora}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatCurrency(evento.precio)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaUsers className="text-gray-400 mr-2" />
                        <div>
                          <div>{evento.plazas_disponibles} / {evento.capacidad}</div>
                          <div className="w-24 bg-gray-200 rounded-full h-2.5 mt-1">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${(evento.plazas_disponibles / evento.capacidad) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          evento.activo
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {evento.activo ? 'Activo' : 'Inactivo'}
                      </span>
                      {evento.destacado && (
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Destacado
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to={`/eventos/${evento.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Ver evento"
                        >
                          <FaEye />
                        </Link>
                        <button
                          onClick={() => openModal(evento)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar evento"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteEvento(evento.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar evento"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No se encontraron eventos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal para crear/editar evento */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {eventoActual ? 'Editar Evento' : 'Nuevo Evento'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                  <input
                    type="time"
                    name="hora"
                    value={formData.hora}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duración</label>
                  <input
                    type="text"
                    name="duracion"
                    value={formData.duracion}
                    onChange={handleInputChange}
                    placeholder="Ej: 2 horas"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                  <input
                    type="text"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select
                    name="categoria_id"
                    value={formData.categoria_id}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map(categoria => (
                      <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad total</label>
                  <input
                    type="number"
                    name="capacidad"
                    value={formData.capacidad}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plazas disponibles</label>
                  <input
                    type="number"
                    name="plazas_disponibles"
                    value={formData.plazas_disponibles}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL de la imagen</label>
                  <input
                    type="url"
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="destacado"
                    checked={formData.destacado}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Destacado</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="activo"
                    checked={formData.activo}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Activo</label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  {eventoActual ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventos;