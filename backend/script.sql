-- USUARIOS
CREATE TABLE usuarios (
    id        SERIAL        PRIMARY KEY,
    nombre    VARCHAR(50)   NOT NULL,
    email     VARCHAR(50)   NOT NULL UNIQUE,
    password  VARCHAR(60)   NOT NULL,
    rol       VARCHAR(20)   DEFAULT 'usuario',
    created_at TIMESTAMP    DEFAULT NOW()
);

-- PRODUCTOS
CREATE TABLE productos (
    id          SERIAL        PRIMARY KEY,
    nombre      VARCHAR(100)  NOT NULL,
    descripcion TEXT          NOT NULL,
    precio      INT           NOT NULL,
    img         VARCHAR(1000),
    stock       INT           DEFAULT 1,
    condicion   VARCHAR(20)   CHECK (condicion IN ('Nuevo', 'Usado', 'Caja Abierta')),
    usuario_id  INT           REFERENCES usuarios(id),
    created_at  TIMESTAMP     DEFAULT NOW()
);

-- PEDIDOS (preliminar, todavía no en uso)
CREATE TABLE pedidos (
    id          SERIAL      PRIMARY KEY,
    usuario_id  INT         REFERENCES usuarios(id),
    fecha       TIMESTAMP   DEFAULT NOW(),
    total       INT         NOT NULL,
    estado      VARCHAR(20) DEFAULT 'pendiente'
);

-- DETALLE PEDIDOS
CREATE TABLE detalle_pedidos (
    id          SERIAL  PRIMARY KEY,
    pedido_id   INT     REFERENCES pedidos(id),
    producto_id INT     REFERENCES productos(id),
    cantidad    INT     DEFAULT 1,
    precio_unitario INT NOT NULL
);

INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Nicolás Kiefer', 'nico@kieferstore.cl', '123456', 'admin'),
('Comprador Test', 'test@correo.com', '123456', 'usuario');

INSERT INTO productos (nombre, descripcion, precio, img, stock, condicion, usuario_id) VALUES
('Cámara Sony Alpha', 'Cámara profesional mirrorless, poco uso.', 450000, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32', 1, 'Usado', 1),
('iPhone 13 Pro', 'Celular en perfecto estado.', 600000, 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5', 1, 'Nuevo', 1);