import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaTag, FaSearch, FaArrowRight } from 'react-icons/fa';

const Blog = () => {
  // Estado para los artículos del blog (simulados)
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Simular carga de datos
  useEffect(() => {
    // Simular una llamada a API
    setTimeout(() => {
      const mockArticles = [
        {
          id: 1,
          title: 'Nuevas crepes de temporada: Sabores de otoño',
          excerpt: 'Descubre nuestra nueva colección de crepes con ingredientes de temporada como calabaza, canela y especias otoñales.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
          image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
          date: '2023-10-15',
          author: 'Chef María',
          category: 'novedades',
          featured: true
        },
        {
          id: 2,
          title: 'Taller de elaboración de crepes para niños',
          excerpt: 'Este fin de semana organizamos un taller especial donde los más pequeños aprenderán a preparar sus propias crepes.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
          image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          date: '2023-10-20',
          author: 'Equipo Educativo',
          category: 'eventos',
          featured: false
        },
        {
          id: 3,
          title: 'Beneficios del café de especialidad',
          excerpt: 'Conoce por qué elegimos trabajar únicamente con cafés de especialidad y cómo esto mejora tu experiencia.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          date: '2023-10-10',
          author: 'Barista Carlos',
          category: 'consejos',
          featured: false
        },
        {
          id: 4,
          title: 'Celebra tu cumpleaños con nosotros',
          excerpt: 'Nuevos paquetes de celebración para cumpleaños y eventos especiales con menús personalizados.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
          image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          date: '2023-10-05',
          author: 'Equipo de Eventos',
          category: 'eventos',
          featured: true
        },
        {
          id: 5,
          title: 'Receta: Crepes de plátano y chocolate',
          excerpt: 'Aprende a preparar en casa nuestras famosas crepes de plátano con chocolate y avellanas.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
          image: 'https://images.unsplash.com/photo-1515467837915-15c4777cc4c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          date: '2023-09-28',
          author: 'Chef María',
          category: 'recetas',
          featured: false
        },
        {
          id: 6,
          title: 'Ampliamos nuestro horario',
          excerpt: 'A partir de noviembre estaremos abiertos desde las 7:00 AM para que disfrutes de tu desayuno más temprano.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
          image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1147&q=80',
          date: '2023-09-20',
          author: 'Gerencia',
          category: 'novedades',
          featured: false
        }
      ];

      // Extraer categorías únicas
      const uniqueCategories = [...new Set(mockArticles.map(article => article.category))];
      
      setArticles(mockArticles);
      setFilteredArticles(mockArticles);
      setCategories(uniqueCategories);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar artículos por búsqueda y categoría
  useEffect(() => {
    let result = [...articles];
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      result = result.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      result = result.filter(article => article.category === selectedCategory);
    }
    
    setFilteredArticles(result);
  }, [searchTerm, selectedCategory, articles]);

  // Manejar cambio en la búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Manejar cambio de categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Obtener artículos destacados
  const featuredArticles = articles.filter(article => article.featured);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Encabezado */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog y Noticias</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Mantente al día con las últimas novedades, eventos, recetas y consejos del mundo de las crepes y el café.
        </p>
      </div>

      {/* Artículos destacados */}
      {featuredArticles.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArticles.map(article => (
              <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {article.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <FaCalendarAlt className="mr-2" />
                    <span>{formatDate(article.date)}</span>
                    <span className="mx-2">•</span>
                    <FaUser className="mr-2" />
                    <span>{article.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <Link 
                    to={`/blog/${article.id}`} 
                    className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700"
                  >
                    Leer más <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === 'all' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Todos
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${selectedCategory === category ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de artículos */}
      <div className="mb-16">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center text-white text-xs">
                      <FaCalendarAlt className="mr-1" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white text-amber-600 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md">
                    {article.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-xs">
                      <FaUser className="mr-1" />
                      <span>{article.author}</span>
                    </div>
                    <Link 
                      to={`/blog/${article.id}`} 
                      className="text-amber-600 text-sm font-medium hover:text-amber-700 flex items-center"
                    >
                      Leer más <FaArrowRight className="ml-1" size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No se encontraron artículos</h3>
            <p className="text-gray-600 mb-6">Intenta con otra búsqueda o categoría</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn btn-primary"
            >
              Ver todos los artículos
            </button>
          </div>
        )}
      </div>

      {/* Suscripción al newsletter */}
      <div className="bg-amber-50 rounded-xl p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Suscríbete a nuestro newsletter</h2>
          <p className="text-gray-700 mb-6">
            Recibe las últimas noticias, eventos y promociones directamente en tu correo electrónico.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <button className="btn btn-primary whitespace-nowrap">
              Suscribirme
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Al suscribirte, aceptas nuestra <Link to="/politica-privacidad" className="underline hover:text-amber-600">Política de Privacidad</Link>.
          </p>
        </div>
      </div>

      {/* Enlaces a otras secciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Link to="/productos" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-utensils text-amber-600 text-xl"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Nuestro Menú</h3>
          <p className="text-gray-600 text-sm mb-4">Explora nuestra variedad de crepes dulces, saladas y bebidas.</p>
          <span className="text-amber-600 font-medium">Ver menú →</span>
        </Link>
        
        <Link to="/eventos" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-calendar-alt text-green-600 text-xl"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Eventos</h3>
          <p className="text-gray-600 text-sm mb-4">Descubre nuestros talleres, degustaciones y eventos especiales.</p>
          <span className="text-amber-600 font-medium">Ver eventos →</span>
        </Link>
        
        <Link to="/contacto" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-envelope text-blue-600 text-xl"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Contacto</h3>
          <p className="text-gray-600 text-sm mb-4">¿Tienes preguntas o sugerencias? Estamos aquí para ayudarte.</p>
          <span className="text-amber-600 font-medium">Contáctanos →</span>
        </Link>
      </div>

      {/* Enlaces rápidos */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Link to="/" className="text-gray-600 hover:text-amber-600 transition-colors">Inicio</Link>
        <span className="text-gray-400">|</span>
        <Link to="/productos" className="text-gray-600 hover:text-amber-600 transition-colors">Productos</Link>
        <span className="text-gray-400">|</span>
        <Link to="/nosotros" className="text-gray-600 hover:text-amber-600 transition-colors">Nosotros</Link>
        <span className="text-gray-400">|</span>
        <Link to="/contacto" className="text-gray-600 hover:text-amber-600 transition-colors">Contacto</Link>
      </div>
    </div>
  );
};

export default Blog;