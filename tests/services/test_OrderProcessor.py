import unittest
from OrderProcessor import OrderProcessor

class TestOrderProcessor(unittest.TestCase):

    def test_init(self):
        processor = OrderProcessor()
        self.assertEqual(processor.tax_rate, 0.1)
        self.assertEqual(processor.discount_threshold, 1000)

        processor = OrderProcessor(tax_rate=0.2, discount_threshold=2000)
        self.assertEqual(processor.tax_rate, 0.2)
        self.assertEqual(processor.discount_threshold, 2000)

    def test_calculate_total_empty_list(self):
        processor = OrderProcessor()
        with self.assertRaises(ValueError):
            processor.calculate_total([])

    def test_calculate_total_invalid_item(self):
        processor = OrderProcessor()
        with self.assertRaises(KeyError):
            processor.calculate_total([{"name": "Item"}])

    def test_calculate_total_invalid_price(self):
        processor = OrderProcessor()
        with self.assertRaises(ValueError):
            processor.calculate_total([{"name": "Item", "price": -1, "qty": 1}])

    def test_calculate_total_invalid_quantity(self):
        processor = OrderProcessor()
        with self.assertRaises(ValueError):
            processor.calculate_total([{"name": "Item", "price": 1, "qty": 0}])

    def test_calculate_total(self):
        processor = OrderProcessor()
        items = [{"name": "Item", "price": 10, "qty": 2}]
        self.assertEqual(processor.calculate_total(items), 20.0)

    def test_apply_discount(self):
        processor = OrderProcessor()
        self.assertEqual(processor.apply_discount(100), 0)
        self.assertEqual(processor.apply_discount(600), 30.0)
        self.assertEqual(processor.apply_discount(1500), 150.0)

    def test_calculate_tax(self):
        processor = OrderProcessor()
        self.assertEqual(processor.calculate_tax(100), 10.0)
        with self.assertRaises(ValueError):
            processor.calculate_tax(-100)

    def test_generate_invoice(self):
        processor = OrderProcessor()
        items = [{"name": "Item", "price": 10, "qty": 2}]
        invoice = processor.generate_invoice(items)
        self.assertEqual(invoice["item_count"], 2)
        self.assertEqual(invoice["total_amount"], 20.0)
        self.assertEqual(invoice["status"], "PAID")

    def test_generate_invoice_zero_total(self):
        processor = OrderProcessor()
        items = [{"name": "Item", "price": 0, "qty": 2}]
        invoice = processor.generate_invoice(items)
        self.assertEqual(invoice["item_count"], 2)
        self.assertEqual(invoice["total_amount"], 0.0)
        self.assertEqual(invoice["status"], "FREE")

if __name__ == "__main__":
    unittest.main()