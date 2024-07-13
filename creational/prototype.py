from abc import ABC, abstractmethod
from typing import Dict


# Shape interface
class Shape(ABC):
    @abstractmethod
    def clone(self) -> "Shape":
        pass

    @abstractmethod
    def draw(self) -> None:
        pass


# Circle class
class Circle(Shape):
    def __init__(self, radius: int) -> None:
        self.radius = radius

    def clone(self) -> "Circle":
        return Circle(self.radius)

    def draw(self) -> None:
        print(f"Drawing Circle with radius: {self.radius}")


# Square class
class Square(Shape):
    def __init__(self, side: int) -> None:
        self.side = side

    def clone(self) -> "Square":
        return Square(self.side)

    def draw(self) -> None:
        print(f"Drawing Square with side: {self.side}")


# Prototype Factory
class PrototypeFactory:
    def __init__(self) -> None:
        self._prototypes: Dict[str, Shape] = {}

    def register_prototype(self, name: str, prototype: Shape) -> None:
        self._prototypes[name] = prototype

    def create_prototype(self, name: str) -> Shape:
        prototype = self._prototypes.get(name)
        if prototype is None:
            raise ValueError(f"Prototype not found: {name}")
        return prototype.clone()


# Example usage
factory = PrototypeFactory()

factory.register_prototype("circle", Circle(10))
factory.register_prototype("square", Square(5))

circle = factory.create_prototype("circle")
square = factory.create_prototype("square")

circle.draw()
square.draw()
