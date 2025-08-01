import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft, FaArrowRight, FaShare, FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const BlogDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
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
          content: `<p>Con la llegada del otoño, en <strong>Crepes & Coffee</strong> nos complace presentar nuestra nueva colección de crepes inspiradas en los sabores de la temporada. Hemos seleccionado cuidadosamente ingredientes frescos y de temporada para crear combinaciones que te transportarán a un paseo por un bosque otoñal.</p>

<h3>Calabaza y Especias</h3>
<p>Nuestra estrella principal es la crepe de calabaza con especias, elaborada con puré de calabaza orgánica, canela, nuez moscada y un toque de jengibre. Coronada con crema batida casera y nueces caramelizadas, es el postre perfecto para los días más frescos.</p>

<h3>Manzana y Caramelo</h3>
<p>Las manzanas están en su mejor momento durante el otoño. Nuestra crepe de manzana caramelizada combina rodajas de manzana salteadas con mantequilla de canela, caramelo casero y un toque de crema de vainilla. Una experiencia que evoca los tradicionales pasteles de manzana pero con nuestro toque especial.</p>

<h3>Pera y Chocolate</h3>
<p>La combinación de peras frescas con chocolate negro es simplemente irresistible. Hemos creado una crepe que equilibra perfectamente la dulzura natural de las peras con la intensidad del chocolate 70% cacao, añadiendo un crumble de avellanas para darle textura.</p>

<h3>Compromiso con lo local</h3>
<p>Como parte de nuestro compromiso con la sostenibilidad y el apoyo a productores locales, todos los ingredientes principales de nuestra colección de otoño provienen de agricultores de la región. Las calabazas son cultivadas orgánicamente a menos de 30 km de nuestra tienda, y las manzanas y peras son recolectadas de huertos familiares cercanos.</p>

<h3>Disponibilidad limitada</h3>
<p>Nuestra colección de otoño estará disponible desde el 15 de octubre hasta finales de noviembre. Te invitamos a visitarnos y disfrutar de estos sabores únicos antes de que termine la temporada.</p>

<p>Además, por tiempo limitado, con cada crepe de la colección de otoño regalaremos una muestra de nuestro nuevo té chai especiado, la combinación perfecta para acompañar tu postre.</p>

<p>¡Te esperamos para celebrar juntos los sabores del otoño!</p>`,
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
          content: `<p>En <strong>Crepes & Coffee</strong> creemos que la cocina es una forma maravillosa de aprender, experimentar y divertirse. Por eso, estamos emocionados de anunciar nuestro próximo taller de elaboración de crepes especialmente diseñado para niños.</p>

<h3>Un taller pensado para los pequeños chefs</h3>
<p>El sábado 20 de octubre, de 10:00 AM a 12:00 PM, transformaremos nuestro espacio en una escuela de cocina para niños de 6 a 12 años. Bajo la guía de nuestro chef pastelero y un equipo de asistentes, los participantes aprenderán a preparar la masa de crepes desde cero, a cocinarlas correctamente y a crear sus propios rellenos con ingredientes saludables y deliciosos.</p>

<h3>¿Qué incluye el taller?</h3>
<ul>
<li>Todos los ingredientes y utensilios necesarios</li>
<li>Delantal personalizado que podrán llevarse a casa</li>
<li>Diploma de "Chef Junior de Crepes"</li>
<li>Recetario ilustrado con ideas fáciles para hacer en casa</li>
<li>Degustación de las creaciones junto a los padres al finalizar el taller</li>
</ul>

<h3>Beneficios educativos</h3>
<p>Además de ser una actividad divertida, cocinar aporta numerosos beneficios para el desarrollo infantil:</p>
<ul>
<li>Mejora la motricidad fina y la coordinación</li>
<li>Fomenta la comprensión de conceptos matemáticos (medidas, proporciones)</li>
<li>Promueve hábitos alimenticios saludables</li>
<li>Estimula la creatividad y la confianza</li>
<li>Enseña la importancia del trabajo en equipo</li>
</ul>

<h3>Información práctica</h3>
<p><strong>Fecha:</strong> Sábado 20 de octubre, 2023<br>
<strong>Horario:</strong> 10:00 AM - 12:00 PM<br>
<strong>Precio:</strong> $25 por niño<br>
<strong>Edad recomendada:</strong> 6-12 años<br>
<strong>Plazas limitadas:</strong> Máximo 15 niños</p>

<h3>¿Cómo reservar?</h3>
<p>Las reservas pueden realizarse en nuestra tienda o llamando al (555) 123-4567. Se requiere un depósito de $10 para confirmar la plaza. El resto se abonará el día del taller.</p>

<p>¡No dejes pasar esta oportunidad de introducir a los más pequeños en el maravilloso mundo de la repostería francesa!</p>`,
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
          content: `<p>En <strong>Crepes & Coffee</strong>, la calidad de nuestro café es tan importante como la de nuestras crepes. Por eso, hemos tomado la decisión de trabajar exclusivamente con cafés de especialidad. Pero, ¿qué significa esto exactamente y por qué marca la diferencia en tu taza?</p>

<h3>¿Qué es el café de especialidad?</h3>
<p>El café de especialidad no es solo una etiqueta de marketing, sino una categoría específica que cumple con estrictos estándares de calidad. Para ser considerado "de especialidad", un café debe:</p>
<ul>
<li>Obtener una puntuación de al menos 80 sobre 100 en la escala de la Asociación de Cafés de Especialidad (SCA)</li>
<li>Estar libre de defectos primarios</li>
<li>Ser cultivado en microclimas específicos con condiciones ideales</li>
<li>Ser procesado, tostado y preparado con métodos que resalten sus características únicas</li>
</ul>

<h3>Beneficios para tu paladar y más allá</h3>
<p>Cuando disfrutas de una taza de café de especialidad en nuestro establecimiento, estás experimentando:</p>

<h4>1. Perfiles de sabor complejos</h4>
<p>A diferencia del café comercial, que suele tener notas predominantemente amargas o quemadas, nuestros cafés ofrecen perfiles de sabor complejos que pueden incluir notas frutales, florales, chocolatadas o especiadas, dependiendo de su origen y proceso.</p>

<h4>2. Frescura garantizada</h4>
<p>Trabajamos con tostadores locales que nos suministran granos recién tostados semanalmente. Esto garantiza que cada taza que servimos contenga todos los aromas y sabores que el café puede ofrecer.</p>

<h4>3. Trazabilidad</h4>
<p>Conocemos el origen exacto de nuestros cafés: la finca donde se cultivaron, la altitud, la variedad botánica y los métodos de procesamiento. Esta información no solo nos permite seleccionar los mejores granos, sino también compartir estas historias contigo.</p>

<h3>Impacto social y ambiental</h3>
<p>Elegir café de especialidad también tiene un impacto positivo más allá de la taza:</p>
<ul>
<li><strong>Comercio justo:</strong> Los productores de café de especialidad reciben precios significativamente más altos que los del mercado convencional, lo que permite condiciones de vida dignas.</li>
<li><strong>Sostenibilidad:</strong> La mayoría de estos cafés se cultivan bajo sombra, lo que preserva la biodiversidad y reduce la necesidad de fertilizantes químicos.</li>
<li><strong>Preservación de tradiciones:</strong> Al valorar métodos de cultivo tradicionales y variedades autóctonas, se contribuye a preservar el patrimonio cultural de las regiones productoras.</li>
</ul>

<h3>Nuestros orígenes actuales</h3>
<p>Actualmente, estamos sirviendo cafés de:</p>
<ul>
<li><strong>Colombia (Huila):</strong> Notas de caramelo, manzana roja y chocolate con leche</li>
<li><strong>Etiopía (Yirgacheffe):</strong> Perfil floral con notas cítricas y de bergamota</li>
<li><strong>Guatemala (Antigua):</strong> Notas de chocolate negro, naranja y especias</li>
</ul>

<p>Te invitamos a preguntar a nuestro barista sobre la selección del día y las recomendaciones de maridaje con nuestras crepes. ¡Tu experiencia gastronómica merece un café a la altura!</p>`,
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
          content: `<p>¿Buscas un lugar especial para celebrar tu cumpleaños o un evento importante? En <strong>Crepes & Coffee</strong> hemos creado nuevos paquetes de celebración diseñados para hacer de tu ocasión especial un momento inolvidable, con el toque dulce y salado que nos caracteriza.</p>

<h3>Paquetes personalizados para cada ocasión</h3>
<p>Entendemos que cada celebración es única, por eso hemos diseñado diferentes opciones que pueden adaptarse a tus necesidades:</p>

<h4>1. Celebración Íntima (4-10 personas)</h4>
<p>Perfecto para reuniones pequeñas con tus seres queridos más cercanos.</p>
<ul>
<li>Reserva de área privada por 2 horas</li>
<li>Menú de crepes saladas a elegir (2 opciones por persona)</li>
<li>Crepe dulce de cumpleaños con vela</li>
<li>Bebida caliente o fría incluida</li>
<li>Decoración básica temática</li>
<li>Precio: $25 por persona</li>
</ul>

<h4>2. Fiesta Completa (10-20 personas)</h4>
<p>La opción ideal para celebraciones más amplias con amigos y familia.</p>
<ul>
<li>Reserva de área semi-privada por 3 horas</li>
<li>Tabla de aperitivos para compartir</li>
<li>Menú de crepes saladas a elegir (2 opciones por persona)</li>
<li>Estación de crepes dulces con 5 toppings a elegir</li>
<li>Torre de crepes como pastel de cumpleaños</li>
<li>Bebidas ilimitadas no alcohólicas</li>
<li>Decoración personalizada</li>
<li>Servicio de fotografía básico</li>
<li>Precio: $35 por persona</li>
</ul>

<h4>3. Evento Premium (hasta 30 personas)</h4>
<p>Para quienes buscan una experiencia completa y exclusiva.</p>
<ul>
<li>Reserva exclusiva del local (fuera de horario comercial)</li>
<li>Menú degustación de crepes saladas y dulces</li>
<li>Estación de café de especialidad con barista dedicado</li>
<li>Barra de cócteles con y sin alcohol</li>
<li>Pastel de crepes personalizado</li>
<li>Decoración premium según temática elegida</li>
<li>Servicio de fotografía profesional</li>
<li>Recuerdo personalizado para cada invitado</li>
<li>Precio: Desde $45 por persona</li>
</ul>

<h3>Menús adaptados a necesidades especiales</h3>
<p>Todos nuestros paquetes pueden adaptarse para atender necesidades dietéticas específicas:</p>
<ul>
<li>Opciones vegetarianas y veganas</li>
<li>Alternativas sin gluten</li>
<li>Menús para personas con alergias o intolerancias</li>
</ul>

<h3>Celebraciones infantiles</h3>
<p>También contamos con paquetes especiales para cumpleaños infantiles que incluyen:</p>
<ul>
<li>Taller de mini-chefs donde los niños preparan sus propias crepes</li>
<li>Decoración temática infantil</li>
<li>Juegos y actividades supervisadas</li>
<li>Menú especial para niños</li>
<li>Sorpresas y recuerdos</li>
</ul>

<h3>¿Cómo reservar?</h3>
<p>Te recomendamos hacer tu reserva con al menos 2 semanas de anticipación, especialmente para los fines de semana. Puedes contactarnos de las siguientes formas:</p>
<ul>
<li>Llamando al (555) 123-4567</li>
<li>Enviando un email a eventos@crepesandcoffee.com</li>
<li>Visitando nuestra tienda y hablando con nuestro personal</li>
</ul>

<p>Se requiere un depósito del 30% para confirmar la reserva.</p>

<p>¡Haz de tu próxima celebración un momento delicioso e inolvidable con Crepes & Coffee!</p>`,
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
          content: `<p>Una de las crepes más solicitadas en nuestro menú es la combinación clásica de plátano y chocolate. Hoy queremos compartir contigo la receta para que puedas disfrutarla en casa. Aunque nada supera la experiencia de visitarnos, esta versión casera te permitirá satisfacer ese antojo cuando no puedas acercarte a nuestra tienda.</p>

<h3>Ingredientes para la masa (8-10 crepes)</h3>
<ul>
<li>2 tazas (250g) de harina de trigo</li>
<li>3 huevos</li>
<li>2 cucharadas de azúcar</li>
<li>1 pizca de sal</li>
<li>3 cucharadas de mantequilla derretida</li>
<li>2 tazas (500ml) de leche</li>
<li>1 cucharadita de extracto de vainilla</li>
<li>Aceite o mantequilla para la sartén</li>
</ul>

<h3>Ingredientes para el relleno</h3>
<ul>
<li>4 plátanos maduros</li>
<li>200g de chocolate negro (mínimo 60% cacao)</li>
<li>100ml de crema para batir</li>
<li>50g de avellanas tostadas y picadas</li>
<li>2 cucharadas de azúcar moreno</li>
<li>30g de mantequilla</li>
<li>1 cucharadita de canela en polvo (opcional)</li>
<li>Una pizca de sal marina</li>
</ul>

<h3>Preparación de la masa</h3>
<ol>
<li>En un tazón grande, mezcla la harina, el azúcar y la sal.</li>
<li>En otro recipiente, bate los huevos y añade la leche, la mantequilla derretida y el extracto de vainilla.</li>
<li>Vierte los ingredientes líquidos sobre los secos y mezcla con batidora o a mano hasta obtener una masa suave y sin grumos.</li>
<li>Deja reposar la masa en el refrigerador por al menos 30 minutos (idealmente 1 hora). Esto permite que la harina se hidrate completamente y las crepes queden más tiernas.</li>
</ol>

<h3>Preparación del relleno</h3>
<ol>
<li>Pica el chocolate en trozos pequeños y colócalo en un tazón resistente al calor.</li>
<li>Calienta la crema hasta que esté a punto de hervir y viértela sobre el chocolate. Deja reposar 1 minuto y luego mezcla hasta que el chocolate esté completamente derretido y la mezcla sea homogénea. Añade una pizca de sal y reserva.</li>
<li>Corta los plátanos en rodajas diagonales de aproximadamente 1 cm de grosor.</li>
<li>En una sartén, derrite la mantequilla a fuego medio y añade el azúcar moreno. Cuando comience a burbujear, agrega los plátanos y la canela.</li>
<li>Cocina por 2-3 minutos hasta que los plátanos estén caramelizados pero aún mantengan su forma. Retira del fuego y reserva.</li>
</ol>

<h3>Cocinando las crepes</h3>
<ol>
<li>Calienta una sartén antiadherente (preferiblemente específica para crepes) a fuego medio-alto.</li>
<li>Engrasa ligeramente la superficie con mantequilla o aceite usando papel absorbente.</li>
<li>Vierte aproximadamente 1/4 de taza de masa en el centro de la sartén y gira rápidamente para distribuirla en una capa fina y uniforme.</li>
<li>Cocina por 1-2 minutos hasta que los bordes comiencen a dorarse y se despeguen ligeramente.</li>
<li>Voltea la crepe con una espátula y cocina el otro lado por 30-60 segundos.</li>
<li>Transfiere a un plato y continúa con el resto de la masa, apilando las crepes ya cocinadas.</li>
</ol>

<h3>Montaje final</h3>
<ol>
<li>Coloca una crepe en un plato.</li>
<li>Extiende una cucharada generosa de la ganache de chocolate sobre la mitad de la crepe.</li>
<li>Añade algunas rodajas de plátano caramelizado sobre el chocolate.</li>
<li>Dobla la crepe por la mitad y luego nuevamente para formar un triángulo (o enrolla según prefieras).</li>
<li>Decora con más rodajas de plátano, un poco de ganache de chocolate por encima y espolvorea con avellanas picadas.</li>
<li>Opcional: añade una bola de helado de vainilla al lado para una experiencia completa.</li>
</ol>

<h3>Consejos del chef</h3>
<ul>
<li>La masa puede prepararse con anticipación y guardarse en el refrigerador hasta por 24 horas.</li>
<li>Si prefieres una versión más ligera, puedes usar leche desnatada y reducir la cantidad de azúcar.</li>
<li>Para una versión sin lácteos, sustituye la leche por leche de almendras o avena, y usa chocolate vegano.</li>
<li>El punto perfecto del plátano es cuando está maduro pero aún firme, con algunas manchas marrones en la piel.</li>
<li>Puedes añadir un toque de licor (ron o Baileys) a la ganache de chocolate para una versión adulta.</li>
</ul>

<p>¡Esperamos que disfrutes preparando esta receta en casa! No dudes en compartir tus creaciones en redes sociales etiquetándonos. Y recuerda, nuestras puertas siempre están abiertas cuando quieras probar la versión original o descubrir nuevas combinaciones.</p>`,
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
          content: `<p>Nos complace anunciar que, a partir del 1 de noviembre, <strong>Crepes & Coffee</strong> ampliará su horario de apertura para atender mejor a nuestros clientes madrugadores. Esta decisión responde a las numerosas peticiones que hemos recibido de personas que desean disfrutar de nuestras crepes y café de especialidad antes de comenzar su jornada laboral.</p>

<h3>Nuevo horario</h3>
<p>A partir del 1 de noviembre de 2023, nuestro horario será:</p>
<ul>
<li><strong>Lunes a viernes:</strong> 7:00 AM - 10:00 PM (antes 8:00 AM)</li>
<li><strong>Sábados y domingos:</strong> 8:00 AM - 11:00 PM (sin cambios)</li>
</ul>

<h3>Menú especial de desayuno</h3>
<p>Para celebrar esta ampliación de horario, hemos creado un menú especial de desayuno que estará disponible de 7:00 AM a 11:00 AM todos los días. Este menú incluye:</p>

<h4>Combos de desayuno</h4>
<ul>
<li><strong>Desayuno Clásico:</strong> Crepe de jamón y queso + café americano o té + jugo de naranja pequeño</li>
<li><strong>Desayuno Dulce:</strong> Crepe de frutas con yogur + café con leche o cappuccino + smoothie pequeño</li>
<li><strong>Desayuno Completo:</strong> Crepe de huevo revuelto con espinacas y queso + crepe mini de nutella + café a elección + jugo natural</li>
</ul>

<h4>Nuevas crepes matutinas</h4>
<p>Además de nuestras crepes tradicionales, hemos añadido opciones especiales para el desayuno:</p>
<ul>
<li>Crepe de huevos revueltos con espinacas y queso feta</li>
<li>Crepe de salmón ahumado con queso crema y eneldo</li>
<li>Crepe de yogur griego con granola y frutas frescas</li>
<li>Crepe de avena y plátano con miel y canela</li>
</ul>

<h3>Café para llevar</h3>
<p>Entendemos que las mañanas pueden ser ajetreadas, por eso hemos optimizado nuestro servicio para ofrecer café para llevar de manera rápida y eficiente. Hemos incorporado un mostrador específico para pedidos para llevar, donde podrás recoger tu café y crepes sin necesidad de esperar en la fila principal.</p>

<p>Además, estrenamos un sistema de pedidos anticipados a través de nuestra aplicación móvil, que te permitirá ordenar y pagar con antelación y pasar solo a recoger tu pedido.</p>

<h3>Promoción de inauguración</h3>
<p>Para celebrar nuestro nuevo horario, durante todo el mes de noviembre ofreceremos:</p>
<ul>
<li>20% de descuento en todos los desayunos de 7:00 AM a 8:00 AM</li>
<li>Café americano a $1 con la compra de cualquier crepe antes de las 9:00 AM</li>
<li>Tarjeta de fidelidad especial: por cada 5 desayunos, el 6º gratis</li>
</ul>

<h3>Reservas para desayunos de negocios</h3>
<p>También estamos introduciendo la posibilidad de reservar mesas para desayunos de negocios. Ofrecemos un espacio tranquilo con Wi-Fi de alta velocidad y enchufes en cada mesa, ideal para reuniones matutinas. Para grupos de 4 o más personas, ofrecemos un menú especial con precio fijo por persona.</p>

<p>Para reservas de desayunos de negocios, por favor contacta con nosotros con al menos 24 horas de antelación.</p>

<h3>Compromiso con la calidad</h3>
<p>A pesar de la ampliación de horario, mantenemos nuestro compromiso con la calidad. Seguiremos utilizando ingredientes frescos y preparando nuestras crepes al momento. Nuestro café continuará siendo de especialidad, recién molido para cada preparación.</p>

<p>Esperamos que esta ampliación de horario te permita disfrutar de nuestros productos en un momento más conveniente para ti. ¡Te esperamos a partir de las 7:00 AM para comenzar el día con el mejor sabor!</p>`,
          image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1147&q=80',
          date: '2023-09-20',
          author: 'Gerencia',
          category: 'novedades',
          featured: false
        }
      ];

      // Encontrar el artículo solicitado
      const currentArticle = mockArticles.find(article => article.id === parseInt(id));
      
      // Encontrar artículos relacionados (misma categoría, excluyendo el actual)
      const related = mockArticles
        .filter(article => article.category === currentArticle?.category && article.id !== parseInt(id))
        .slice(0, 3);
      
      setArticle(currentArticle);
      setRelatedArticles(related);
      setLoading(false);
    }, 1000);
  }, [id]);

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Obtener categoría formateada
  const getCategoryLabel = (category) => {
    const categories = {
      'novedades': 'Novedades',
      'eventos': 'Eventos',
      'consejos': 'Consejos',
      'recetas': 'Recetas'
    };
    return categories[category] || category;
  };

  // Obtener color de categoría
  const getCategoryColor = (category) => {
    const colors = {
      'novedades': 'bg-amber-500',
      'eventos': 'bg-green-500',
      'consejos': 'bg-blue-500',
      'recetas': 'bg-purple-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-[60vh]">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Artículo no encontrado</h2>
        <p className="text-gray-600 mb-8">El artículo que estás buscando no existe o ha sido eliminado.</p>
        <Link to="/blog" className="btn btn-primary">
          <FaArrowLeft className="mr-2" /> Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Navegación de regreso */}
      <div className="mb-8">
        <Link to="/blog" className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium">
          <FaArrowLeft className="mr-2" /> Volver al blog
        </Link>
      </div>

      {/* Encabezado del artículo */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${getCategoryColor(article.category)}`}>
            {getCategoryLabel(article.category)}
          </span>
          <span className="text-gray-500 text-sm">{formatDate(article.date)}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{article.title}</h1>
        <div className="flex items-center text-gray-600">
          <FaUser className="mr-2" />
          <span>{article.author}</span>
        </div>
      </div>

      {/* Imagen principal */}
      <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Contenido del artículo */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-12">
        <div 
          className="prose prose-amber max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-li:text-gray-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      {/* Compartir */}
      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <FaShare className="mr-2" /> Compartir este artículo
        </h3>
        <div className="flex space-x-4">
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Compartir en Facebook"
          >
            <FaFacebook size={18} />
          </a>
          <a 
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors"
            aria-label="Compartir en Twitter"
          >
            <FaTwitter size={18} />
          </a>
          <a 
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title} ${window.location.href}`)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
            aria-label="Compartir en WhatsApp"
          >
            <FaWhatsapp size={18} />
          </a>
          <a 
            href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`He encontrado este artículo interesante y quería compartirlo contigo: ${window.location.href}`)}`} 
            className="bg-gray-600 text-white p-3 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Compartir por Email"
          >
            <FaEnvelope size={18} />
          </a>
        </div>
      </div>

      {/* Artículos relacionados */}
      {relatedArticles.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Artículos relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map(related => (
              <div key={related.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={related.image} 
                    alt={related.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white text-amber-600 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md">
                    {related.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{related.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{related.excerpt}</p>
                  <Link 
                    to={`/blog/${related.id}`} 
                    className="text-amber-600 text-sm font-medium hover:text-amber-700 flex items-center"
                  >
                    Leer más <FaArrowRight className="ml-1" size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Llamada a la acción */}
      <div className="bg-amber-50 rounded-xl p-8 mb-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Te ha gustado este artículo?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Visítanos en nuestra tienda para probar nuestras deliciosas crepes y café de especialidad. ¡Te esperamos!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/productos" className="btn btn-primary">
              Ver nuestro menú
            </Link>
            <Link to="/contacto" className="btn btn-outline border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
              Contáctanos
            </Link>
          </div>
        </div>
      </div>

      {/* Enlaces rápidos */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Link to="/" className="text-gray-600 hover:text-amber-600 transition-colors">Inicio</Link>
        <span className="text-gray-400">|</span>
        <Link to="/blog" className="text-gray-600 hover:text-amber-600 transition-colors">Blog</Link>
        <span className="text-gray-400">|</span>
        <Link to="/productos" className="text-gray-600 hover:text-amber-600 transition-colors">Productos</Link>
        <span className="text-gray-400">|</span>
        <Link to="/contacto" className="text-gray-600 hover:text-amber-600 transition-colors">Contacto</Link>
      </div>
    </div>
  );
};

export default BlogDetail;