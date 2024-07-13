// Visitor Design Pattern Overview
// The Visitor pattern allows you to add operations to classes without having to modify them.
// It achieves this by separating the structure (the elements being operated upon) from the operations (the visitor).

// Example Scenario
// Imagine a scenario where you have different types of products in a shopping cart,
// and you want to calculate the shipping cost for each type of product differently.
// This is where the Visitor pattern can be applied: each product can accept a visitor that calculates its shipping cost based on its type.

// Visitor Interface
interface ProductVisitor {
  visitBook(product: Book): number;
  visitElectronics(product: Electronics): number;
}

// Concrete Visitor: ShippingCostCalculator
class ShippingCostCalculator implements ProductVisitor {
  visitBook(product: Book): number {
    // Calculate shipping cost for a book
    return product.weight * 0.5; // Example: $0.5 per gram
  }

  visitElectronics(product: Electronics): number {
    // Calculate shipping cost for electronics
    return product.weight * 1.2; // Example: $1.2 per gram
  }
}

// Element Interface
interface Product {
  accept(visitor: ProductVisitor): number;
}

// Concrete Elements
class Book implements Product {
  constructor(public weight: number) {}

  accept(visitor: ProductVisitor): number {
    return visitor.visitBook(this);
  }
}

class Electronics implements Product {
  constructor(public weight: number) {}

  accept(visitor: ProductVisitor): number {
    return visitor.visitElectronics(this);
  }
}

// Example Usage
const book = new Book(500); // 500 grams
const electronics = new Electronics(2000); // 2000 grams

const shippingCostCalculator = new ShippingCostCalculator();

const bookShippingCost = book.accept(shippingCostCalculator);
console.log(`Shipping cost for the book: $${bookShippingCost}`);

const electronicsShippingCost = electronics.accept(shippingCostCalculator);
console.log(`Shipping cost for electronics: $${electronicsShippingCost}`);
