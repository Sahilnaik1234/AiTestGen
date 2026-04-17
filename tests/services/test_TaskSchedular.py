import unittest
from TaskSchedular import TaskScheduler

class TestTaskScheduler(unittest.TestCase):

    def test_init(self):
        scheduler = TaskScheduler()
        self.assertEqual(scheduler.tasks, [])

    def test_add_task_valid(self):
        scheduler = TaskScheduler()
        task = {"title": "Test Task", "priority": 3, "duration": 2}
        scheduler.add_task(task)
        self.assertIn(task, scheduler.tasks)

    def test_add_task_invalid_type(self):
        scheduler = TaskScheduler()
        task = "Invalid task"
        with self.assertRaises(TypeError):
            scheduler.add_task(task)

    def test_add_task_missing_field(self):
        scheduler = TaskScheduler()
        task = {"title": "Test Task", "priority": 3}
        with self.assertRaises(KeyError):
            scheduler.add_task(task)

    def test_add_task_empty_title(self):
        scheduler = TaskScheduler()
        task = {"title": "", "priority": 3, "duration": 2}
        with self.assertRaises(ValueError):
            scheduler.add_task(task)

    def test_add_task_invalid_priority(self):
        scheduler = TaskScheduler()
        task = {"title": "Test Task", "priority": 6, "duration": 2}
        with self.assertRaises(ValueError):
            scheduler.add_task(task)

    def test_add_task_invalid_duration(self):
        scheduler = TaskScheduler()
        task = {"title": "Test Task", "priority": 3, "duration": 0}
        with self.assertRaises(ValueError):
            scheduler.add_task(task)

    def test_get_schedule(self):
        scheduler = TaskScheduler()
        task1 = {"title": "Task 1", "priority": 3, "duration": 2}
        task2 = {"title": "Task 2", "priority": 5, "duration": 1}
        scheduler.add_task(task1)
        scheduler.add_task(task2)
        schedule = scheduler.get_schedule()
        self.assertEqual(schedule[0]["title"], "Task 2")
        self.assertEqual(schedule[1]["title"], "Task 1")

    def test_get_total_duration(self):
        scheduler = TaskScheduler()
        task1 = {"title": "Task 1", "priority": 3, "duration": 2}
        task2 = {"title": "Task 2", "priority": 5, "duration": 1}
        scheduler.add_task(task1)
        scheduler.add_task(task2)
        total_duration = scheduler.get_total_duration()
        self.assertEqual(total_duration, 3)

    def test_find_task(self):
        scheduler = TaskScheduler()
        task = {"title": "Test Task", "priority": 3, "duration": 2}
        scheduler.add_task(task)
        found_task = scheduler.find_task("Test Task")
        self.assertEqual(found_task, task)

    def test_find_task_not_found(self):
        scheduler = TaskScheduler()
        task = {"title": "Test Task", "priority": 3, "duration": 2}
        scheduler.add_task(task)
        found_task = scheduler.find_task("Non-existent Task")
        self.assertIsNone(found_task)

    def test_remove_task(self):
        scheduler = TaskScheduler()
        task = {"title": "Test Task", "priority": 3, "duration": 2}
        scheduler.add_task(task)
        scheduler.remove_task("Test Task")
        self.assertNotIn(task, scheduler.tasks)

    def test_remove_task_not_found(self):
        scheduler = TaskScheduler()
        task = {"title": "Test Task", "priority": 3, "duration": 2}
        scheduler.add_task(task)
        scheduler.remove_task("Non-existent Task")
        self.assertIn(task, scheduler.tasks)

if __name__ == "__main__":
    unittest.main()