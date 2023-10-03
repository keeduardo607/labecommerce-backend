-- Active: 1696257937515@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- RETORNA TODOS OS USUARIOS CADASTRADOS
SELECT * FROM users;

-- RETORNA TODOS OS PRODUTOS CADASTRADOS
SELECT * FROM products;

-- DELETAR TABELA
DROP TABLE users;
DROP TABLE products;

-- INSERÇÃO DE USUARIOS
INSERT INTO users 
VALUES ('u001', 'Kevin Eduardo da Silva', 'kevin@email.com', 'Kevin@123', DATETIME('now'));

INSERT INTO users
VALUES ('u002', 'Natalia Moya Ferreira', 'natalia@email.com', 'Natalia1210', DATETIME('now'));

INSERT INTO users
VALUES ('u003', 'Daniela Aparecida Silva', 'daniela@email.com', 'Daniela@*6985', DATETIME('now'))

INSERT INTO users
VALUES ('u004', 'Anne Beatriz da Silva', 'annebeatriz@email.com', 'Anne@*1217', DATETIME('now'))

-- INSERÇÃO DE PRODUTOS
INSERT INTO products
VALUES ('prod001', 'Mouse Gamer', 250, 'Melhor mouse do mercado!', 'https://picsum.photos/seed/Mouse%20gamer/400');

INSERT INTO products
VALUES ('prod002', 'Monitor Gamer', 990.90, 'Monitor LED Full HD 24 polegadas', 'https://picsum.photos/seed/Monitor/400');

INSERT INTO products
VALUES ('prod003', 'Teclado Gamer', 189.90, 'Teclado Gamer Mecânico com LED RGB', 'https://picsum.photos/seed/Teclado/400');

INSERT INTO products
VALUES ('prod004', 'Abajur LED BLUETOOTH', 89, 'Abajur LED + Caixa de som BLUETOOTH', 'https://picsum.photos/seed/Abajur/400');

INSERT INTO products
VALUES ('prod005', 'Head Phone Gamer', 129.90, 'Head Phone Gamer', 'https://picsum.photos/seed/Head%phone/400');

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
WHERE id = 'prod001'  ;  
  











