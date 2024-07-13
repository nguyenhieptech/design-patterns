#include <iostream>
#include <memory>
#include <unordered_map>

// Shape interface
class Shape
{
public:
  virtual std::shared_ptr<Shape> clone() const = 0;
  virtual void draw() const = 0;
  virtual ~Shape() = default;
};

// Circle class
class Circle : public Shape
{
public:
  Circle(int radius) : radius_(radius) {}
  std::shared_ptr<Shape> clone() const override
  {
    return std::make_shared<Circle>(*this);
  }
  void draw() const override
  {
    std::cout << "Drawing Circle with radius: " << radius_ << std::endl;
  }

private:
  int radius_;
};

// Square class
class Square : public Shape
{
public:
  Square(int side) : side_(side) {}
  std::shared_ptr<Shape> clone() const override
  {
    return std::make_shared<Square>(*this);
  }
  void draw() const override
  {
    std::cout << "Drawing Square with side: " << side_ << std::endl;
  }

private:
  int side_;
};

// Prototype Factory
class PrototypeFactory
{
public:
  void registerPrototype(const std::string &name, std::shared_ptr<Shape> prototype)
  {
    prototypes_[name] = prototype;
  }
  std::shared_ptr<Shape> createPrototype(const std::string &name) const
  {
    return prototypes_.at(name)->clone();
  }

private:
  std::unordered_map<std::string, std::shared_ptr<Shape>> prototypes_;
};

// Example usage
int main()
{
  PrototypeFactory factory;

  factory.registerPrototype("circle", std::make_shared<Circle>(10));
  factory.registerPrototype("square", std::make_shared<Square>(5));

  auto circle = factory.createPrototype("circle");
  auto square = factory.createPrototype("square");

  circle->draw();
  square->draw();

  return 0;
}
