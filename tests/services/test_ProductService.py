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
        self.assertEqual(product["name"], name)
        self.assertEqual(product["category"], category.upper())
        self.assertEqual(product["price"], price)
        self.assertEqual(product["stock"], stock)

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
        quantity = 5

        # Act
        result = self.product_service.update_stock(product["id"], quantity)

        # Assert
        self.assertTrue(result)
        self.assertEqual(self.product_service.products[product["id"]]["stock"], stock + quantity)

    def test_update_stock_invalid_product_id(self):
        # Arrange
        quantity = 5

        # Act
        result = self.product_service.update_stock("INVALID PRODUCT ID", quantity)

        # Assert
        self.assertFalse(result)

    def test_update_stock_invalid_quantity(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 10.99
        stock = 10
        product = self.product_service.add_product(name, category, price, stock)
        quantity = -20

        # Act
        result = self.product_service.update_stock(product["id"], quantity)

        # Assert
        self.assertFalse(result)

    def test_calculate_bulk_price_valid(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 10.99
        stock = 10
        product = self.product_service.add_product(name, category, price, stock)
        quantity = 100

        # Act
        bulk_price = self.product_service.calculate_bulk_price(product["id"], quantity)

        # Assert
        self.assertGreater(bulk_price, 0)

    def test_calculate_bulk_price_invalid_product_id(self):
        # Arrange
        quantity = 100

        # Act
        bulk_price = self.product_service.calculate_bulk_price("INVALID PRODUCT ID", quantity)

        # Assert
        self.assertEqual(bulk_price, -1)

    def test_find_products_by_category_valid(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 10.99
        stock = 10
        self.product_service.add_product(name, category, price, stock)

        # Act
        products = self.product_service.find_products_by_category(category)

        # Assert
        self.assertGreater(len(products), 0)

    def test_get_inventory_worth_valid(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 10.99
        stock = 10
        self.product_service.add_product(name, category, price, stock)

        # Act
        inventory_worth = self.product_service.get_inventory_worth()

        # Assert
        self.assertGreater(inventory_worth, 0)

    def test_apply_seasonal_discount_valid(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 10.99
        stock = 10
        self.product_service.add_product(name, category, price, stock)
        percentage = 10

        # Act
        affected_count = self.product_service.apply_seasonal_discount(category, percentage)

        # Assert
        self.assertGreater(affected_count, 0)

    def test_apply_seasonal_discount_invalid_percentage(self):
        # Arrange
        name = "Test Product"
        category = "ELECTRONICS"
        price = 10.99
        stock = 10
        self.product_service.add_product(name, category, price, stock)
        percentage = -10

        # Act
        result = self.product_service.apply_seasonal_discount(category, percentage)

        # Assert
        self.assertFalse(result)

if __name__ == '__main__':
    unittest.main()