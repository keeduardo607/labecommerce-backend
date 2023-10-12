-- Active: 1696529169201@@127.0.0.1@3306
-- TABELA DE USUARIOS
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- TABELA DE PRODUTOS
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- TABELA DE PEDIDOS
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    create_at TIMESTAMP NOT NULL,
    Foreign Key (buyer) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- RETORNA TODOS OS USUARIOS CADASTRADOS
SELECT * FROM users;

-- RETORNA TODOS OS PRODUTOS CADASTRADOS
SELECT * FROM products;

-- RETORNA TODOS OS PEDIDOS
SELECT * FROM purchases;

-- DELETAR TABELA
DROP TABLE users;
DROP TABLE products;
DROP TABLE purchases;
DROP TABLE purchases_products;

-- INSERÇÃO DE USUARIOS
INSERT INTO users VALUES 
('u001', 'Kevin Eduardo da Silva', 'kevin@email.com', 'Kevin@123', DATETIME('now')),
('u002', 'Natalia Moya Ferreira', 'natalia@email.com', 'Natalia1210', DATETIME('now')),
('u003', 'Daniela Aparecida Silva', 'daniela@email.com', 'Daniela@*6985', DATETIME('now')),
('u004', 'Anne Beatriz da Silva', 'annebeatriz@email.com', 'Anne@*1217', DATETIME('now'));

-- INSERÇÃO DE PRODUTOS
INSERT INTO products VALUES 
('prod001', 'Mouse Gamer', 250, 'Melhor mouse do mercado!', 'https://picsum.photos/seed/Mouse%20gamer/400'),
('prod002', 'Monitor Gamer', 990.90, 'Monitor LED Full HD 24 polegadas', 'https://picsum.photos/seed/Monitor/400'),
('prod003', 'Teclado Gamer', 189.90, 'Teclado Gamer Mecânico com LED RGB', 'https://picsum.photos/seed/Teclado/400'),
('prod004', 'Abajur LED BLUETOOTH', 89, 'Abajur LED + Caixa de som BLUETOOTH', 'https://picsum.photos/seed/Abajur/400'),
('prod005', 'Head Phone Gamer', 129.90, 'Head Phone Gamer', 'https://picsum.photos/seed/Head%phone/400');

-- BUSCA PRODUTO POR NOME
SELECT * FROM products
WHERE name LIKE '%gamer%'

-- DELETA USUARIO POR ID
DELETE FROM users
WHERE id = 'u004'

-- DELETA PRODUTO POR ID
DELETE FROM products
WHERE id = 'prod003'

-- EDITA PRODUTO POR ID
UPDATE products
SET 
    name = 'Processor Intel',
    price = 899,
    description = 'Processador Intel Ultima Geração',
    image_url = 'https://picsum.photos/seed/Processador%20Intel/400'
WHERE id = 'prod001';  

-- INSERÇÃO DE PEDIDOS
INSERT INTO purchases VALUES
('p001', 'u001', 426, DATETIME('now')),
('p002', 'u002', 389, DATETIME('now')),
('p003', 'u003', 129, DATETIME('now'));

SELECT *
FROM users INNER JOIN purchases ON purchases.buyer = users.id;

-- EDITA O VALOR DO PEDIDO
UPDATE purchases 
  SET
    total_price = 100
WHERE id = 'p001';

-- TABELA DE RELAÇÕES
CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT (0),
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- 
INSERT INTO purchases_products VALUES
('p001', 'prod001', 3),
('p002', 'prod003', 1),
('p002', 'prod005', 7);

SELECT 
  purchases.id AS 'ID do Pedido',
  users.name AS 'Nome do Usuario',
  users.email AS 'Email do Usuario',
  products.id AS 'ID do Produto',
  products.name AS 'Nome do Produto',
  products.price AS 'Valor do Produto',
  purchases_products.quantity AS 'Quantidade',
  purchases.total_price AS 'Valor Total'
FROM purchases_products
INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
INNER JOIN users ON purchases.buyer = users.id
INNER JOIN products ON purchases_products.product_id = products.id;






