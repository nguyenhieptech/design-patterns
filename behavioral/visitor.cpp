#include <iostream>

// Forward declarations
class Book;
class Electronics;

// Visitor Interface
class ProductVisitor
{
public:
  virtual double visitBook(Book *book) = 0;
  virtual double visitElectronics(Electronics *electronics) = 0;
};

// Element Interface
class Product
{
public:
  virtual double accept(ProductVisitor *visitor) = 0;
};

// Concrete Elements
class Book : public Product
{
private:
  int weight;

public:
  Book(int weight) : weight(weight) {}

  double accept(ProductVisitor *visitor) override
  {
    return visitor->visitBook(this);
  }

  int getWeight() const
  {
    return weight;
  }
};

class Electronics : public Product
{
private:
  int weight;

public:
  Electronics(int weight) : weight(weight) {}

  double accept(ProductVisitor *visitor) override
  {
    return visitor->visitElectronics(this);
  }

  int getWeight() const
  {
    return weight;
  }
};

// Concrete Visitor: ShippingCostCalculator
class ShippingCostCalculator : public ProductVisitor
{
public:
  double visitBook(Book *book) override
  {
    // Calculate shipping cost for a book
    return book->getWeight() * 0.5; // Example: $0.5 per gram
  }

  double visitElectronics(Electronics *electronics) override
  {
    // Calculate shipping cost for electronics
    return electronics->getWeight() * 1.2; // Example: $1.2 per gram
  }
};

// Example Usage
int main()
{
  Book book(500);                // 500 grams
  Electronics electronics(2000); // 2000 grams

  ShippingCostCalculator shippingCostCalculator;

  double bookShippingCost = book.accept(&shippingCostCalculator);
  std::cout << "Shipping cost for the book: $" << bookShippingCost << std::endl;

  double electronicsShippingCost = electronics.accept(&shippingCostCalculator);
  std::cout << "Shipping cost for electronics: $" << electronicsShippingCost << std::endl;

  return 0;
}
