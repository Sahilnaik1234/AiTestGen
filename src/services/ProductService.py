import uuid
from datetime import datetime

class ProductService:
    """
    ProductService managed product lifecycle and inventory logic.
    Used for testing automated AI test generation for Python.
    """
    def __init__(self):
        self.products = {}
        # Simple categories for validation
        self.categories = ["ELECTRONICS", "BOOKS", "CLOTHING", "HOME", "BEAUTY"]

    def add_product(self, name, category, price, stock):
        if not name or len(name) < 2:
            raise ValueError("Invalid product name")
            
        category = category.upper()
        if category not in self.categories:
            raise ValueError(f"Category {category} not supported")
            
        if price <= 0:
            raise ValueError("Price must be greater than zero")
            
        if stock < 0:
            raise ValueError("Stock cannot be negative")

        product_id = str(uuid.uuid4())[:8]
        product = {
            "id": product_id,
            "name": name,
            "category": category,
            "price": float(price),
            "stock": int(stock),
            "created_at": datetime.now().isoformat()
        }
        
        self.products[product_id] = product
        return product

    def update_stock(self, product_id, quantity):
        if product_id not in self.products:
            return False
            
        new_stock = self.products[product_id]["stock"] + quantity
        if new_stock < 0:
            return False
            
        self.products[product_id]["stock"] = new_stock
        return True

    def calculate_bulk_price(self, product_id, quantity):
        if product_id not in self.products:
            return -1
            
        price = self.products[product_id]["price"]
        # Apply volume discounts
        if quantity >= 100:
            discount = 0.20 # 20% off
        elif quantity >= 50:
            discount = 0.10 # 10% off
        elif quantity >= 10:
            discount = 0.05 # 5% off
        else:
            discount = 0
            
        return (price * quantity) * (1 - discount)

    def find_products_by_category(self, category):
        category = category.upper()
        return [p for p in self.products.values() if p["category"] == category]

    def get_inventory_worth(self):
        return sum(p["price"] * p["stock"] for p in self.products.values())

    def apply_seasonal_discount(self, category, percentage):
        if percentage < 0 or percentage > 100:
            return False
            
        category = category.upper()
        affected_count = 0
        for p in self.products.values():
            if p["category"] == category:
                p["price"] *= (1 - (percentage / 100))
                affected_count += 1
        return affected_count
