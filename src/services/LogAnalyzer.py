
class LogAnalyzer:
    def __init__(self):
        self.logs = []  # list of dicts

    def add_log(self, log):
        """
        log: {"level": str, "message": str, "timestamp": int}
        """
        if not isinstance(log, dict):
            raise TypeError("Log must be a dictionary")

        required_fields = ["level", "message", "timestamp"]
        for field in required_fields:
            if field not in log:
                raise KeyError(f"Missing field: {field}")

        if log["level"] not in ["INFO", "WARNING", "ERROR"]:
            raise ValueError("Invalid log level")

        if not isinstance(log["timestamp"], int) or log["timestamp"] < 0:
            raise ValueError("Invalid timestamp")

        self.logs.append(log)

    def count_by_level(self):
        result = {"INFO": 0, "WARNING": 0, "ERROR": 0}
        for log in self.logs:
            result[log["level"]] += 1
        return result

    def filter_logs(self, level):
        if level not in ["INFO", "WARNING", "ERROR"]:
            raise ValueError("Invalid level")

        return [log for log in self.logs if log["level"] == level]

    def get_latest_log(self):
        if not self.logs:
            return None
        return max(self.logs, key=lambda x: x["timestamp"])

    def search_keyword(self, keyword):
        if not keyword:
            raise ValueError("Keyword required")

        return [log for log in self.logs if keyword.lower() in log["message"].lower()]


def main():
    analyzer = LogAnalyzer()

    analyzer.add_log({"level": "INFO", "message": "System started", "timestamp": 1})
    analyzer.add_log({"level": "ERROR", "message": "Failure occurred", "timestamp": 2})
    analyzer.add_log({"level": "WARNING", "message": "Low memory", "timestamp": 3})

    print("Count:", analyzer.count_by_level())
    print("Errors:", analyzer.filter_logs("ERROR"))
    print("Latest:", analyzer.get_latest_log())
    print("Search 'system':", analyzer.search_keyword("system"))


if __name__ == "__main__":
    main()
