import unittest
from inventory_manager import InventoryManager
import json
import os
import datetime

class TestInventoryManager(unittest.TestCase):

    def setUp(self):
        self.manager = InventoryManager("test_inventory.json")

    def tearDown(self):
        if os.path.exists("test_inventory.json"):
            os.remove("test_inventory.json")


    def test_search_by_name(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        self.manager.add_item("item2", "Item 2", 20, 5.99)
        results = self.manager.search_by_name("Item")
        self.assertEqual(results, [{"id": "item1", "name": "Item 1"}, {"id": "item2", "name": "Item 2"}])

if __name__ == '__main__':
    unittest.main()