import pytest
import os
from inventory_manager import InventoryManager

@pytest.fixture
def manager(tmp_path):
    # Use a temporary file for testing
    data_file = tmp_path / "test_inventory.json"
    return InventoryManager(data_file=str(data_file))

def test_add_item_success(manager):
    success, message = manager.add_item("001", "Laptop", 10, 1500)
    assert success is True
    assert "001" in manager.items
    assert manager.items["001"]["name"] == "Laptop"

def test_add_item_duplicate(manager):
    manager.add_item("001", "Laptop", 10, 1500)
    success, message = manager.add_item("001", "PC", 5, 1200)
    assert success is False
    assert message == "Item already exists"

def test_update_quantity_success(manager):
    manager.add_item("001", "Laptop", 10, 1500)
    success, message = manager.update_quantity("001", 5)
    assert success is True
    assert manager.items["001"]["quantity"] == 15

def test_update_quantity_insufficient(manager):
    manager.add_item("001", "Laptop", 10, 1500)
    success, message = manager.update_quantity("001", -15)
    assert success is False
    assert message == "Insufficient stock"

def test_get_item(manager):
    manager.add_item("001", "Laptop", 10, 1500)
    item = manager.get_item("001")
    assert item["name"] == "Laptop"
    assert manager.get_item("nonexistent") is None

def test_remove_item(manager):
    manager.add_item("001", "Laptop", 10, 1500)
    assert manager.remove_item("001") is True
    assert "001" not in manager.items
    assert manager.remove_item("nonexistent") is False
