
class TaskScheduler:
    def __init__(self):
        self.tasks = []  # list of dicts
#dev
    def add_task(self, task):
        """
        task: {"title": str, "priority": int, "duration": int}
        """
        if not isinstance(task, dict):
            raise TypeError("Task must be a dictionary")

        required_fields = ["title", "priority", "duration"]
        for field in required_fields:
            if field not in task:
                raise KeyError(f"Missing field: {field}")

        if not task["title"]:
            raise ValueError("Title cannot be empty")

        if not isinstance(task["priority"], int) or not (1 <= task["priority"] <= 5):
            raise ValueError("Priority must be between 1 and 5")

        if not isinstance(task["duration"], int) or task["duration"] <= 0:
            raise ValueError("Duration must be positive")

        self.tasks.append(task)

    def get_schedule(self):
        """
        Returns tasks sorted by priority (higher first)
        """
        return sorted(self.tasks, key=lambda x: -x["priority"])

    def get_total_duration(self):
        total = sum(task["duration"] for task in self.tasks)
        return total

    def find_task(self, title):
        for task in self.tasks:
            if task["title"] == title:
                return task
        return None

    def remove_task(self, title):
        for i, task in enumerate(self.tasks):
            if task["title"] == title:
                del self.tasks[i]
                return True
        return False


def main():
    scheduler = TaskScheduler()

    scheduler.add_task({"title": "Code Review", "priority": 5, "duration": 2})
    scheduler.add_task({"title": "Write Tests", "priority": 4, "duration": 3})
    scheduler.add_task({"title": "Fix Bugs", "priority": 5, "duration": 4})

    print("Schedule:", scheduler.get_schedule())
    print("Total Duration:", scheduler.get_total_duration())

    print("Find Task:", scheduler.find_task("Write Tests"))

    scheduler.remove_task("Code Review")
    print("Updated Schedule:", scheduler.get_schedule())


if __name__ == "__main__":
    main()
