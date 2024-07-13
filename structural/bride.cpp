#include <iostream>
#include <memory>

// Implementor
class Renderer
{
public:
  virtual ~Renderer() = default;
  virtual void renderCircle(int radius) = 0;
  virtual void renderSquare(int side) = 0;
};

// Concrete Implementor: SVGRenderer
class SVGRenderer : public Renderer
{
public:
  void renderCircle(int radius) override
  {
    std::cout << "Rendering circle with radius " << radius << " using SVG.\n";
  }

  void renderSquare(int side) override
  {
    std::cout << "Rendering square with side " << side << " using SVG.\n";
  }
};

// Concrete Implementor: CanvasRenderer
class CanvasRenderer : public Renderer
{
public:
  void renderCircle(int radius) override
  {
    std::cout << "Rendering circle with radius " << radius << " using Canvas.\n";
  }

  void renderSquare(int side) override
  {
    std::cout << "Rendering square with side " << side << " using Canvas.\n";
  }
};

// Abstraction
class Shape
{
protected:
  std::unique_ptr<Renderer> renderer;

public:
  Shape(std::unique_ptr<Renderer> renderer) : renderer(std::move(renderer)) {}
  virtual ~Shape() = default;
  virtual void draw() = 0;
};

// Refined Abstraction: Circle
class Circle : public Shape
{
  int radius;

public:
  Circle(std::unique_ptr<Renderer> renderer, int radius)
      : Shape(std::move(renderer)), radius(radius) {}

  void draw() override
  {
    renderer->renderCircle(radius);
  }
};

// Refined Abstraction: Square
class Square : public Shape
{
  int side;

public:
  Square(std::unique_ptr<Renderer> renderer, int side)
      : Shape(std::move(renderer)), side(side) {}

  void draw() override
  {
    renderer->renderSquare(side);
  }
};

// Example usage
int main()
{
  auto svgRenderer = std::make_unique<SVGRenderer>();
  auto canvasRenderer = std::make_unique<CanvasRenderer>();

  Circle circle(std::move(svgRenderer), 10);
  circle.draw(); // Output: Rendering circle with radius 10 using SVG.

  Square square(std::move(canvasRenderer), 20);
  square.draw(); // Output: Rendering square with side 20 using Canvas.

  return 0;
}
