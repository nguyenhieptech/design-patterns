// Certainly! Let's consider a real-life example of a Strategy pattern in the context of a payment processing library.
// The library needs to support multiple payment methods, such as credit card, PayPal, and Stripe.
// The Strategy pattern can be used to encapsulate each payment method's algorithm and allow clients to switch between payment methods dynamically.

// In this example:
// The PaymentStrategy interface defines the common interface for different payment strategies.
// Concrete classes CreditCardPaymentStrategy, PayPalPaymentStrategy, and StripePaymentStrategy implement the PaymentStrategy interface,
// providing specific implementations for payment via credit card, PayPal, and Stripe.
// The PaymentContext class represents the context in which the payment is executed.
// It has a reference to the current payment strategy and allows clients to dynamically switch between different
// payment strategies using the setPaymentStrategy() method.
// In the example usage, we create instances of different payment strategies and pass them to the PaymentContext.
// We then execute payments using the executePayment() method, which delegates the payment logic to the current payment strategy.
// This pattern allows the client code to choose and switch between different payment strategies dynamically without
// directly coupling the client code to specific payment implementations.
// It also enables easy addition of new payment methods in the future without modifying existing code.

// Strategy Interface: PaymentStrategy
interface PaymentStrategy {
  pay(amount: number): void;
}

// Concrete Strategy: CreditCardPaymentStrategy
class CreditCardPaymentStrategy implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paying $${amount} via Credit Card`);
    // Credit card payment logic
  }
}

// Concrete Strategy: PayPalPaymentStrategy
class PayPalPaymentStrategy implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paying $${amount} via PayPal`);
    // PayPal payment logic
  }
}

// Concrete Strategy: StripePaymentStrategy
class StripePaymentStrategy implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paying $${amount} via Stripe`);
    // Stripe payment logic
  }
}

// Context: PaymentContext
class PaymentContext {
  private paymentStrategy: PaymentStrategy;

  constructor(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  setPaymentStrategy(paymentStrategy: PaymentStrategy): void {
    this.paymentStrategy = paymentStrategy;
  }

  executePayment(amount: number): void {
    this.paymentStrategy.pay(amount);
  }
}

// Example Usage
const creditCardStrategy = new CreditCardPaymentStrategy();
const paypalStrategy = new PayPalPaymentStrategy();
const stripeStrategy = new StripePaymentStrategy();

const paymentContext = new PaymentContext(creditCardStrategy);
paymentContext.executePayment(100);

paymentContext.setPaymentStrategy(paypalStrategy);
paymentContext.executePayment(200);

paymentContext.setPaymentStrategy(stripeStrategy);
paymentContext.executePayment(300);
