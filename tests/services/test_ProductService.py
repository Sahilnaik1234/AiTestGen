import unittest
from ProductService import ProductService
import uuid
from datetime import datetime

class TestProductService(unittest.TestCase):

    def setUp(self):
        self.product_service = ProductService()


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