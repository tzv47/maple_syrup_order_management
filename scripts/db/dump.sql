-- CreateTable
CREATE TABLE carts (
  "id" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "qty" INT NOT NULL,
  "price" DECIMAL(12, 2) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE orders (
  "id" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "qty" INT NOT NULL,
  "orderStatus" TEXT NOT NULL,
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
INSERT INTO carts ("id", "productId", "name", "image", "qty", "price") VALUES ('CART-001', '001', 'Maple Syrup AMBER','http://localhost/amber.png', 20, 2);
INSERT INTO carts ("id", "productId", "name", "image", "qty", "price") VALUES ('CART-002', '002', 'Maple Syrup DARK','http://localhost/dark.png', 20, 2);
INSERT INTO carts ("id", "productId", "name", "image", "qty", "price") VALUES ('CART-003', '003', 'Maple Syrup CLEAR','http://localhost/clear.png', 20, 2);

INSERT INTO products ("id", "name", "description", "image", "price", "maxQty", "type") VALUES ('001', 'Amber maple syrup', 'Maple Syrup type AMBER','http://localhost/amber.png', 20, 5, 'AMBER');
INSERT INTO products ("id", "name", "description", "image", "price", "maxQty", "type") VALUES ('002', 'Dark maple syrup', 'Maple Syrup type DARK','http://localhost/amber.png', 20, 5, 'DARK');
INSERT INTO products ("id", "name", "description", "image", "price", "maxQty", "type") VALUES ('003', 'Clear maple syrup', 'Maple Syrup type CLEAR','http://localhost/amber.png', 20, 5, 'CLEAR');