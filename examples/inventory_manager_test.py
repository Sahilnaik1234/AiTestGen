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

    def test_init(self):
        self.assertEqual(self.manager.data_file, "test_inventory.json")
        self.assertEqual(self.manager.items, {})

    def test_load_data(self):
        with open("test_inventory.json", 'w') as f:
            json.dump({"item1": {"name": "Item 1", "quantity": 10, "price": 10.99}}, f)
        self.manager.load_data()
        self.assertEqual(self.manager.items, {"item1": {"name": "Item 1", "quantity": 10, "price": 10.99}})

    def test_save_data(self):
        self.manager.items = {"item1": {"name": "Item 1", "quantity": 10, "price": 10.99}}
        self.manager.save_data()
        with open("test_inventory.json", 'r') as f:
            self.assertEqual(json.load(f), {"item1": {"name": "Item 1", "quantity": 10, "price": 10.99}})

    def test_add_item(self):
        result, message = self.manager.add_item("item1", "Item 1", 10, 10.99)
        self.assertTrue(result)
        self.assertEqual(message, "Item added successfully")
        self.assertEqual(self.manager.items, {"item1": {"name": "Item 1", "quantity": 10, "price": 10.99, "last_updated": str(datetime.datetime.now())}})

    def test_add_item_duplicate(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        result, message = self.manager.add_item("item1", "Item 1", 10, 10.99)
        self.assertFalse(result)
        self.assertEqual(message, "Item already exists")

    def test_add_item_invalid_quantity(self):
        result, message = self.manager.add_item("item1", "Item 1", -10, 10.99)
        self.assertFalse(result)
        self.assertEqual(message, "Quantity and price must be non-negative")

    def test_update_quantity(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        result, message = self.manager.update_quantity("item1", 5)
        self.assertTrue(result)
        self.assertEqual(message, "Quantity updated")
        self.assertEqual(self.manager.items["item1"]["quantity"], 15)

    def test_update_quantity_insufficient_stock(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        result, message = self.manager.update_quantity("item1", -15)
        self.assertFalse(result)
        self.assertEqual(message, "Insufficient stock")


    def test_search_by_name(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        self.manager.add_item("item2", "Item 2", 20, 5.99)
        results = self.manager.search_by_name("Item")
        self.assertEqual(results, [{"id": "item1", "name": "Item 1"}, {"id": "item2", "name": "Item 2"}])

if __name__ == '__main__':
    unittest.main()