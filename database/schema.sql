-- Crear base de datos
CREATE DATABASE IF NOT EXISTS crepes_and_coffee;
USE crepes_and_coffee;

-- Tabla usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firebase_uid VARCHAR(255) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    rol ENUM('cliente', 'admin') DEFAULT 'cliente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    imagen_url TEXT,
    stock INT NOT NULL DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('pendiente', 'pagado', 'cancelado') DEFAULT 'pendiente',
    mercadopago_id VARCHAR(255),
    mercadopago_status VARCHAR(50),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla detalle_pedidos
CREATE TABLE detalle_pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- Índices para optimización
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_firebase_uid ON usuarios(firebase_uid);
CREATE INDEX idx_productos_activo ON productos(activo);
CREATE INDEX idx_pedidos_usuario ON pedidos(usuario_id);
CREATE INDEX idx_pedidos_estado ON pedidos(estado);
CREATE INDEX idx_detalle_pedido ON detalle_pedidos(pedido_id);
CREATE INDEX idx_detalle_producto ON detalle_pedidos(producto_id);

-- Insertar usuario administrador por defecto
INSERT INTO usuarios (firebase_uid, nombre, email, rol) VALUES 
('admin-default-uid', 'Administrador', 'admin@crepesandcoffee.com', 'admin');

-- Insertar productos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock) VALUES 
('Crepe de Nutella', 'Delicioso crepe relleno de Nutella y plátano', 8.50, 'https://via.placeholder.com/300x200?text=Crepe+Nutella', 50),
('Crepe de Fresa', 'Crepe con fresas frescas y crema batida', 9.00, 'https://via.placeholder.com/300x200?text=Crepe+Fresa', 30),
('Café Americano', 'Café americano de grano selecto', 3.50, 'https://via.placeholder.com/300x200?text=Cafe+Americano', 100),
('Café Latte', 'Café latte con leche espumosa', 4.50, 'https://via.placeholder.com/300x200?text=Cafe+Latte', 80),
('Crepe Salado de Jamón y Queso', 'Crepe salado con jamón y queso derretido', 10.00, 'https://via.placeholder.com/300x200?text=Crepe+Salado', 25),
('Cappuccino', 'Cappuccino tradicional italiano', 4.00, 'https://via.placeholder.com/300x200?text=Cappuccino', 60);

-- Trigger para actualizar stock después de un pedido
DELIMITER //
CREATE TRIGGER actualizar_stock_after_pedido
AFTER INSERT ON detalle_pedidos
FOR EACH ROW
BEGIN
    UPDATE productos 
    SET stock = stock - NEW.cantidad 
    WHERE id = NEW.producto_id;
END//
DELIMITER ;

-- Trigger para restaurar stock si se cancela un pedido
DELIMITER //
CREATE TRIGGER restaurar_stock_after_cancelacion
AFTER UPDATE ON pedidos
FOR EACH ROW
BEGIN
    IF OLD.estado != 'cancelado' AND NEW.estado = 'cancelado' THEN
        UPDATE productos p
        INNER JOIN detalle_pedidos dp ON p.id = dp.producto_id
        SET p.stock = p.stock + dp.cantidad
        WHERE dp.pedido_id = NEW.id;
    END IF;
END//
DELIMITER ;

-- Tabla categorías de eventos
CREATE TABLE categorias_eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla eventos
CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    descripcion_larga TEXT,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    ubicacion VARCHAR(200) NOT NULL,
    direccion VARCHAR(255),
    imagen_url TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    capacidad INT NOT NULL,
    plazas_disponibles INT NOT NULL,
    categoria_id INT NOT NULL,
    destacado BOOLEAN DEFAULT FALSE,
    instructor VARCHAR(100),
    instructor_bio TEXT,
    instructor_imagen TEXT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias_eventos(id) ON DELETE RESTRICT
);

-- Tabla reservas de eventos
CREATE TABLE reservas_eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evento_id INT NOT NULL,
    usuario_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'pendiente',
    mercadopago_id VARCHAR(255),
    mercadopago_status VARCHAR(50),
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE RESTRICT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Índices para optimización de eventos
CREATE INDEX idx_eventos_categoria ON eventos(categoria_id);
CREATE INDEX idx_eventos_fecha ON eventos(fecha);
CREATE INDEX idx_eventos_destacado ON eventos(destacado);
CREATE INDEX idx_eventos_activo ON eventos(activo);
CREATE INDEX idx_reservas_evento ON reservas_eventos(evento_id);
CREATE INDEX idx_reservas_usuario ON reservas_eventos(usuario_id);
CREATE INDEX idx_reservas_estado ON reservas_eventos(estado);

-- Trigger para actualizar plazas disponibles después de una reserva
DELIMITER //
CREATE TRIGGER actualizar_plazas_after_reserva
AFTER INSERT ON reservas_eventos
FOR EACH ROW
BEGIN
    UPDATE eventos 
    SET plazas_disponibles = plazas_disponibles - NEW.cantidad 
    WHERE id = NEW.evento_id;
END//
DELIMITER ;

-- Trigger para restaurar plazas si se cancela una reserva
DELIMITER //
CREATE TRIGGER restaurar_plazas_after_cancelacion
AFTER UPDATE ON reservas_eventos
FOR EACH ROW
BEGIN
    IF OLD.estado != 'cancelada' AND NEW.estado = 'cancelada' THEN
        UPDATE eventos
        SET plazas_disponibles = plazas_disponibles + OLD.cantidad
        WHERE id = NEW.evento_id;
    END IF;
END//
DELIMITER ;

-- Insertar categorías de eventos de ejemplo
INSERT INTO categorias_eventos (nombre, descripcion) VALUES 
('Taller', 'Talleres prácticos para aprender a preparar diferentes tipos de crepes y café'),
('Degustación', 'Sesiones de degustación de nuestros productos y especialidades'),
('Gastronómico', 'Eventos gastronómicos especiales como brunch, cenas temáticas y maridajes');

-- Insertar eventos de ejemplo
INSERT INTO eventos (titulo, descripcion, descripcion_larga, fecha, hora_inicio, hora_fin, ubicacion, direccion, imagen_url, precio, capacidad, plazas_disponibles, categoria_id, destacado, instructor, instructor_bio, instructor_imagen) VALUES 
('Taller de Crepes Dulces', 'Aprende a preparar deliciosos crepes dulces con diferentes rellenos y técnicas.', '<p>Sumérgete en el arte de hacer crepes dulces perfectos en este taller práctico. Aprenderás desde la preparación de la masa hasta las técnicas de cocción y presentación.</p><h3>¿Qué aprenderás?</h3><ul><li>Preparación de masa básica para crepes dulces</li><li>Técnicas de cocción y volteo</li><li>5 rellenos diferentes (Nutella, frutas, crema, chocolate, caramelo)</li><li>Presentación y decoración</li></ul><h3>¿Qué incluye?</h3><ul><li>Todos los ingredientes y utensilios</li><li>Recetario impreso</li><li>Degustación de tus creaciones</li><li>Certificado de participación</li><li>Una bebida a elegir (café, té o refresco)</li></ul>', '2023-11-15', '16:00:00', '18:00:00', 'Nuestra tienda principal', 'Av. Principal 123, Ciudad', 'https://images.unsplash.com/photo-1519676867240-f03562e64548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80', 25.00, 15, 8, 1, TRUE, 'Chef María Rodríguez', 'Pastelera profesional con más de 10 años de experiencia en repostería francesa.', 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80'),

('Degustación de Café de Especialidad', 'Descubre los diferentes perfiles de sabor de nuestros cafés de especialidad guiado por nuestro barista experto.', '<p>Sumérgete en el fascinante mundo del café de especialidad en esta sesión de cata guiada por nuestro barista jefe. Una experiencia sensorial que te permitirá apreciar los matices y complejidades de diferentes orígenes de café.</p><h3>¿Qué incluye la experiencia?</h3><ul><li>Degustación de 5 cafés de diferentes orígenes</li><li>Explicación sobre métodos de cultivo y procesamiento</li><li>Introducción a las técnicas de catación profesional</li><li>Guía de notas de cata</li><li>Pequeños bocados para acompañar</li></ul>', '2023-11-20', '17:30:00', '19:00:00', 'Nuestra tienda principal', 'Av. Principal 123, Ciudad', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 15.00, 20, 12, 2, TRUE, 'Barista Carlos Méndez', 'Barista certificado SCA con experiencia en competiciones internacionales.', 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=977&q=80'),

('Brunch Dominical', 'Disfruta de un brunch especial con crepes saladas, dulces, café y zumos naturales en un ambiente relajado.', '<p>Comienza tu domingo de la mejor manera con nuestro brunch especial. Una experiencia gastronómica completa donde podrás disfrutar de una selección de nuestras mejores crepes en un ambiente relajado y acogedor.</p><h3>Menú del brunch</h3><h4>Para compartir en mesa:</h4><ul><li>Tabla de quesos artesanales y mermeladas caseras</li><li>Selección de panes recién horneados</li></ul><h4>Plato principal (a elegir):</h4><ul><li>Crepe salado de jamón y queso con huevo</li><li>Crepe de salmón ahumado y aguacate</li><li>Crepe vegetariano con espinacas y champiñones</li></ul><h4>Postre:</h4><ul><li>Mini crepes dulces con diferentes toppings</li></ul><h4>Bebidas incluidas:</h4><ul><li>Café o té</li><li>Zumo natural</li><li>Agua mineral</li></ul>', '2023-11-26', '10:30:00', '13:00:00', 'Nuestra tienda principal', 'Av. Principal 123, Ciudad', 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80', 30.00, 30, 15, 3, FALSE, NULL, NULL, NULL),

('Noche de Crepes y Vino', 'Una velada especial con maridaje de crepes saladas y vinos seleccionados por nuestro sommelier.', '<p>Disfruta de una sofisticada velada donde nuestro chef y sommelier han creado una experiencia de maridaje única, combinando crepes gourmet con vinos cuidadosamente seleccionados.</p><h3>Menú degustación</h3><h4>Aperitivo:</h4><ul><li>Mini crepe de queso de cabra y miel con vino blanco Verdejo</li></ul><h4>Entrantes:</h4><ul><li>Crepe de champiñones silvestres y trufa con Pinot Noir</li><li>Crepe de pato confitado con reducción de frutos rojos con Merlot</li></ul><h4>Plato principal:</h4><ul><li>Crepe de ternera con salsa de vino tinto y Syrah reserva</li></ul><h4>Postre:</h4><ul><li>Crepe Suzette flambeado en mesa con vino dulce de postre</li></ul>', '2023-12-02', '19:00:00', '21:30:00', 'Nuestra tienda principal', 'Av. Principal 123, Ciudad', 'https://images.unsplash.com/photo-1470158499416-75be9aa0c4db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 45.00, 25, 10, 3, TRUE, NULL, NULL, NULL);