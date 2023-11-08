-- Active: 1699482333301@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        createad_at DEFAULT (DATE ('now', 'localtime'))
    );

INSERT INTO
    users (id, name, email, password)
VALUES (
        'u001',
        'Kevin Eduardo da Silva',
        'kevineduardo@email.com',
        'Keedu@2365'
    ), (
        'u002',
        'Ericles Eduardo da Silva',
        'ericles.eduardo12@email.com',
        'Ec25963_12'
    ), (
        'u003',
        'Anne Beatriz da Silva',
        'anne.beatriz@email.com',
        'anninha111@@'
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod001',
        'Mouse Gamer',
        250,
        'Melhor mouse do mercado!',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    ), (
        'prod002',
        'Monitor Gamer',
        990.90,
        'Monitor LED Full HD 24 polegadas',
        'https://picsum.photos/seed/Monitor/400'
    ), (
        'prod003',
        'Teclado Gamer',
        189.90,
        'Teclado Gamer Mecânico com LED RGB',
        'https://picsum.photos/seed/Teclado/400'
    ), (
        'prod004',
        'Abajur LED BLUETOOTH',
        89,
        'Abajur LED + Caixa de som BLUETOOTH',
        'https://picsum.photos/seed/Abajur/400'
    ), (
        'prod005',
        'Head Phone Gamer',
        129.90,
        'Head Phone Gamer',
        'https://picsum.photos/seed/Head%phone/400'
    );

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT DEFAULT (
            strftime(
                '%Y-%m-%d %H:%M:%S',
                'now',
                'localtime'
            )
        ),
        paid INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (buyer) REFERENCES users (id)
    );

INSERT INTO
    purchases (id, buyer, total_price, paid)
VALUES ('p001', 'u001', 426, 0), ('p002', 'u002', 389, 0), ('p003', 'u003', 129, 0);

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases (id),
        FOREIGN KEY (product_id) REFERENCES products (id)
    );

INSERT INTO purchases_products
VALUES ('p001', 'prod001', 3), ('p002', 'prod003', 1), ('p002', 'prod005', 7);