from abc import ABC, abstractmethod


# Visitor Interface
class ProductVisitor(ABC):
    @abstractmethod
    def visit_book(self, product: "Book") -> float:
        pass

    @abstractmethod
    def visit_electronics(self, product: "Electronics") -> float:
        pass


# Concrete Visitor: ShippingCostCalculator
class ShippingCostCalculator(ProductVisitor):
    def visit_book(self, product: "Book") -> float:
        # Calculate shipping cost for a book
        return product.weight * 0.5  # Example: $0.5 per gram

    def visit_electronics(self, product: "Electronics") -> float:
        # Calculate shipping cost for electronics
        return product.weight * 1.2  # Example: $1.2 per gram


# Element Interface
class Product(ABC):
    @abstractmethod
    def accept(self, visitor: ProductVisitor) -> float:
        pass


# Concrete Elements
class Book(Product):
    def __init__(self, weight: int):
        self.weight = weight

    def accept(self, visitor: ProductVisitor) -> float:
        return visitor.visit_book(self)


class Electronics(Product):
    def __init__(self, weight: int):
        self.weight = weight

    def accept(self, visitor: ProductVisitor) -> float:
        return visitor.visit_electronics(self)


# Example Usage
book = Book(500)  # 500 grams
electronics = Electronics(2000)  # 2000 grams

shipping_cost_calculator = ShippingCostCalculator()

book_shipping_cost = book.accept(shipping_cost_calculator)
print(f"Shipping cost for the book: ${book_shipping_cost}")

electronics_shipping_cost = electronics.accept(shipping_cost_calculator)
print(f"Shipping cost for electronics: ${electronics_shipping_cost}")
