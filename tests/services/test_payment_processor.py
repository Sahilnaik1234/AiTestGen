import unittest
from payment_processor import PaymentProcessor
from datetime import datetime, timedelta
import uuid

class TestPaymentProcessor(unittest.TestCase):

    def test_init(self):
        processor = PaymentProcessor()
        self.assertEqual(processor.transaction_log, [])
        self.assertEqual(set(processor.tax_rates.keys()), {"NY", "CA", "TX", "FL"})

    def test_process_payment_valid(self):
        processor = PaymentProcessor()
        amount = 100.0
        card_number = "4111111111111111"
        result = processor.process_payment(amount, card_number)
        self.assertEqual(result["status"], "SUCCESS")
        self.assertEqual(result["amount"], amount)
        self.assertIsInstance(result["transaction_id"], str)
        self.assertIsInstance(result["timestamp"], datetime)

    def test_process_payment_invalid_amount(self):
        processor = PaymentProcessor()
        amount = 0.0
        card_number = "4111111111111111"
        with self.assertRaises(ValueError):
            processor.process_payment(amount, card_number)

    def test_process_payment_invalid_card_type(self):
        processor = PaymentProcessor()
        amount = 100.0
        card_number = "1234567890123456"
        result = processor.process_payment(amount, card_number)
        self.assertEqual(result["status"], "FAILED")
        self.assertEqual(result["reason"], "Unsupported card type")

    def test_process_payment_invalid_amex_length(self):
        processor = PaymentProcessor()
        amount = 100.0
        card_number = "371449635398431"
        result = processor.process_payment(amount, card_number)
        self.assertEqual(result["status"], "FAILED")
        self.assertEqual(result["reason"], "Invalid Amex length")

    def test_process_payment_invalid_visa_length(self):
        processor = PaymentProcessor()
        amount = 100.0
        card_number = "411111111111111"
        result = processor.process_payment(amount, card_number)
        self.assertEqual(result["status"], "FAILED")
        self.assertEqual(result["reason"], "Invalid Visa/MC length")

    def test_calculate_total_with_tax(self):
        processor = PaymentProcessor()
        base_amount = 100.0
        region_code = "NY"
        result = processor.calculate_total_with_tax(base_amount, region_code)
        self.assertAlmostEqual(result, 108.875)

    def test_calculate_total_with_tax_zero_amount(self):
        processor = PaymentProcessor()
        base_amount = 0.0
        region_code = "NY"
        result = processor.calculate_total_with_tax(base_amount, region_code)
        self.assertAlmostEqual(result, 0.0)

    def test_calculate_total_with_tax_unknown_region(self):
        processor = PaymentProcessor()
        base_amount = 100.0
        region_code = "Unknown"
        result = processor.calculate_total_with_tax(base_amount, region_code)
        self.assertAlmostEqual(result, 100.0)

    def test_refund_payment_valid(self):
        processor = PaymentProcessor()
        amount = 100.0
        card_number = "4111111111111111"
        result = processor.process_payment(amount, card_number)
        transaction_id = result["transaction_id"]
        self.assertTrue(processor.refund_payment(transaction_id))

    def test_refund_payment_invalid_transaction_id(self):
        processor = PaymentProcessor()
        self.assertFalse(processor.refund_payment("InvalidTransactionId"))

    def test_refund_payment_expired(self):
        processor = PaymentProcessor()
        amount = 100.0
        card_number = "4111111111111111"
        result = processor.process_payment(amount, card_number)
        transaction_id = result["transaction_id"]
        processor.transaction_log[0]["timestamp"] = datetime.now() - timedelta(days=31)
        self.assertFalse(processor.refund_payment(transaction_id))

    def test_get_total_revenue(self):
        processor = PaymentProcessor()
        amount = 100.0
        card_number = "4111111111111111"
        processor.process_payment(amount, card_number)
        self.assertAlmostEqual(processor.get_total_revenue(), 100.0)

    def test_get_total_revenue_refunded(self):
        processor = PaymentProcessor()
        amount = 100.0
        card_number = "4111111111111111"
        result = processor.process_payment(amount, card_number)
        transaction_id = result["transaction_id"]
        processor.refund_payment(transaction_id)
        self.assertAlmostEqual(processor.get_total_revenue(), 0.0)

if __name__ == "__main__":
    unittest.main()