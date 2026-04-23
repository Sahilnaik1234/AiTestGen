
class OrderProcessor:
    def __init__(self, tax_rate=0.1, discount_threshold=1000):
        self.tax_rate = tax_rate
        self.discount_threshold = discount_threshold

    def calculate_total(self, items):
        """
        items: list of dicts -> {"name": str, "price": float, "qty": int}
        """
        if not isinstance(items, list) or len(items) == 0:
            raise ValueError("Items must be a non-empty list")

        subtotal = 0

        for item in items:
            if "price" not in item or "qty" not in item:
                raise KeyError("Missing required fields")

            if item["price"] < 0 or item["qty"] <= 0:
                raise ValueError("Invalid price or quantity")

            subtotal += item["price"] * item["qty"]

        discount = self.apply_discount(subtotal)
        tax = self.calculate_tax(subtotal - discount)

        total = subtotal - discount + tax
        return round(total, 2)

    def apply_discount(self, amount):
        if amount > self.discount_threshold:
            return amount * 0.1
        elif amount > 500:
            return amount * 0.05
        return 0

    def calculate_tax(self, amount):
        if amount < 0:
            raise ValueError("Amount cannot be negative")
        return amount * self.tax_rate

    def generate_invoice(self, items):
        total = self.calculate_total(items)
        return {
            "item_count": sum(item["qty"] for item in items),
            "total_amount": total,
            "status": "PAID" if total > 0 else "FREE"
        }


def main():
    processor = OrderProcessor()

    sample_items = [
        {"name": "Laptop", "price": 700, "qty": 1},
        {"name": "Mouse", "price": 50, "qty": 2}
    ]

    invoice = processor.generate_invoice(sample_items)
    print("Invoice:", invoice)


if __name__ == "__main__":
    main()
