from abc import ABC, abstractmethod


# Implementor
class Renderer(ABC):
    @abstractmethod
    def render_circle(self, radius: int) -> None:
        pass

    @abstractmethod
    def render_square(self, side: int) -> None:
        pass


# Concrete Implementor: SVGRenderer
class SVGRenderer(Renderer):
    def render_circle(self, radius: int) -> None:
        print(f"Rendering circle with radius {radius} using SVG.")

    def render_square(self, side: int) -> None:
        print(f"Rendering square with side {side} using SVG.")


# Concrete Implementor: CanvasRenderer
class CanvasRenderer(Renderer):
    def render_circle(self, radius: int) -> None:
        print(f"Rendering circle with radius {radius} using Canvas.")

    def render_square(self, side: int) -> None:
        print(f"Rendering square with side {side} using Canvas.")


# Abstraction
class Shape(ABC):
    def __init__(self, renderer: Renderer) -> None:
        self.renderer = renderer

    @abstractmethod
    def draw(self) -> None:
        pass


# Refined Abstraction: Circle
class Circle(Shape):
    def __init__(self, renderer: Renderer, radius: int) -> None:
        super().__init__(renderer)
        self.radius = radius

    def draw(self) -> None:
        self.renderer.render_circle(self.radius)


# Refined Abstraction: Square
class Square(Shape):
    def __init__(self, renderer: Renderer, side: int) -> None:
        super().__init__(renderer)
        self.side = side

    def draw(self) -> None:
        self.renderer.render_square(self.side)


# Example usage
svg_renderer = SVGRenderer()
canvas_renderer = CanvasRenderer()

circle = Circle(svg_renderer, 10)
circle.draw()  # Output: Rendering circle with radius 10 using SVG.

square = Square(canvas_renderer, 20)
square.draw()  # Output: Rendering square with side 20 using Canvas.
