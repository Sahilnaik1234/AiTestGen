import unittest
from ProductService import ProductService
import uuid
from datetime import datetime

class TestProductService(unittest.TestCase):

    def setUp(self):
        self.product_service = ProductService()

    def test_add_product(self):
        # Test adding a product with valid inputs
        product = self.product_service.add_product("Test Product", "ELECTRONICS", 10.99, 100)
        self.assertIsNotNone(product)
        self.assertIn("id", product)
        self.assertIn("name", product)
        self.assertIn("category", product)
        self.assertIn("price", product)
        self.assertIn("stock", product)
        self.assertIn("created_at", product)

    def test_add_product_invalid_name(self):
        # Test adding a product with an invalid name
        with self.assertRaises(ValueError):
            self.product_service.add_product("", "ELECTRONICS", 10.99, 100)

    def test_add_product_invalid_category(self):
        # Test adding a product with an invalid category
        with self.assertRaises(ValueError):
            self.product_service.add_product("Test Product", "INVALID CATEGORY", 10.99, 100)

    def test_add_product_invalid_price(self):
        # Test adding a product with an invalid price
        with self.assertRaises(ValueError):
            self.product_service.add_product("Test Product", "ELECTRONICS", 0, 100)

    def test_add_product_invalid_stock(self):
        # Test adding a product with an invalid stock
        with self.assertRaises(ValueError):
            self.product_service.add_product("Test Product", "ELECTRONICS", 10.99, -100)

    def test_update_stock(self):
        # Test updating the stock of a product
        product = self.product_service.add_product("Test Product", "ELECTRONICS", 10.99, 100)
        self.assertTrue(self.product_service.update_stock(product["id"], 50))
        self.assertEqual(self.product_service.products[product["id"]]["stock"], 150)

    def test_update_stock_invalid_product_id(self):
        # Test updating the stock of a non-existent product
        self.assertFalse(self.product_service.update_stock(str(uuid.uuid4())[:8], 50))

    def test_update_stock_negative_quantity(self):
        # Test updating the stock with a negative quantity
        product = self.product_service.add_product("Test Product", "ELECTRONICS", 10.99, 100)
        self.assertFalse(self.product_service.update_stock(product["id"], -150))

    def test_calculate_bulk_price(self):
        # Test calculating the bulk price of a product
        product = self.product_service.add_product("Test Product", "ELECTRONICS", 10.99, 100)
        self.assertAlmostEqual(self.product_service.calculate_bulk_price(product["id"], 10), 10.99 * 10)
        self.assertAlmostEqual(self.product_service.calculate_bulk_price(product["id"], 50), 10.99 * 50 * 0.9)
        self.assertAlmostEqual(self.product_service.calculate_bulk_price(product["id"], 100), 10.99 * 100 * 0.8)

    def test_calculate_bulk_price_invalid_product_id(self):
        # Test calculating the bulk price of a non-existent product
        self.assertEqual(self.product_service.calculate_bulk_price(str(uuid.uuid4())[:8], 10), -1)

    def test_find_products_by_category(self):
        # Test finding products by category
        product1 = self.product_service.add_product("Test Product 1", "ELECTRONICS", 10.99, 100)
        product2 = self.product_service.add_product("Test Product 2", "BOOKS", 5.99, 50)
        products = self.product_service.find_products_by_category("ELECTRONICS")
        self.assertIn(product1, products)
        self.assertNotIn(product2, products)

    def test_get_inventory_worth(self):
        # Test getting the total worth of the inventory
        product1 = self.product_service.add_product("Test Product 1", "ELECTRONICS", 10.99, 100)
        product2 = self.product_service.add_product("Test Product 2", "BOOKS", 5.99, 50)
        self.assertAlmostEqual(self.product_service.get_inventory_worth(), 10.99 * 100 + 5.99 * 50)

    def test_apply_seasonal_discount(self):
        # Test applying a seasonal discount to a category
        product1 = self.product_service.add_product("Test Product 1", "ELECTRONICS", 10.99, 100)
        product2 = self.product_service.add_product("Test Product 2", "BOOKS", 5.99, 50)
        self.assertTrue(self.product_service.apply_seasonal_discount("ELECTRONICS", 10))
        self.assertAlmostEqual(self.product_service.products[product1["id"]]["price"], 10.99 * 0.9)
        self.assertAlmostEqual(self.product_service.products[product2["id"]]["price"], 5.99)

    def test_apply_seasonal_discount_invalid_percentage(self):
        # Test applying a seasonal discount with an invalid percentage
        self.assertFalse(self.product_service.apply_seasonal_discount("ELECTRONICS", -10))

if __name__ == '__main__':
    unittest.main()