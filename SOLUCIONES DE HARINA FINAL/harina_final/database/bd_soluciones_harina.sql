-- ============================================================
--  SOLUCIONES DE HARINA — BASE DE DATOS
--  XAMPP / phpMyAdmin
--
--  INSTRUCCIONES:
--  1. Abre http://localhost/phpmyadmin
--  2. Clic en "SQL" en la barra superior
--  3. Pega TODO este texto y clic en "Continuar"
-- ============================================================

DROP DATABASE IF EXISTS `bd_soluciones_harina`;
CREATE DATABASE `bd_soluciones_harina` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bd_soluciones_harina`;

-- USUARIOS
CREATE TABLE `usuarios`(
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(120) NOT NULL,
  `email` VARCHAR(180) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `rol` ENUM('admin','editor','visor') DEFAULT 'visor',
  `activo` TINYINT(1) DEFAULT 1,
  `creado_en` DATETIME DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB;
INSERT INTO `usuarios`(`nombre`,`email`,`password`,`rol`) VALUES
('Administrador','admin@solucionesdeharina.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','admin');

-- EMPLEADOS
CREATE TABLE `empleados`(
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(150) NOT NULL,
  `cargo` VARCHAR(150) NOT NULL,
  `departamento` VARCHAR(100),
  `email` VARCHAR(180),
  `telefono` VARCHAR(30),
  `foto_url` VARCHAR(500),
  `activo` TINYINT(1) DEFAULT 1,
  `fecha_ingreso` DATE,
  `creado_en` DATETIME DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB;
INSERT INTO `empleados`(`nombre`,`cargo`,`departamento`,`email`) VALUES
('María García','Gerente General','Dirección','maria@solucionesdeharina.com'),
('Carlos López','Jefe de Producción','Producción','carlos@solucionesdeharina.com'),
('Ana Martínez','Directora Comercial','Ventas','ana@solucionesdeharina.com'),
('Pedro Rodríguez','Analista de Calidad','Calidad','pedro@solucionesdeharina.com');

-- VACANTES
CREATE TABLE `vacantes`(
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(200) NOT NULL,
  `descripcion` TEXT,
  `area` VARCHAR(100),
  `tipo` ENUM('tiempo_completo','medio_tiempo','practicante') DEFAULT 'tiempo_completo',
  `salario_min` DECIMAL(12,2),
  `salario_max` DECIMAL(12,2),
  `activa` TINYINT(1) DEFAULT 1,
  `creado_en` DATETIME DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB;
INSERT INTO `vacantes`(`titulo`,`descripcion`,`area`,`tipo`,`salario_min`,`salario_max`) VALUES
('Operario de Producción','Manejo de maquinaria industrial. Exp. mínima 1 año.','Producción','tiempo_completo',1800000,2200000),
('Asistente Comercial','Atención al cliente y gestión de pedidos.','Ventas','tiempo_completo',1500000,2000000),
('Auxiliar de Calidad','Control de calidad en líneas de producción.','Calidad','tiempo_completo',1600000,2100000),
('Practicante de Sistemas','Apoyo en sistemas y página web.','Sistemas','practicante',900000,1200000);

-- POSTULACIONES
CREATE TABLE `postulaciones`(
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(150) NOT NULL,
  `apellido` VARCHAR(150) NOT NULL,
  `email` VARCHAR(180) NOT NULL,
  `telefono` VARCHAR(30),
  `cargo_aspirado` VARCHAR(200),
  `experiencia` TEXT,
  `cv_url` VARCHAR(500),
  `estado` ENUM('pendiente','revisado','entrevista','rechazado','contratado') DEFAULT 'pendiente',
  `creado_en` DATETIME DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB;

-- MENSAJES CONTACTO
CREATE TABLE `mensajes_contacto`(
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(150) NOT NULL,
  `email` VARCHAR(180) NOT NULL,
  `telefono` VARCHAR(30),
  `asunto` VARCHAR(250),
  `mensaje` TEXT NOT NULL,
  `leido` TINYINT(1) DEFAULT 0,
  `respondido` TINYINT(1) DEFAULT 0,
  `creado_en` DATETIME DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB;

-- RECLAMOS
CREATE TABLE `reclamos`(
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `numero_radicado` VARCHAR(40) NOT NULL UNIQUE,
  `tipo` ENUM('producto','servicio','facturacion','entrega','otro') NOT NULL,
  `nombre_cliente` VARCHAR(150) NOT NULL,
  `email_cliente` VARCHAR(180) NOT NULL,
  `telefono_cliente` VARCHAR(30),
  `numero_factura` VARCHAR(50),
  `descripcion` TEXT NOT NULL,
  `estado` ENUM('recibido','en_proceso','resuelto','cerrado') DEFAULT 'recibido',
  `respuesta` TEXT,
  `creado_en` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `resuelto_en` DATETIME
)ENGINE=InnoDB;

-- PQR
CREATE TABLE `pqr`(
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `numero_pqr` VARCHAR(40) NOT NULL UNIQUE,
  `tipo` ENUM('peticion','queja','recurso') NOT NULL,
  `nombre_solicitante` VARCHAR(150) NOT NULL,
  `email_solicitante` VARCHAR(180) NOT NULL,
  `telefono` VARCHAR(30),
  `cedula` VARCHAR(20),
  `descripcion` TEXT NOT NULL,
  `estado` ENUM('recibido','en_revision','en_proceso','respondido','cerrado') DEFAULT 'recibido',
  `respuesta` TEXT,
  `fecha_limite` DATE,
  `creado_en` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `respondido_en` DATETIME
)ENGINE=InnoDB;

-- PRODUCTOS
CREATE TABLE `productos`(
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(200) NOT NULL,
  `descripcion` TEXT,
  `categoria` ENUM('harina','galleta','torta','pan','postre','otro') NOT NULL,
  `precio` DECIMAL(12,2),
  `unidad` VARCHAR(50) DEFAULT 'kg',
  `stock` INT DEFAULT 0,
  `activo` TINYINT(1) DEFAULT 1,
  `creado_en` DATETIME DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB;
INSERT INTO `productos`(`nombre`,`descripcion`,`categoria`,`precio`,`unidad`) VALUES
('Harina de Trigo Premium','Harina 000 ideal para repostería y panadería.','harina',3500,'kg'),
('Harina Integral Especial','Alto contenido de fibra. Perfecta para panes saludables.','harina',4200,'kg'),
('Galletas de Mantequilla','Artesanales con mantequilla real.','galleta',8500,'paquete 500g'),
('Galletas de Chocolate','Chips de chocolate belga en cada bocado.','galleta',9200,'paquete 500g'),
('Torta de Vainilla','Esponjosa torta de vainilla bourbon.','torta',45000,'unidad'),
('Torta de Chocolate Oscuro','Intensa y cremosa, chocolate oscuro 70%.','torta',52000,'unidad'),
('Pan Artesanal de Semillas','Masa madre con linaza, ajonjolí y chía.','pan',7800,'unidad'),
('Bizcocho de Naranja','Húmedo con esencia natural de naranja.','postre',28000,'unidad');

-- CONFIGURACIÓN
CREATE TABLE `configuracion`(
  `clave` VARCHAR(100) PRIMARY KEY,
  `valor` TEXT,
  `descripcion` VARCHAR(250)
)ENGINE=InnoDB;
INSERT INTO `configuracion`(`clave`,`valor`,`descripcion`) VALUES
('nombre_empresa','Soluciones de Harina','Nombre legal'),
('nit','900.000.000-0','NIT'),
('email','info@solucionesdeharina.com','Email principal'),
('telefono','+57 314 8267299','WhatsApp'),
('direccion','Calle 10 # 20-30, Bogotá, Colombia','Sede principal'),
('horario','Lun-Vie 8AM-6PM | Sáb 8AM-2PM','Horario'),
('mision','Fabricar y distribuir productos de harina de la más alta calidad, llevando sabor y tradición a cada hogar colombiano con estándares internacionales.','Misión'),
('vision','Ser en 2030 la empresa líder en soluciones de harina y repostería a nivel nacional, reconocida por excelencia, innovación y compromiso con sus clientes.','Visión');

