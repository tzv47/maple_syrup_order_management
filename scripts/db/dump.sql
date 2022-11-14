-- CreateTable
CREATE TABLE carts (
  "id" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "qty" INT NOT NULL,
  "user" TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE products (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "price" DECIMAL(12, 2) NULL,
  "maxQty" INT NOT NULL,
  "type" TEXT NOT NULL,
  PRIMARY KEY (id)
);

-- Seed
INSERT INTO carts ("id", "productId", "qty", "user") VALUES ('CART-001', '001', 20, 'tzv');
INSERT INTO carts ("id", "productId", "qty", "user") VALUES ('CART-004', '001', 3, 'testUser');
INSERT INTO carts ("id", "productId", "qty", "user") VALUES ('CART-002', '002', 20, 'tzv');
INSERT INTO carts ("id", "productId", "qty", "user") VALUES ('CART-003', '003', 20, 'tzv');

INSERT INTO products ("id", "name", "description", "image", "price", "maxQty", "type") VALUES ('001', 'Amber maple syrup', 'Maple Syrup type AMBER','http://localhost/amber.png', 20, 50, 'AMBER');
INSERT INTO products ("id", "name", "description", "image", "price", "maxQty", "type") VALUES ('002', 'Dark maple syrup', 'Maple Syrup type DARK','http://localhost/amber.png', 20, 50, 'DARK');
INSERT INTO products ("id", "name", "description", "image", "price", "maxQty", "type") VALUES ('003', 'Clear maple syrup', 'Maple Syrup type CLEAR','http://localhost/amber.png', 20, 50, 'CLEAR');