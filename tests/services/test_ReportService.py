import unittest
from ReportService import ReportService
import datetime

class TestReportService(unittest.TestCase):

    def test_init(self):
        report_service = ReportService()
        self.assertEqual(report_service.data_store, [])

    def test_add_entry_valid(self):
        report_service = ReportService()
        result = report_service.add_entry(100.0, "Test Category")
        self.assertTrue(result)
        self.assertEqual(len(report_service.data_store), 1)

    def test_add_entry_zero_amount(self):
        report_service = ReportService()
        with self.assertRaises(ValueError):
            report_service.add_entry(0.0, "Test Category")

    def test_add_entry_negative_amount(self):
        report_service = ReportService()
        result = report_service.add_entry(-100.0, "Test Category")
        self.assertTrue(result)
        self.assertEqual(len(report_service.data_store), 1)

    def test_add_entry_with_date(self):
        report_service = ReportService()
        result = report_service.add_entry(100.0, "Test Category", "2022-01-01")
        self.assertTrue(result)
        self.assertEqual(len(report_service.data_store), 1)
        self.assertEqual(report_service.data_store[0]["date"].strftime("%Y-%m-%d"), "2022-01-01")

    def test_generate_summary_empty_data_store(self):
        report_service = ReportService()
        summary = report_service.generate_summary()
        self.assertEqual(summary, {"total": 0.0, "count": 0, "average": 0.0})

    def test_generate_summary_single_category(self):
        report_service = ReportService()
        report_service.add_entry(100.0, "Test Category")
        summary = report_service.generate_summary("Test Category")
        self.assertEqual(summary, {"total": 100.0, "count": 1, "average": 100.0})

    def test_generate_summary_multiple_categories(self):
        report_service = ReportService()
        report_service.add_entry(100.0, "Test Category 1")
        report_service.add_entry(200.0, "Test Category 2")
        summary = report_service.generate_summary("Test Category 1")
        self.assertEqual(summary, {"total": 100.0, "count": 1, "average": 100.0})

    def test_generate_summary_no_category(self):
        report_service = ReportService()
        report_service.add_entry(100.0, "Test Category 1")
        report_service.add_entry(200.0, "Test Category 2")
        summary = report_service.generate_summary()
        self.assertEqual(summary, {"total": 300.0, "count": 2, "average": 150.0})

    def test_reset(self):
        report_service = ReportService()
        report_service.add_entry(100.0, "Test Category")
        report_service.reset()
        self.assertEqual(report_service.data_store, [])

if __name__ == '__main__':
    unittest.main()