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
    walletId SERIAL PRIMARY KEY,
    userId INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    _1 INT,
    _5 INT,
    _10 INT,
    _20 INT,
    _50 INT,
    _100 INT,
    _500 INT,
    _1000 INT
);

INSERT INTO
    wallets (userId, _1, _5, _10, _20, _50, _100, _500, _1000)
VALUES
    (1, 100, 100, 100, 100, 100, 100, 100, 100),
    (2, 10, 10, 10, 10, 10, 10, 10, 10);
    
CREATE TABLE items(
  itemId SERIAL PRIMARY KEY,
  name VARCHAR(60),
  amount INT,
  price INT
);
CREATE TABLE inventories(
    inventoryId SERIAL PRIMARY KEY,
    userId INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE item_inventories(
    inventoryId INT NOT NULL REFERENCES inventories(inventoryId) ON UPDATE CASCADE ON DELETE CASCADE,
    itemId INT NOT NULL REFERENCES items(itemId) ON UPDATE CASCADE ON DELETE CASCADE
);