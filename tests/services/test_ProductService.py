import unittest
from ProductService import ProductService
import uuid
from datetime import datetime

class TestProductService(unittest.TestCase):

    def setUp(self):
        self.product_service = ProductService()

    def test_add_product_valid(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 10.99
        stock = 10

        # Act
        product = self.product_service.add_product(name, category, price, stock)

        # Assert
        self.assertIsNotNone(product)
        self.assertIn("id", product)
        self.assertIn("name", product)
        self.assertIn("category", product)
        self.assertIn("price", product)
        self.assertIn("stock", product)
        self.assertIn("created_at", product)

    def test_add_product_invalid_name(self):
        # Arrange
        name = ""
        category = "ELECTRONICS"
        price = 10.99
        stock = 10

        # Act and Assert
        with self.assertRaises(ValueError):
            self.product_service.add_product(name, category, price, stock)

    def test_add_product_invalid_category(self):
        # Arrange
        name = "Test Product"
        category = "INVALID CATEGORY"
        price = 10.99
        stock = 10

        # Act and Assert
        with self.assertRaises(ValueError):
            self.product_service.add_product(name, category, price, stock)

    def test_add_product_invalid_price(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 0
        stock = 10

        # Act and Assert
        with self.assertRaises(ValueError):
            self.product_service.add_product(name, category, price, stock)

    def test_add_product_invalid_stock(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 10.99
        stock = -10

        # Act and Assert
        with self.assertRaises(ValueError):
            self.product_service.add_product(name, category, price, stock)

    def test_update_stock_valid(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 10.99
        stock = 10
        product = self.product_service.add_product(name, category, price, stock)
        product_id = product["id"]
        quantity = 5

        # Act
        result = self.product_service.update_stock(product_id, quantity)

        # Assert
        self.assertTrue(result)
        self.assertEqual(self.product_service.products[product_id]["stock"], stock + quantity)

    def test_update_stock_invalid_product_id(self):
        # Arrange
        product_id = str(uuid.uuid4())[:8]
        quantity = 5

        # Act
        result = self.product_service.update_stock(product_id, quantity)

        # Assert
        self.assertFalse(result)

    def test_update_stock_invalid_quantity(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 10.99
        stock = 10
        product = self.product_service.add_product(name, category, price, stock)
        product_id = product["id"]
        quantity = -15

        # Act
        result = self.product_service.update_stock(product_id, quantity)

        # Assert
        self.assertFalse(result)

    def test_calculate_bulk_price_valid(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 10.99
        stock = 10
        product = self.product_service.add_product(name, category, price, stock)
        product_id = product["id"]
        quantity = 100

        # Act
        result = self.product_service.calculate_bulk_price(product_id, quantity)

        # Assert
        self.assertGreater(result, 0)

    def test_calculate_bulk_price_invalid_product_id(self):
        # Arrange
        product_id = str(uuid.uuid4())[:8]
        quantity = 100

        # Act
        result = self.product_service.calculate_bulk_price(product_id, quantity)

        # Assert
        self.assertEqual(result, -1)

    def test_find_products_by_category_valid(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 10.99
        stock = 10
        self.product_service.add_product(name, category, price, stock)

        # Act
        result = self.product_service.find_products_by_category(category)

        # Assert
        self.assertGreater(len(result), 0)

    def test_get_inventory_worth_valid(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 10.99
        stock = 10
        self.product_service.add_product(name, category, price, stock)

        # Act
        result = self.product_service.get_inventory_worth()

        # Assert
        self.assertGreater(result, 0)

    def test_apply_seasonal_discount_valid(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 10.99
        stock = 10
        self.product_service.add_product(name, category, price, stock)

        # Act
        result = self.product_service.apply_seasonal_discount(category, 10)

        # Assert
        self.assertGreater(result, 0)

    def test_apply_seasonal_discount_invalid_percentage(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 10.99
        stock = 10
        self.product_service.add_product(name, category, price, stock)

        # Act and Assert
        self.assertFalse(self.product_service.apply_seasonal_discount(category, -10))

if __name__ == '__main__':
    unittest.main()