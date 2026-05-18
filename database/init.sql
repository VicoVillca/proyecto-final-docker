CREATE DATABASE IF NOT EXISTS cv_db;
USE cv_db;

CREATE TABLE persona (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    foto VARCHAR(255) NOT NULL
);

CREATE TABLE formacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    institucion VARCHAR(200) NOT NULL,
    anio VARCHAR(10) NOT NULL,
    persona_id INT NOT NULL,
    FOREIGN KEY (persona_id) REFERENCES persona(id)
);

INSERT INTO persona (nombre, apellido, ciudad, foto) VALUES
('Abraham', 'Villca Alarcon', 'La Paz', 'https://avatars.githubusercontent.com/u/8919158?v=4');

INSERT INTO formacion (titulo, institucion, anio, persona_id) VALUES
('Imformatica', 'Universidad MAyor de San Andres', '2022', 1);
