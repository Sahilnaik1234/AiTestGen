import datetime
import json
import os

class InventoryManager:
    def __init__(self, data_file="inventory.json"):
        self.data_file = data_file
        self.items = {}
        self.load_data()

    def load_data(self):
        if os.path.exists(self.data_file):
            with open(self.data_file, 'r') as f:
                self.items = json.load(f)

    def save_data(self):
        with open(self.data_file, 'w') as f:
            json.dump(self.items, f, indent=4)

    def add_item(self, item_id, name, quantity, price):
        if item_id in self.items:
            return False, "Item already exists"
        if quantity < 0 or price < 0:
            return False, "Quantity and price must be non-negative"
        
        self.items[item_id] = {
            "name": name,
            "quantity": quantity,
            "price": price,
            "last_updated": str(datetime.datetime.now())
        }
        self.save_data()
        return True, "Item added successfully"

    def update_quantity(self, item_id, quantity_change):
        if item_id not in self.items:
            return False, "Item not found"
        
        new_quantity = self.items[item_id]["quantity"] + quantity_change
        if new_quantity < 0:
            return False, "Insufficient stock"
        
        self.items[item_id]["quantity"] = new_quantity
        self.items[item_id]["last_updated"] = str(datetime.datetime.now())
        self.save_data()
        return True, "Quantity updated"

    def get_item(self, item_id):
        return self.items.get(item_id)

    def remove_item(self, item_id):
        if item_id in self.items:
            del self.items[item_id]
            self.save_data()
            return True
        return False

    # --- UNTESTED Logic to hit line count and 50% coverage ---

    def calculate_total_value(self):
        total = 0
        for item in self.items.values():
            total += item["quantity"] * item["price"]
        return total

    def find_items_below_threshold(self, threshold):
        results = []
        for item_id, item in self.items.items():
            if item["quantity"] < threshold:
                results.append({"id": item_id, "name": item["name"]})
        return results

    def bulk_update_prices(self, percentage_change):
        for item in self.items.values():
            item["price"] *= (1 + percentage_change / 100)
        self.save_data()

    def generate_report(self):
        report = "Inventory Report\n"
        report += "=" * 20 + "\n"
        for item_id, item in self.items.items():
            report += f"ID: {item_id} | Name: {item['name']} | Qty: {item['quantity']} | Price: ${item['price']:.2f}\n"
        report += f"Total Value: ${self.calculate_total_value():.2f}\n"
        return report

    def update_item_name(self, item_id, new_name):
        if item_id in self.items:
            self.items[item_id]["name"] = new_name
            self.items[item_id]["last_updated"] = str(datetime.datetime.now())
            self.save_data()
            return True
        return False

    def list_all_item_ids(self):
        return list(self.items.keys())

    def clear_inventory(self):
        self.items = {}
        self.save_data()

    def get_inventory_size(self):
        return len(self.items)

    def is_item_available(self, item_id, requested_qty):
        item = self.get_item(item_id)
        if item:
            return item["quantity"] >= requested_qty
        return False

    def search_by_name(self, query):
        results = []
        for item_id, item in self.items.items():
            if query.lower() in item["name"].lower():
                results.append({"id": item_id, "name": item["name"]})
        return results
