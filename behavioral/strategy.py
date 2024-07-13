from typing import Protocol


# Strategy Interface: PaymentStrategy
class PaymentStrategy(Protocol):
    def pay(self, amount: int) -> None: ...


# Concrete Strategy: CreditCardPaymentStrategy
class CreditCardPaymentStrategy:
    def pay(self, amount: int) -> None:
        print(f"Paying ${amount} via Credit Card")
        # Credit card payment logic


# Concrete Strategy: PayPalPaymentStrategy
class PayPalPaymentStrategy:
    def pay(self, amount: int) -> None:
        print(f"Paying ${amount} via PayPal")
        # PayPal payment logic


# Concrete Strategy: StripePaymentStrategy
class StripePaymentStrategy:
    def pay(self, amount: int) -> None:
        print(f"Paying ${amount} via Stripe")
        # Stripe payment logic


# Context: PaymentContext
class PaymentContext:
    def __init__(self, payment_strategy: PaymentStrategy) -> None:
        self._payment_strategy = payment_strategy

    def set_payment_strategy(self, payment_strategy: PaymentStrategy) -> None:
        self._payment_strategy = payment_strategy

    def execute_payment(self, amount: int) -> None:
        self._payment_strategy.pay(amount)


# Example Usage
if __name__ == "__main__":
    credit_card_strategy = CreditCardPaymentStrategy()
    paypal_strategy = PayPalPaymentStrategy()
    stripe_strategy = StripePaymentStrategy()

    payment_context = PaymentContext(credit_card_strategy)
    payment_context.execute_payment(100)

    payment_context.set_payment_strategy(paypal_strategy)
    payment_context.execute_payment(200)

    payment_context.set_payment_strategy(stripe_strategy)
    payment_context.execute_payment(300)
