DROP TYPE IF EXISTS roles;
CREATE TYPE roles AS ENUM ('CUSTOMER', 'VMACHINE');
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    role roles NOT NULL
);

INSERT INTO users (name, role)
VALUES
    ('Vending Machine', 'VMACHINE'),
		('Customer', 'CUSTOMER');
		
CREATE TABLE wallets(
    wallet_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    c1 INT,
    c5 INT,
    c10 INT,
    c20 INT,
    c50 INT,
    c100 INT,
    c500 INT,
    c1000 INT
);

INSERT INTO
    wallets (user_id, c1, c5, c10, c20, c50, c100, c500, c1000)
VALUES
    (1, 100, 100, 100, 100, 100, 100, 100, 100),
    (2, 10, 10, 10, 10, 10, 10, 10, 10);
    
CREATE TABLE items(
  item_id SERIAL PRIMARY KEY,
  name VARCHAR(60),
  price INT
);

INSERT INTO
    items (name, price)
VALUES
    ('Coca Cola', 22),
    ('Pepsi', 22),
    ('Water', 8),
    ('Red Bull', 30),
    ('Fanta', 18),
    ('Sprite', 18);

CREATE TABLE inventories(
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    item_id INT NOT NULL REFERENCES items(item_id) ON UPDATE CASCADE ON DELETE CASCADE,
    amount INT
);

INSERT INTO
    inventories (user_id, item_id, amount)
VALUES
    (1, 1, 10),
    (1, 2, 10),
    (1, 3, 10),
    (1, 4, 10),
    (1, 5, 10),
    (1, 6, 10),
    (2, 1, 1);