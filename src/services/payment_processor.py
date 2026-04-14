from datetime import datetime, timedelta
import uuid

class PaymentProcessor:
    def __init__(self):
        self.transaction_log = []
        self.tax_rates = {
            "NY": 0.08875,
            "CA": 0.0725,
            "TX": 0.0625,
            "FL": 0.0600
        }

    def process_payment(self, amount: float, card_number: str) -> dict:
        """Process a payment and return the transaction details."""
        if amount <= 0:
            raise ValueError("Payment amount must be strictly positive")
        
        # Simple mock validation: Visa (4), Mastercard (5), Amex (3)
        if not (card_number.startswith("4") or card_number.startswith("5") or card_number.startswith("3")):
            return {"status": "FAILED", "reason": "Unsupported card type"}
            
        # Visa/MC are 16 digits, Amex is 15
        if card_number.startswith("3") and len(card_number) != 15:
            return {"status": "FAILED", "reason": "Invalid Amex length"}
        elif not card_number.startswith("3") and len(card_number) != 16:
            return {"status": "FAILED", "reason": "Invalid Visa/MC length"}
            
        transaction_id = str(uuid.uuid4())
        record = {
            "transaction_id": transaction_id,
            "amount": amount,
            "status": "SUCCESS",
            "timestamp": datetime.now()
        }
        self.transaction_log.append(record)
        return record

    def calculate_total_with_tax(self, base_amount: float, region_code: str) -> float:
        """Calculate the final amount including regional tax."""
        if base_amount <= 0:
            return 0.0
            
        rate = self.tax_rates.get(region_code.upper(), 0.0)
        tax = base_amount * rate
        return round(base_amount + tax, 2)

    def refund_payment(self, transaction_id: str) -> bool:
        """Refund an existing successful payment if within 30 days."""
        for record in self.transaction_log:
            if record["transaction_id"] == transaction_id and record["status"] == "SUCCESS":
                
                # Check if refund window has expired
                if datetime.now() - record["timestamp"] > timedelta(days=30):
                    return False
                    
                record["status"] = "REFUNDED"
                return True
                
        return False

    def get_total_revenue(self) -> float:
        """Calculate total successful revenue."""
        return sum(
            record["amount"] 
            for record in self.transaction_log 
            if record["status"] == "SUCCESS"
        )
