from typing import Protocol


# Component
class Coffee(Protocol):
    def cost(self) -> float: ...

    def description(self) -> str: ...


# Concrete Component
class BasicCoffee(Coffee):
    def cost(self) -> float:
        return 5.0

    def description(self) -> str:
        return "Basic coffee"


# Decorator
class CoffeeDecorator(Coffee):
    def __init__(self, coffee: Coffee) -> None:
        self._coffee = coffee

    def cost(self) -> float:
        return self._coffee.cost()

    def description(self) -> str:
        return self._coffee.description()


# Concrete Decorators
class Milk(CoffeeDecorator):
    def cost(self) -> float:
        return super().cost() + 1.0

    def description(self) -> str:
        return super().description() + ", Milk"


class Sugar(CoffeeDecorator):
    def cost(self) -> float:
        return super().cost() + 0.5

    def description(self) -> str:
        return super().description() + ", Sugar"


class Caramel(CoffeeDecorator):
    def cost(self) -> float:
        return super().cost() + 1.5

    def description(self) -> str:
        return super().description() + ", Caramel"


# Example usage
coffee: Coffee = BasicCoffee()
print(f"{coffee.description()} costs ${coffee.cost()}")

coffee = Milk(coffee)
print(f"{coffee.description()} costs ${coffee.cost()}")

coffee = Sugar(coffee)
print(f"{coffee.description()} costs ${coffee.cost()}")

coffee = Caramel(coffee)
print(f"{coffee.description()} costs ${coffee.cost()}")
