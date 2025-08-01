import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaTicketAlt, FaArrowLeft, FaShare, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '../config/config';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [reservando, setReservando] = useState(false);
  
  // Función para manejar la reserva
  const handleReservar = async () => {
    try {
      setReservando(true);
      
      // Verificar si el usuario está autenticado
      if (!isAuthenticated) {
        toast.error('Debes iniciar sesión para reservar un evento');
        navigate('/login', { state: { from: `/eventos/${id}` } });
        return;
      }
      
      // Crear la reserva
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/reservas`, {
        evento_id: event.id,
        cantidad: quantity
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Redirigir a la página de pago de MercadoPago
      if (response.data && response.data.init_point) {
        window.location.href = response.data.init_point;
      } else {
        // Si no hay init_point, redirigir a la página de reserva exitosa
        navigate(`/reserva-exitosa/${response.data.reserva.id}`);
      }
    } catch (error) {
      console.error('Error al crear reserva:', error);
      toast.error(error.response?.data?.error || 'No pudimos procesar tu reserva. Por favor, intenta de nuevo más tarde.');
      setReservando(false);
    }
  };

  // Simular carga de datos
  useEffect(() => {
    // Simular una llamada a API
    setTimeout(() => {
      const mockEvents = [
        {
          id: 1,
          title: 'Taller de Crepes Dulces',
          description: 'Aprende a preparar crepes dulces con diferentes rellenos y técnicas de presentación.',
          longDescription: `<p>¿Te gustaría aprender a preparar crepes dulces como un profesional? En este taller práctico, nuestro chef pastelero te guiará paso a paso en el arte de hacer crepes perfectas y deliciosas.</p>

<h3>¿Qué aprenderás?</h3>
<ul>
<li>La receta básica de masa para crepes dulces</li>
<li>Técnicas para conseguir el grosor perfecto</li>
<li>Cómo voltear las crepes sin romperlas</li>
<li>Preparación de 5 rellenos diferentes</li>
<li>Técnicas de presentación y decoración</li>
<li>Trucos profesionales para resolver problemas comunes</li>
</ul>

<h3>¿Qué incluye el taller?</h3>
<ul>
<li>Todos los ingredientes y utensilios necesarios</li>
<li>Delantal para usar durante el taller</li>
<li>Degustación de todas las creaciones</li>
<li>Recetario impreso para llevar a casa</li>
<li>Certificado de participación</li>
<li>Una bebida a elegir (café, té o refresco)</li>
</ul>

<h3>Información importante</h3>
<p>El taller está diseñado tanto para principiantes como para personas con experiencia básica en cocina. No se requieren conocimientos previos.</p>

<p>Te recomendamos llevar un recipiente hermético si deseas llevar a casa algunas de tus creaciones.</p>

<p>Por favor, infórmanos de cualquier alergia o restricción alimentaria al momento de hacer tu reserva.</p>`,
          date: '2023-11-15',
          time: '16:00 - 18:00',
          location: 'Nuestra tienda principal',
          address: 'Av. Principal 123, Ciudad',
          image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
          price: 25,
          capacity: 15,
          availableSpots: 8,
          category: 'taller',
          featured: true,
          instructor: 'Chef María Rodríguez',
          instructorBio: 'Pastelera profesional con más de 10 años de experiencia en repostería francesa.',
          instructorImage: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80'
        },
        {
          id: 2,
          title: 'Degustación de Café de Especialidad',
          description: 'Descubre los diferentes perfiles de sabor de nuestros cafés de especialidad guiado por nuestro barista experto.',
          longDescription: `<p>Sumérgete en el fascinante mundo del café de especialidad en esta sesión de cata guiada por nuestro barista jefe. Una experiencia sensorial que te permitirá apreciar los matices y complejidades de diferentes orígenes de café.</p>

<h3>¿Qué incluye la experiencia?</h3>
<ul>
<li>Degustación de 5 cafés de diferentes orígenes</li>
<li>Explicación detallada de cada origen y método de procesamiento</li>
<li>Introducción a las técnicas profesionales de cata</li>
<li>Guía para identificar notas de sabor y aromas</li>
<li>Pequeños bocados para acompañar la degustación</li>
<li>Cuaderno de cata para tomar notas</li>
</ul>

<h3>Cafés que probaremos</h3>
<ul>
<li>Etiopía Yirgacheffe (procesado lavado)</li>
<li>Colombia Huila (procesado natural)</li>
<li>Guatemala Antigua (procesado honey)</li>
<li>Costa Rica Tarrazú (procesado lavado)</li>
<li>Sumatra Mandheling (procesado húmedo)</li>
</ul>

<h3>Información adicional</h3>
<p>La degustación está diseñada tanto para aficionados como para entusiastas del café. No se requieren conocimientos previos, solo curiosidad y ganas de descubrir nuevos sabores.</p>

<p>Te recomendamos no usar perfume fuerte el día de la cata para no interferir con la experiencia sensorial.</p>`,
          date: '2023-11-20',
          time: '17:30 - 19:00',
          location: 'Nuestra tienda principal',
          address: 'Av. Principal 123, Ciudad',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          price: 15,
          capacity: 20,
          availableSpots: 12,
          category: 'degustacion',
          featured: true,
          instructor: 'Barista Carlos Méndez',
          instructorBio: 'Barista certificado SCA con experiencia en competiciones internacionales.',
          instructorImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=977&q=80'
        },
        {
          id: 3,
          title: 'Brunch Dominical',
          description: 'Disfruta de un brunch especial con crepes saladas, dulces, café y zumos naturales en un ambiente relajado.',
          longDescription: `<p>Comienza tu domingo de la mejor manera con nuestro brunch especial. Una experiencia gastronómica completa donde podrás disfrutar de una selección de nuestras mejores crepes en un ambiente relajado y acogedor.</p>

<h3>Menú del brunch</h3>
<h4>Para compartir en mesa:</h4>
<ul>
<li>Tabla de quesos artesanales y mermeladas caseras</li>
<li>Selección de panes recién horneados</li>
<li>Yogur griego con granola y frutas de temporada</li>
</ul>

<h4>Crepes saladas (a elegir una):</h4>
<ul>
<li>Crepe de jamón serrano, queso brie y rúcula</li>
<li>Crepe de salmón ahumado, queso crema y eneldo</li>
<li>Crepe de espinacas, champiñones y queso de cabra</li>
<li>Crepe de pollo, aguacate y salsa de yogur</li>
</ul>

<h4>Crepes dulces (a elegir una):</h4>
<ul>
<li>Crepe de Nutella y plátano caramelizado</li>
<li>Crepe de frutos rojos y crema mascarpone</li>
<li>Crepe de manzana caramelizada y canela</li>
<li>Crepe de limón y azúcar</li>
</ul>

<h4>Bebidas incluidas:</h4>
<ul>
<li>Café o té (con refill)</li>
<li>Zumo natural de naranja</li>
<li>Agua mineral</li>
</ul>

<h3>Información adicional</h3>
<p>El brunch se sirve en formato buffet para los entrantes y a la carta para las crepes principales.</p>

<p>Contamos con opciones vegetarianas y sin gluten (por favor, avísanos al hacer tu reserva).</p>

<p>La duración aproximada del brunch es de 2 horas.</p>`,
          date: '2023-11-26',
          time: '10:30 - 13:00',
          location: 'Nuestra tienda principal',
          address: 'Av. Principal 123, Ciudad',
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
          longDescription: `<p>Te invitamos a una sofisticada velada donde el arte de las crepes se encuentra con el mundo del vino. Una experiencia gastronómica única donde cada plato está cuidadosamente maridado con un vino seleccionado por nuestro sommelier.</p>

<h3>Menú degustación</h3>
<h4>Aperitivo:</h4>
<ul>
<li>Mini crepe de queso de cabra y cebolla caramelizada</li>
<li>Maridaje: Espumoso Brut Nature</li>
</ul>

<h4>Primer plato:</h4>
<ul>
<li>Crepe de champiñones silvestres y trufa</li>
<li>Maridaje: Chardonnay de Borgoña</li>
</ul>

<h4>Segundo plato:</h4>
<ul>
<li>Crepe de pato confitado con salsa de naranja</li>
<li>Maridaje: Pinot Noir de Oregon</li>
</ul>

<h4>Tercer plato:</h4>
<ul>
<li>Crepe de ternera con reducción de vino tinto y chalotas</li>
<li>Maridaje: Syrah del Valle del Ródano</li>
</ul>

<h4>Postre:</h4>
<ul>
<li>Crepe Suzette flambeada al momento</li>
<li>Maridaje: Vino dulce natural de Moscatel</li>
</ul>

<h3>La experiencia incluye</h3>
<ul>
<li>Menú degustación completo de 5 tiempos</li>
<li>Maridaje de 5 vinos (copas de 75ml)</li>
<li>Agua mineral</li>
<li>Explicación de cada plato y vino por nuestro chef y sommelier</li>
<li>Ambiente íntimo con música en vivo (piano)</li>
</ul>

<h3>Información adicional</h3>
<p>La duración aproximada de la cena es de 2.5 horas.</p>

<p>Disponemos de opciones vegetarianas (por favor, avísanos al hacer tu reserva).</p>

<p>Se recomienda vestimenta semi-formal.</p>`,
          date: '2023-12-02',
          time: '19:00 - 21:30',
          location: 'Nuestra tienda principal',
          address: 'Av. Principal 123, Ciudad',
          image: 'https://images.unsplash.com/photo-1470158499416-75be9aa0c4db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          price: 45,
          capacity: 25,
          availableSpots: 10,
          category: 'gastronomico',
          featured: true,
          instructor: 'Chef Pablo Martínez y Sommelier Ana García',
          instructorBio: 'Equipo con amplia experiencia en maridajes y gastronomía francesa.',
          instructorImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=977&q=80'
        },
        {
          id: 5,
          title: 'Taller de Crepes para Niños',
          description: 'Taller especial donde los más pequeños aprenderán a preparar crepes de forma divertida y segura.',
          longDescription: `<p>Un taller diseñado especialmente para que los niños se diviertan mientras aprenden a preparar deliciosas crepes. Una actividad perfecta para despertar su creatividad culinaria en un ambiente seguro y adaptado a su edad.</p>

<h3>¿Qué harán los niños?</h3>
<ul>
<li>Preparar la masa de crepes con ayuda de nuestros monitores</li>
<li>Aprender a cocinar crepes de forma segura (con supervisión constante)</li>
<li>Crear sus propias combinaciones de rellenos</li>
<li>Decorar sus crepes con frutas, salsas y toppings</li>
<li>Disfrutar de sus creaciones</li>
</ul>

<h3>¿Qué incluye el taller?</h3>
<ul>
<li>Todos los ingredientes y utensilios necesarios</li>
<li>Delantal infantil que podrán llevarse a casa</li>
<li>Gorro de chef</li>
<li>Diploma de "Mini Chef de Crepes"</li>
<li>Recetario ilustrado adaptado para niños</li>
<li>Bebida (zumo o agua)</li>
</ul>

<h3>Información para padres</h3>
<p>El taller está diseñado para niños de 6 a 12 años.</p>

<p>Los padres pueden esperar en nuestra zona de café o volver a recoger a los niños al finalizar el taller.</p>

<p>Todos nuestros monitores tienen experiencia en actividades infantiles y formación en manipulación de alimentos.</p>

<p>Por favor, infórmanos de cualquier alergia o restricción alimentaria al momento de hacer la reserva.</p>`,
          date: '2023-12-09',
          time: '11:00 - 13:00',
          location: 'Nuestra tienda principal',
          address: 'Av. Principal 123, Ciudad',
          image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          price: 20,
          capacity: 12,
          availableSpots: 6,
          category: 'taller',
          featured: false,
          instructor: 'Equipo Educativo Crepes & Coffee',
          instructorBio: 'Profesionales con experiencia en educación infantil y gastronomía.',
          instructorImage: 'https://images.unsplash.com/photo-1544717684-1243da23b545?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
        },
        {
          id: 6,
          title: 'Masterclass: El Arte del Latte',
          description: 'Aprende técnicas de latte art con nuestro barista campeón nacional. Incluye práctica y degustación.',
          longDescription: `<p>Descubre los secretos del latte art en esta masterclass impartida por nuestro barista jefe, campeón nacional de latte art. Una oportunidad única para aprender técnicas profesionales y crear hermosos diseños en tus cafés.</p>

<h3>¿Qué aprenderás?</h3>
<ul>
<li>Fundamentos del espresso perfecto como base para el latte art</li>
<li>Técnicas de texturización de leche</li>
<li>Vertido básico y control del flujo</li>
<li>Creación de diseños clásicos: corazón, rosetta y tulipán</li>
<li>Técnicas avanzadas: cisne, fénix y diseños múltiples</li>
<li>Uso de herramientas para etching y diseños complejos</li>
</ul>

<h3>¿Qué incluye la masterclass?</h3>
<ul>
<li>Todos los materiales y equipos profesionales</li>
<li>Café de especialidad ilimitado para practicar</li>
<li>Leche y alternativas vegetales</li>
<li>Guía impresa con técnicas y consejos</li>
<li>Certificado de participación</li>
<li>10% de descuento en nuestra tienda de café y accesorios</li>
</ul>

<h3>Información adicional</h3>
<p>Esta masterclass está diseñada tanto para principiantes como para baristas con experiencia que deseen mejorar sus habilidades.</p>

<p>Cada participante tendrá su propia estación de trabajo con máquina de espresso profesional.</p>

<p>El número de plazas es limitado para garantizar una atención personalizada.</p>`,
          date: '2023-12-14',
          time: '18:00 - 20:00',
          location: 'Nuestra tienda principal',
          address: 'Av. Principal 123, Ciudad',
          image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1037&q=80',
          price: 35,
          capacity: 10,
          availableSpots: 4,
          category: 'taller',
          featured: false,
          instructor: 'Barista Carlos Méndez',
          instructorBio: 'Barista certificado SCA con experiencia en competiciones internacionales.',
          instructorImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=977&q=80'
        },
      ];
      
      const foundEvent = mockEvents.find(e => e.id === parseInt(id));
      
      if (foundEvent) {
        setEvent(foundEvent);
        
        // Filtrar eventos relacionados (misma categoría, excluyendo el actual)
        const related = mockEvents
          .filter(e => e.category === foundEvent.category && e.id !== foundEvent.id)
          .slice(0, 3);
        
        setRelatedEvents(related);
      } else {
        // Si no se encuentra el evento, redirigir a la página de eventos
        navigate('/eventos');
      }
      
      setLoading(false);
    }, 1000);
  }, [id, navigate]);

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Manejar cambio de cantidad
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (event?.availableSpots || 1)) {
      setQuantity(value);
    }
  };

  // Calcular precio total
  const totalPrice = event ? event.price * quantity : 0;

  // Compartir en redes sociales
  const shareUrl = window.location.href;
  const shareTitle = event ? `${event.title} - Crepes & Coffee` : 'Evento en Crepes & Coffee';

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Evento no encontrado</h2>
          <p className="text-gray-600 mb-6">Lo sentimos, el evento que buscas no está disponible.</p>
          <Link to="/eventos" className="btn btn-primary">
            Ver todos los eventos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Navegación */}
      <div className="mb-6">
        <Link to="/eventos" className="flex items-center text-amber-600 hover:text-amber-700 transition-colors">
          <FaArrowLeft className="mr-2" />
          Volver a eventos
        </Link>
      </div>

      {/* Encabezado del evento */}
      <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
        <div className="relative">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-64 md:h-96 object-cover"
          />
          {event.featured && (
            <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-lg font-medium">
              Destacado
            </div>
          )}
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">{event.title}</h1>
            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded capitalize">
              {event.category === 'taller' ? 'Taller' : 
               event.category === 'degustacion' ? 'Degustación' : 'Gastronómico'}
            </span>
          </div>
          
          <p className="text-lg text-gray-600 mb-6">{event.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <FaCalendarAlt className="text-amber-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Fecha</p>
                  <p className="font-medium">{formatDate(event.date)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaClock className="text-amber-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Horario</p>
                  <p className="font-medium">{event.time}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-amber-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Ubicación</p>
                  <p className="font-medium">{event.location}</p>
                  <p className="text-sm text-gray-500">{event.address}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <FaTicketAlt className="text-amber-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Precio</p>
                  <p className="text-xl font-bold text-amber-600">${event.price}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaUsers className="text-amber-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Disponibilidad</p>
                  <p className="font-medium">{event.availableSpots} plazas disponibles de {event.capacity}</p>
                </div>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="flex items-center text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <FaShare className="mr-2" />
                  Compartir evento
                </button>
                
                {showShareOptions && (
                  <div className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg p-3 flex space-x-3">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      aria-label="Compartir en Facebook"
                    >
                      <FaFacebook size={20} />
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-600 transition-colors"
                      aria-label="Compartir en Twitter"
                    >
                      <FaTwitter size={20} />
                    </a>
                    <a 
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 transition-colors"
                      aria-label="Compartir en WhatsApp"
                    >
                      <FaWhatsapp size={20} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Descripción detallada */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Acerca de este evento</h2>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: event.longDescription }}
            />
          </div>
        </div>

        {/* Reserva y detalles del instructor */}
        <div className="space-y-6">
          {/* Formulario de reserva */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Reserva tu plaza</h2>
            
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Número de plazas
              </label>
              <div className="flex items-center">
                <button 
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <input 
                  type="number" 
                  id="quantity" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                  min="1" 
                  max={event.availableSpots} 
                  className="w-16 text-center py-1 border-t border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                />
                <button 
                  onClick={() => quantity < event.availableSpots && setQuantity(quantity + 1)}
                  className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Precio por plaza:</span>
              <span className="font-medium">${event.price}</span>
            </div>
            
            <div className="flex justify-between items-center mb-6 text-lg font-bold">
              <span>Total:</span>
              <span className="text-amber-600">${totalPrice}</span>
            </div>
            
            <button 
              onClick={handleReservar}
              disabled={reservando}
              className="btn btn-primary w-full mb-4 flex justify-center items-center"
            >
              {reservando ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  Procesando...
                </>
              ) : (
                'Reservar ahora'
              )}
            </button>
            
            <p className="text-xs text-gray-500 text-center">
              Cancelación gratuita hasta 48 horas antes del evento
            </p>
          </div>
          
          {/* Información del instructor */}
          {event.instructor && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Impartido por</h2>
              
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={event.instructorImage} 
                  alt={event.instructor} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{event.instructor}</h3>
                  <p className="text-sm text-gray-600">{event.instructorBio}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Eventos relacionados */}
      {relatedEvents.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Eventos relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedEvents.map(relatedEvent => (
              <div key={relatedEvent.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={relatedEvent.image} 
                  alt={relatedEvent.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{relatedEvent.title}</h3>
                  
                  <div className="flex items-center text-gray-500 mb-2">
                    <FaCalendarAlt className="mr-2 text-sm" />
                    <span className="text-sm">{formatDate(relatedEvent.date)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-amber-600">${relatedEvent.price}</span>
                    <Link 
                      to={`/eventos/${relatedEvent.id}`} 
                      className="text-amber-600 hover:text-amber-700 font-medium"
                    >
                      Ver detalles →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA final */}
      <div className="bg-amber-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Buscas un evento privado?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Organizamos eventos a medida para grupos, empresas y celebraciones especiales. Contáctanos para más información.
        </p>
        <Link to="/contacto" className="btn btn-primary">
          Solicitar información
        </Link>
      </div>
    </div>
  );
};

export default EventDetail;