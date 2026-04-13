import unittest
from src.services.payment_service import PaymentService

class TestPaymentService(unittest.TestCase):
    def test_trigger_coverage(self):
        # Placeholder to trigger pytest-cov reporting
        service = PaymentService()
        self.assertIsNotNone(service)

if __name__ == '__main__':
    unittest.main()
