import unittest
from ReportService import ReportService
from datetime import datetime
import copy

class TestReportService(unittest.TestCase):

    def test_init(self):
        service = ReportService()
        self.assertEqual(service.data_store, [])

    def test_add_entry_valid(self):
        service = ReportService()
        result = service.add_entry(100.0, "Test Category")
        self.assertTrue(result)
        self.assertEqual(len(service.data_store), 1)
        self.assertEqual(service.data_store[0]["amount"], 100.0)
        self.assertEqual(service.data_store[0]["category"], "Test Category")
        self.assertIsInstance(service.data_store[0]["date"], datetime)

    def test_add_entry_with_date(self):
        service = ReportService()
        date = "2022-01-01"
        result = service.add_entry(100.0, "Test Category", date)
        self.assertTrue(result)
        self.assertEqual(len(service.data_store), 1)
        self.assertEqual(service.data_store[0]["amount"], 100.0)
        self.assertEqual(service.data_store[0]["category"], "Test Category")
        self.assertEqual(service.data_store[0]["date"].strftime("%Y-%m-%d"), date)

    def test_add_entry_zero_amount(self):
        service = ReportService()
        with self.assertRaises(ValueError):
            service.add_entry(0.0, "Test Category")

    def test_generate_summary_empty(self):
        service = ReportService()
        summary = service.generate_summary()
        self.assertEqual(summary, {"total": 0.0, "count": 0})

    def test_generate_summary_single_entry(self):
        service = ReportService()
        service.add_entry(100.0, "Test Category")
        summary = service.generate_summary()
        self.assertEqual(summary, {"total": 100.0, "count": 1, "average": 100.0})

    def test_generate_summary_multiple_entries(self):
        service = ReportService()
        service.add_entry(100.0, "Test Category")
        service.add_entry(200.0, "Test Category")
        summary = service.generate_summary()
        self.assertEqual(summary, {"total": 300.0, "count": 2, "average": 150.0})

    def test_generate_summary_by_category(self):
        service = ReportService()
        service.add_entry(100.0, "Test Category")
        service.add_entry(200.0, "Other Category")
        summary = service.generate_summary("Test Category")
        self.assertEqual(summary, {"total": 100.0, "count": 1, "average": 100.0})

    def test_generate_summary_by_category_no_match(self):
        service = ReportService()
        service.add_entry(100.0, "Test Category")
        summary = service.generate_summary("Other Category")
        self.assertEqual(summary, {"total": 0.0, "count": 0, "average": 0.0})

    def test_reset(self):
        service = ReportService()
        service.add_entry(100.0, "Test Category")
        service.reset()
        self.assertEqual(service.data_store, [])

if __name__ == '__main__':
    unittest.main()