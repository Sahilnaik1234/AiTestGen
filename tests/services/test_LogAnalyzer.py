import unittest
from LogAnalyzer import LogAnalyzer

class TestLogAnalyzer(unittest.TestCase):

    def test_init(self):
        analyzer = LogAnalyzer()
        self.assertEqual(analyzer.logs, [])

    def test_add_log_valid(self):
        analyzer = LogAnalyzer()
        log = {"level": "INFO", "message": "System started", "timestamp": 1}
        analyzer.add_log(log)
        self.assertEqual(analyzer.logs, [log])

    def test_add_log_invalid_type(self):
        analyzer = LogAnalyzer()
        log = "Invalid log"
        with self.assertRaises(TypeError):
            analyzer.add_log(log)

    def test_add_log_missing_field(self):
        analyzer = LogAnalyzer()
        log = {"level": "INFO", "message": "System started"}
        with self.assertRaises(KeyError):
            analyzer.add_log(log)

    def test_add_log_invalid_level(self):
        analyzer = LogAnalyzer()
        log = {"level": "INVALID", "message": "System started", "timestamp": 1}
        with self.assertRaises(ValueError):
            analyzer.add_log(log)

    def test_add_log_invalid_timestamp(self):
        analyzer = LogAnalyzer()
        log = {"level": "INFO", "message": "System started", "timestamp": -1}
        with self.assertRaises(ValueError):
            analyzer.add_log(log)

    def test_add_log_invalid_timestamp_type(self):
        analyzer = LogAnalyzer()
        log = {"level": "INFO", "message": "System started", "timestamp": "1"}
        with self.assertRaises(ValueError):
            analyzer.add_log(log)

    def test_count_by_level(self):
        analyzer = LogAnalyzer()
        analyzer.add_log({"level": "INFO", "message": "System started", "timestamp": 1})
        analyzer.add_log({"level": "ERROR", "message": "Failure occurred", "timestamp": 2})
        analyzer.add_log({"level": "WARNING", "message": "Low memory", "timestamp": 3})
        self.assertEqual(analyzer.count_by_level(), {"INFO": 1, "WARNING": 1, "ERROR": 1})

    def test_filter_logs(self):
        analyzer = LogAnalyzer()
        analyzer.add_log({"level": "INFO", "message": "System started", "timestamp": 1})
        analyzer.add_log({"level": "ERROR", "message": "Failure occurred", "timestamp": 2})
        analyzer.add_log({"level": "WARNING", "message": "Low memory", "timestamp": 3})
        self.assertEqual(analyzer.filter_logs("ERROR"), [{"level": "ERROR", "message": "Failure occurred", "timestamp": 2}])

    def test_filter_logs_invalid_level(self):
        analyzer = LogAnalyzer()
        with self.assertRaises(ValueError):
            analyzer.filter_logs("INVALID")

    def test_get_latest_log(self):
        analyzer = LogAnalyzer()
        analyzer.add_log({"level": "INFO", "message": "System started", "timestamp": 1})
        analyzer.add_log({"level": "ERROR", "message": "Failure occurred", "timestamp": 2})
        analyzer.add_log({"level": "WARNING", "message": "Low memory", "timestamp": 3})
        self.assertEqual(analyzer.get_latest_log(), {"level": "WARNING", "message": "Low memory", "timestamp": 3})

    def test_get_latest_log_empty(self):
        analyzer = LogAnalyzer()
        self.assertIsNone(analyzer.get_latest_log())

    def test_search_keyword(self):
        analyzer = LogAnalyzer()
        analyzer.add_log({"level": "INFO", "message": "System started", "timestamp": 1})
        analyzer.add_log({"level": "ERROR", "message": "Failure occurred", "timestamp": 2})
        analyzer.add_log({"level": "WARNING", "message": "Low memory", "timestamp": 3})
        self.assertEqual(analyzer.search_keyword("system"), [{"level": "INFO", "message": "System started", "timestamp": 1}])

    def test_search_keyword_empty(self):
        analyzer = LogAnalyzer()
        self.assertEqual(analyzer.search_keyword("system"), [])

    def test_search_keyword_invalid(self):
        analyzer = LogAnalyzer()
        with self.assertRaises(ValueError):
            analyzer.search_keyword("")

if __name__ == "__main__":
    unittest.main()