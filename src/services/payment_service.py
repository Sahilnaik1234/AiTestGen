import datetime
import uuid
import re

class PaymentService:
    """
    PaymentService - A service to manage transactions and validate payments.
    This class is used to test AI Test Generation for Python.
    """

    def __init__(self):
        self.transactions = {}
        self.supported_methods = ["CREDIT_CARD", "DEBIT_CARD", "PAYPAL", "CRYPTO"]
        self.min_payment = 1.0
        self.max_payment = 10000.0

    def process_payment(self, amount: float, method: str, currency: str = "USD"):
        """
        Validates and processes a payment request.
        """
        if amount < self.min_payment:
            raise ValueError(f"Amount {amount} is below the minimum payment of {self.min_payment}")
        
        if amount > self.max_payment:
            raise ValueError(f"Amount {amount} exceeds the maximum payment of {self.max_payment}")
        
        if method.upper() not in self.supported_methods:
            raise ValueError(f"Payment method {method} is not supported. Supported: {self.supported_methods}")
        
        if not re.match(r"^[A-Z]{3}$", currency.upper()):
            raise ValueError("Invalid currency format. Must be a 3-letter ISO code.")

        transaction_id = str(uuid.uuid4())
        fee = self.calculate_fees(amount, method)
        total = amount + fee

        transaction = {
            "id": transaction_id,
            "amount": amount,
            "fee": fee,
            "total": total,
            "method": method.upper(),
            "currency": currency.upper(),
            "timestamp": datetime.datetime.now().isoformat(),
            "status": "COMPLETED"
        }

        self.transactions[transaction_id] = transaction
        return transaction

    def calculate_fees(self, amount: float, method: str) -> float:
        """
        Calculates transaction fees based on the payment method.
        """
        method = method.upper()
        if method == "CREDIT_CARD":
            return amount * 0.03 + 0.30
        elif method == "DEBIT_CARD":
            return amount * 0.01 + 0.10
        elif method == "PAYPAL":
            return amount * 0.04
        elif method == "CRYPTO":
            return amount * 0.005
        else:
            return 0.0

    def get_transaction(self, transaction_id: str):
        """
        Retrieves a transaction by its unique ID.
        """
        return self.transactions.get(transaction_id)

    def refund_payment(self, transaction_id: str):
        """
        Refunds a completed transaction.
        """
        if transaction_id not in self.transactions:
            return False
        
        transaction = self.transactions[transaction_id]
        if transaction["status"] == "REFUNDED":
            return False
            
        # Check if transaction is within the 30-day refund window
        tx_time = datetime.datetime.fromisoformat(transaction["timestamp"])
        if (datetime.datetime.now() - tx_time).days > 30:
            return False

        transaction["status"] = "REFUNDED"
        return True

    def get_total_volume(self, method: str = None):
        """
        Calculates total volume, optionally filtered by method.
        """
        total = 0.0
        for tx in self.transactions.values():
            if method is None or tx["method"] == method.upper():
                if tx["status"] != "REFUNDED":
                    total += tx["amount"]
        return total

    def validate_card_number(self, card_number: str) -> bool:
        """
        Simple Luhn algorithm check for credit card numbers.
        """
        if not card_number.isdigit():
            return False
        
        digits = [int(d) for d in card_number]
        checksum = 0
        reverse_digits = digits[::-1]
        
        for i, digit in enumerate(reverse_digits):
            if i % 2 == 1:
                digit *= 2
                if digit > 9:
                    digit -= 9
            checksum += digit
            
        return checksum % 10 == 0
