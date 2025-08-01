import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTicketAlt, FaUsers, FaUtensils } from 'react-icons/fa';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Simular carga de datos
  useEffect(() => {
    // Simular una llamada a API
    setTimeout(() => {
      const mockEvents = [
        {
          id: 1,
          title: 'Taller de Crepes Dulces',
          description: 'Aprende a preparar crepes dulces con diferentes rellenos y técnicas de presentación.',
          date: '2023-11-15',
          time: '16:00 - 18:00',
          location: 'Nuestra tienda principal',
          image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
          price: 25,
          capacity: 15,
          availableSpots: 8,
          category: 'taller',
          featured: true
        },
        {
          id: 2,
          title: 'Degustación de Café de Especialidad',
          description: 'Descubre los diferentes perfiles de sabor de nuestros cafés de especialidad guiado por nuestro barista experto.',
          date: '2023-11-20',
          time: '17:30 - 19:00',
          location: 'Nuestra tienda principal',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          price: 15,
          capacity: 20,
          availableSpots: 12,
          category: 'degustacion',
          featured: true
        },
        {
          id: 3,
          title: 'Brunch Dominical',
          description: 'Disfruta de un brunch especial con crepes saladas, dulces, café y zumos naturales en un ambiente relajado.',
          date: '2023-11-26',
          time: '10:30 - 13:00',
          location: 'Nuestra tienda principal',
          image: 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
          price: 30,
          capacity: 30,
          availableSpots: 15,
          category: 'gastronomico',
          featured: false
        },
        {
          id: 4,
          title: 'Noche de Crepes y Vino',
          description: 'Una velada especial con maridaje de crepes saladas y vinos seleccionados por nuestro sommelier.',
          date: '2023-12-02',
          time: '19:00 - 21:30',
          location: 'Nuestra tienda principal',
          image: 'https://images.unsplash.com/photo-1470158499416-75be9aa0c4db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          price: 45,
          capacity: 25,
          availableSpots: 10,
          category: 'gastronomico',
          featured: true
        },
        {
          id: 5,
          title: 'Taller de Crepes para Niños',
          description: 'Taller especial donde los más pequeños aprenderán a preparar crepes de forma divertida y segura.',
          date: '2023-12-09',
          time: '11:00 - 13:00',
          location: 'Nuestra tienda principal',
          image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          price: 20,
          capacity: 12,
          availableSpots: 6,
          category: 'taller',
          featured: false
        },
        {
          id: 6,
          title: 'Masterclass: El Arte del Latte',
          description: 'Aprende técnicas de latte art con nuestro barista campeón nacional. Incluye práctica y degustación.',
          date: '2023-12-14',
          time: '18:00 - 20:00',
          location: 'Nuestra tienda principal',
          image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1037&q=80',
          price: 35,
          capacity: 10,
          availableSpots: 4,
          category: 'taller',
          featured: false
        },
      ];
      
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar eventos
  const filteredEvents = events.filter(event => {
    // Filtrar por categoría
    const categoryMatch = filter === 'all' || event.category === filter;
    
    // Filtrar por término de búsqueda
    const searchMatch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  // Eventos destacados
  const featuredEvents = events.filter(event => event.featured);

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Encabezado */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Eventos y Talleres</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Descubre nuestros eventos gastronómicos, talleres y degustaciones. ¡Vive experiencias únicas con Crepes & Coffee!
        </p>
      </div>

      {/* Eventos destacados */}
      {featuredEvents.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Eventos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map(event => (
              <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 rounded-bl-lg font-medium text-sm">
                    Destacado
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="flex items-center text-gray-500 mb-2">
                    <FaCalendarAlt className="mr-2" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-2">
                    <FaClock className="mr-2" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-4">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-amber-600">${event.price}</span>
                    <Link 
                      to={`/eventos/${event.id}`} 
                      className="btn btn-primary"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtros y búsqueda */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'all' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilter('taller')} 
            className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'taller' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            Talleres
          </button>
          <button 
            onClick={() => setFilter('degustacion')} 
            className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'degustacion' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            Degustaciones
          </button>
          <button 
            onClick={() => setFilter('gastronomico')} 
            className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'gastronomico' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            Gastronómicos
          </button>
        </div>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
        </div>
      </div>

      {/* Lista de eventos */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximos Eventos</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded capitalize">
                      {event.category === 'taller' ? 'Taller' : 
                       event.category === 'degustacion' ? 'Degustación' : 'Gastronómico'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="flex items-center text-gray-500 mb-2">
                    <FaCalendarAlt className="mr-2 text-sm" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-2">
                    <FaClock className="mr-2 text-sm" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-2">
                    <FaMapMarkerAlt className="mr-2 text-sm" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-4">
                    <FaUsers className="mr-2 text-sm" />
                    <span className="text-sm">{event.availableSpots} plazas disponibles de {event.capacity}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-amber-600">${event.price}</span>
                    <Link 
                      to={`/eventos/${event.id}`} 
                      className="text-amber-600 hover:text-amber-700 font-medium"
                    >
                      Ver detalles →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FaCalendarAlt className="mx-auto text-4xl text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No se encontraron eventos</h3>
            <p className="text-gray-500">Intenta con otros filtros o términos de búsqueda</p>
          </div>
        )}
      </div>

      {/* Reserva privada */}
      <div className="bg-amber-50 rounded-xl p-8 mb-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Buscas un espacio para tu evento privado?</h2>
            <p className="text-gray-600 mb-6">
              Ofrecemos nuestro espacio para celebraciones, reuniones de empresa, presentaciones y más. Contáctanos para crear un evento personalizado con nuestro servicio de catering de crepes y café.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <FaUsers className="text-amber-600 mr-2" />
                <span>Capacidad hasta 50 personas</span>
              </div>
              <div className="flex items-center">
                <FaUtensils className="text-amber-600 mr-2" />
                <span>Menús personalizados</span>
              </div>
              <div className="flex items-center">
                <FaTicketAlt className="text-amber-600 mr-2" />
                <span>Presupuesto a medida</span>
              </div>
            </div>
            <Link 
              to="/contacto" 
              className="btn btn-primary mt-6 inline-block"
            >
              Solicitar información
            </Link>
          </div>
          <div className="md:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
              alt="Evento privado" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Suscripción a eventos */}
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No te pierdas ningún evento</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Suscríbete a nuestra newsletter para recibir información sobre nuevos eventos y promociones exclusivas.
        </p>
        <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Tu correo electrónico" 
            className="px-4 py-2 border border-gray-300 rounded-l-full sm:rounded-r-none rounded-r-full mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full"
          />
          <button className="btn btn-primary rounded-r-full sm:rounded-l-none rounded-l-full">
            Suscribirme
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Al suscribirte, aceptas nuestra <Link to="/politica-privacidad" className="underline hover:text-amber-600">Política de Privacidad</Link>.
        </p>
      </div>
    </div>
  );
};

export default Events;