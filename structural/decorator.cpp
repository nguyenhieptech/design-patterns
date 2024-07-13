#include <iostream>
#include <string>
#include <memory>

// Component
class Coffee
{
public:
  virtual ~Coffee() = default;
  virtual double cost() const = 0;
  virtual std::string description() const = 0;
};

// Concrete Component
class BasicCoffee : public Coffee
{
public:
  double cost() const override
  {
    return 5.0;
  }

  std::string description() const override
  {
    return "Basic coffee";
  }
};

// Decorator
class CoffeeDecorator : public Coffee
{
protected:
  std::shared_ptr<Coffee> coffee;

public:
  CoffeeDecorator(std::shared_ptr<Coffee> coffee) : coffee(std::move(coffee)) {}
  double cost() const override
  {
    return coffee->cost();
  }

  std::string description() const override
  {
    return coffee->description();
  }
};

// Concrete Decorators
class Milk : public CoffeeDecorator
{
public:
  Milk(std::shared_ptr<Coffee> coffee) : CoffeeDecorator(std::move(coffee)) {}

  double cost() const override
  {
    return CoffeeDecorator::cost() + 1.0;
  }

  std::string description() const override
  {
    return CoffeeDecorator::description() + ", Milk";
  }
};

class Sugar : public CoffeeDecorator
{
public:
  Sugar(std::shared_ptr<Coffee> coffee) : CoffeeDecorator(std::move(coffee)) {}

  double cost() const override
  {
    return CoffeeDecorator::cost() + 0.5;
  }

  std::string description() const override
  {
    return CoffeeDecorator::description() + ", Sugar";
  }
};

class Caramel : public CoffeeDecorator
{
public:
  Caramel(std::shared_ptr<Coffee> coffee) : CoffeeDecorator(std::move(coffee)) {}

  double cost() const override
  {
    return CoffeeDecorator::cost() + 1.5;
  }

  std::string description() const override
  {
    return CoffeeDecorator::description() + ", Caramel";
  }
};

// Example usage
int main()
{
  std::shared_ptr<Coffee> coffee = std::make_shared<BasicCoffee>();
  std::cout << coffee->description() << " costs $" << coffee->cost() << std::endl;

  coffee = std::make_shared<Milk>(coffee);
  std::cout << coffee->description() << " costs $" << coffee->cost() << std::endl;

  coffee = std::make_shared<Sugar>(coffee);
  std::cout << coffee->description() << " costs $" << coffee->cost() << std::endl;

  coffee = std::make_shared<Caramel>(coffee);
  std::cout << coffee->description() << " costs $" << coffee->cost() << std::endl;

  return 0;
}
