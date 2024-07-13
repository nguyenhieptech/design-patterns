#include <iostream>
#include <memory>

// Strategy Interface: PaymentStrategy
class PaymentStrategy
{
public:
  virtual ~PaymentStrategy() = default;
  virtual void pay(int amount) const = 0;
};

// Concrete Strategy: CreditCardPaymentStrategy
class CreditCardPaymentStrategy : public PaymentStrategy
{
public:
  void pay(int amount) const override
  {
    std::cout << "Paying $" << amount << " via Credit Card" << std::endl;
    // Credit card payment logic
  }
};

// Concrete Strategy: PayPalPaymentStrategy
class PayPalPaymentStrategy : public PaymentStrategy
{
public:
  void pay(int amount) const override
  {
    std::cout << "Paying $" << amount << " via PayPal" << std::endl;
    // PayPal payment logic
  }
};

// Concrete Strategy: StripePaymentStrategy
class StripePaymentStrategy : public PaymentStrategy
{
public:
  void pay(int amount) const override
  {
    std::cout << "Paying $" << amount << " via Stripe" << std::endl;
    // Stripe payment logic
  }
};

// Context: PaymentContext
class PaymentContext
{
public:
  PaymentContext(std::shared_ptr<PaymentStrategy> strategy) : paymentStrategy(std::move(strategy)) {}

  void setPaymentStrategy(std::shared_ptr<PaymentStrategy> strategy)
  {
    paymentStrategy = std::move(strategy);
  }

  void executePayment(int amount) const
  {
    paymentStrategy->pay(amount);
  }

private:
  std::shared_ptr<PaymentStrategy> paymentStrategy;
};

// Example Usage
int main()
{
  auto creditCardStrategy = std::make_shared<CreditCardPaymentStrategy>();
  auto paypalStrategy = std::make_shared<PayPalPaymentStrategy>();
  auto stripeStrategy = std::make_shared<StripePaymentStrategy>();

  PaymentContext paymentContext(creditCardStrategy);
  paymentContext.executePayment(100);

  paymentContext.setPaymentStrategy(paypalStrategy);
  paymentContext.executePayment(200);

  paymentContext.setPaymentStrategy(stripeStrategy);
  paymentContext.executePayment(300);

  return 0;
}
