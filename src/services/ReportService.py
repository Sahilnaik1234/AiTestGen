import datetime
from typing import List, Dict

class ReportService:
    def __init__(self):
        self.data_store = []

    def add_entry(self, amount: float, category: str, date: str = None):
        """Add a financial entry to the report data."""
        if amount == 0:
            raise ValueError("Amount cannot be zero")
        
        entry_date = datetime.datetime.strptime(date, "%Y-%m-%d") if date else datetime.datetime.now()
        
        entry = {
            "amount": amount,
            "category": category,
            "date": entry_date
        }
        self.data_store.append(entry)
        return True

    def generate_summary(self, category: str = None) -> Dict:
        """Generate a summary of totals by category."""
        if not self.data_store:
            return {"total": 0.0, "count": 0}

        filtered_data = self.data_store
        if category:
            filtered_data = [e for e in self.data_store if e["category"] == category]

        total = sum(e["amount"] for e in filtered_data)
        return {
            "total": round(total, 2),
            "count": len(filtered_data),
            "average": round(total / len(filtered_data), 2) if filtered_data else 0.0
        }

    def reset(self):
        self.data_store = []
