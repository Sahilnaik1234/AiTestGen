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
            json.dump({"item1": {"name": "Item 1", "quantity": 10, "price": 10.99, "last_updated": "2022-01-01"}}, f)
        self.manager.load_data()
        self.assertEqual(self.manager.items, {"item1": {"name": "Item 1", "quantity": 10, "price": 10.99, "last_updated": "2022-01-01"}})

    def test_save_data(self):
        self.manager.items = {"item1": {"name": "Item 1", "quantity": 10, "price": 10.99, "last_updated": "2022-01-01"}}
        self.manager.save_data()
        with open("test_inventory.json", 'r') as f:
            data = json.load(f)
        self.assertEqual(data, {"item1": {"name": "Item 1", "quantity": 10, "price": 10.99, "last_updated": "2022-01-01"}})

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

    def test_add_item_invalid_price(self):
        result, message = self.manager.add_item("item1", "Item 1", 10, -10.99)
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

    def test_update_quantity_item_not_found(self):
        result, message = self.manager.update_quantity("item1", 5)
        self.assertFalse(result)
        self.assertEqual(message, "Item not found")

    def test_get_item(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        item = self.manager.get_item("item1")
        self.assertEqual(item, {"name": "Item 1", "quantity": 10, "price": 10.99, "last_updated": str(datetime.datetime.now())})

    def test_get_item_not_found(self):
        item = self.manager.get_item("item1")
        self.assertIsNone(item)

    def test_remove_item(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        result = self.manager.remove_item("item1")
        self.assertTrue(result)
        self.assertEqual(self.manager.items, {})

    def test_remove_item_not_found(self):
        result = self.manager.remove_item("item1")
        self.assertFalse(result)

    def test_calculate_total_value(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        self.manager.add_item("item2", "Item 2", 20, 5.99)
        total_value = self.manager.calculate_total_value()
        self.assertAlmostEqual(total_value, 10 * 10.99 + 20 * 5.99)

    def test_find_items_below_threshold(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        self.manager.add_item("item2", "Item 2", 5, 5.99)
        results = self.manager.find_items_below_threshold(8)
        self.assertEqual(results, [{"id": "item2", "name": "Item 2"}])

    def test_bulk_update_prices(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        self.manager.add_item("item2", "Item 2", 20, 5.99)
        self.manager.bulk_update_prices(10)
        self.assertAlmostEqual(self.manager.items["item1"]["price"], 10.99 * 1.1)
        self.assertAlmostEqual(self.manager.items["item2"]["price"], 5.99 * 1.1)

    def test_generate_report(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        self.manager.add_item("item2", "Item 2", 20, 5.99)
        report = self.manager.generate_report()
        self.assertIn("Inventory Report", report)
        self.assertIn("ID: item1 | Name: Item 1 | Qty: 10 | Price: $10.99", report)
        self.assertIn("ID: item2 | Name: Item 2 | Qty: 20 | Price: $5.99", report)
        self.assertIn("Total Value: $", report)

    def test_update_item_name(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        result = self.manager.update_item_name("item1", "New Item 1")
        self.assertTrue(result)
        self.assertEqual(self.manager.items["item1"]["name"], "New Item 1")

    def test_update_item_name_item_not_found(self):
        result = self.manager.update_item_name("item1", "New Item 1")
        self.assertFalse(result)

    def test_list_all_item_ids(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        self.manager.add_item("item2", "Item 2", 20, 5.99)
        item_ids = self.manager.list_all_item_ids()
        self.assertEqual(item_ids, ["item1", "item2"])

    def test_clear_inventory(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        self.manager.add_item("item2", "Item 2", 20, 5.99)
        self.manager.clear_inventory()
        self.assertEqual(self.manager.items, {})

    def test_get_inventory_size(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        self.manager.add_item("item2", "Item 2", 20, 5.99)
        size = self.manager.get_inventory_size()
        self.assertEqual(size, 2)

    def test_is_item_available(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        available = self.manager.is_item_available("item1", 5)
        self.assertTrue(available)

    def test_is_item_available_not_available(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        available = self.manager.is_item_available("item1", 15)
        self.assertFalse(available)

    def test_is_item_available_item_not_found(self):
        available = self.manager.is_item_available("item1", 5)
        self.assertFalse(available)

    def test_search_by_name(self):
        self.manager.add_item("item1", "Item 1", 10, 10.99)
        self.manager.add_item("item2", "Item 2", 20, 5.99)
        results = self.manager.search_by_name("Item")
        self.assertEqual(results, [{"id": "item1", "name": "Item 1"}, {"id": "item2", "name": "Item 2"}])

if __name__ == '__main__':
    unittest.main()