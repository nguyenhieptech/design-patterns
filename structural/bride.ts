// Sure! The Bridge design pattern is used to separate the abstraction from
// its implementation so that both can be modified independently.
// This is particularly useful when you have multiple implementations of
// an interface and you want to switch between them dynamically.

// Here's an example using the scenario of rendering different shapes (e.g., Circle and Square)
// with different rendering methods (e.g., SVG and Canvas).

// 1. Implementor: The Renderer interface (TypeScript: Renderer, Python: Renderer, C++: Renderer) defines methods for rendering shapes.
// 2. Concrete Implementors: SVGRenderer and CanvasRenderer provide concrete implementations for rendering shapes using SVG and Canvas, respectively.
// 3. Abstraction: The Shape abstract class (TypeScript: Shape, Python: Shape, C++: Shape) defines an interface for shapes that use a Renderer to draw themselves.
// 4. Refined Abstractions: Circle and Square are specific types of shapes that delegate drawing to their Renderer instance.
// 5. Client Code: Demonstrates how to create and use shapes with different renderers without changing the shape's code.

// Implementor
interface Renderer {
  renderCircle(radius: number): void;
  renderSquare(side: number): void;
}

// Concrete Implementor: SVGRenderer
class SVGRenderer implements Renderer {
  renderCircle(radius: number): void {
    console.log(`Rendering circle with radius ${radius} using SVG.`);
  }

  renderSquare(side: number): void {
    console.log(`Rendering square with side ${side} using SVG.`);
  }
}

// Concrete Implementor: CanvasRenderer
class CanvasRenderer implements Renderer {
  renderCircle(radius: number): void {
    console.log(`Rendering circle with radius ${radius} using Canvas.`);
  }

  renderSquare(side: number): void {
    console.log(`Rendering square with side ${side} using Canvas.`);
  }
}

// Abstraction
abstract class Shape {
  protected renderer: Renderer;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  abstract draw(): void;
}

// Refined Abstraction: Circle
class Circle extends Shape {
  private radius: number;

  constructor(renderer: Renderer, radius: number) {
    super(renderer);
    this.radius = radius;
  }

  draw(): void {
    this.renderer.renderCircle(this.radius);
  }
}

// Refined Abstraction: Square
class Square extends Shape {
  private side: number;

  constructor(renderer: Renderer, side: number) {
    super(renderer);
    this.side = side;
  }

  draw(): void {
    this.renderer.renderSquare(this.side);
  }
}

// Example usage
const svgRenderer = new SVGRenderer();
const canvasRenderer = new CanvasRenderer();

const circle = new Circle(svgRenderer, 10);
circle.draw(); // Output: Rendering circle with radius 10 using SVG.

const square = new Square(canvasRenderer, 20);
square.draw(); // Output: Rendering square with side 20 using Canvas.
