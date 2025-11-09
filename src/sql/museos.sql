-- Limpiar tabla antes de insertar
TRUNCATE TABLE museum_entity CASCADE;

-- Insertar 20 instancias de museos con año de fundación
INSERT INTO museum_entity (id, name, description, address, city, image, founded_before) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Museo Nacional', 'Museo dedicado a la historia y cultura nacional con más de 10,000 piezas arqueológicas', 'Carrera 7 #28-66', 'Bogotá', 'museo-nacional.jpg', 1823),
('550e8400-e29b-41d4-a716-446655440002', 'Museo del Oro', 'Colección precolombina de orfebrería con más de 55,000 piezas de oro', 'Calle 16 #5-41', 'Bogotá', 'museo-oro.jpg', 1939),
('550e8400-e29b-41d4-a716-446655440003', 'Museo Botero', 'Arte internacional y colombiano donado por Fernando Botero', 'Calle 11 #4-41', 'Bogotá', 'museo-botero.jpg', 2000),
('550e8400-e29b-41d4-a716-446655440004', 'Museo de Antioquia', 'Arte colombiano y latinoamericano con énfasis en obras de Botero', 'Carrera 52 #52-43', 'Medellín', 'museo-antioquia.jpg', 1881),
('550e8400-e29b-41d4-a716-446655440005', 'Museo de Arte Moderno', 'Arte contemporáneo colombiano e internacional', 'Calle 24 #6-00', 'Bogotá', 'mambo.jpg', 1963),
('550e8400-e29b-41d4-a716-446655440006', 'Casa Museo Quinta de Bolívar', 'Casa colonial donde vivió Simón Bolívar', 'Calle 20 #3-23 Este', 'Bogotá', 'quinta-bolivar.jpg', 1922),
('550e8400-e29b-41d4-a716-446655440007', 'Museo Colonial', 'Arte colonial religioso de los siglos XVI al XIX', 'Carrera 6 #9-77', 'Bogotá', 'museo-colonial.jpg', 1942),
('550e8400-e29b-41d4-a716-446655440008', 'Museo del Caribe', 'Historia y cultura de la región Caribe colombiana', 'Calle 36 #46-66', 'Barranquilla', 'museo-caribe.jpg', 2009),
('550e8400-e29b-41d4-a716-446655440009', 'Museo de Arte Moderno La Tertulia', 'Colección de arte moderno y contemporáneo', 'Avenida Colombia #5-105 Oeste', 'Cali', 'tertulia.jpg', 1956),
('550e8400-e29b-41d4-a716-446655440010', 'Museo Arqueológico', 'Piezas arqueológicas de culturas precolombinas del Valle del Cauca', 'Carrera 4 #6-59', 'Cali', 'museo-arqueologico-cali.jpg', 1965),
('550e8400-e29b-41d4-a716-446655440011', 'Museo de Arte Universidad Nacional', 'Arte colombiano de los siglos XIX y XX', 'Carrera 30 #45-03', 'Bogotá', 'mun.jpg', 1945),
('550e8400-e29b-41d4-a716-446655440012', 'Museo Casa de la Memoria', 'Memoria histórica del conflicto armado en Medellín', 'Calle 51 #36-66', 'Medellín', 'casa-memoria.jpg', 2012),
('550e8400-e29b-41d4-a716-446655440013', 'Museo Paleontológico', 'Fósiles y evidencias de la evolución en Colombia', 'Calle 10 #3-10', 'Villa de Leyva', 'museo-paleontologico.jpg', 1977),
('550e8400-e29b-41d4-a716-446655440014', 'Museo Naval del Caribe', 'Historia naval y marítima de Colombia', 'Calle San Juan de Dios', 'Cartagena', 'museo-naval.jpg', 1992),
('550e8400-e29b-41d4-a716-446655440015', 'Museo Histórico de Cartagena', 'Historia colonial de Cartagena de Indias', 'Plaza de Bolívar', 'Cartagena', 'museo-historico-ctg.jpg', 1874),
('550e8400-e29b-41d4-a716-446655440016', 'Museo de Ciencias Naturales', 'Biodiversidad y ecosistemas colombianos', 'Carrera 7 #40-62', 'Bogotá', 'museo-ciencias.jpg', 1936),
('550e8400-e29b-41d4-a716-446655440017', 'Museo del Chicó', 'Casa colonial con arte y muebles coloniales', 'Carrera 7 #93-01', 'Bogotá', 'museo-chico.jpg', 1972),
('550e8400-e29b-41d4-a716-446655440018', 'Museo de Arte Religioso', 'Arte sacro y religioso colonial', 'Calle 10 #6-20', 'Popayán', 'museo-religioso-popayan.jpg', 1968),
('550e8400-e29b-41d4-a716-446655440019', 'Museo Etnográfico', 'Culturas indígenas y etnografía colombiana', 'Carrera 2 #12-91', 'Pasto', 'museo-etnografico.jpg', 1985),
('550e8400-e29b-41d4-a716-446655440020', 'Museo de la Independencia', 'Historia de la independencia de Colombia', 'Calle 10 #2-93', 'Bogotá', 'museo-independencia.jpg', 1960);
