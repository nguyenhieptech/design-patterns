// In each implementation, the Shape interface defines the clone and draw methods.
// The Circle and Square classes implement the Shape interface.
// The PrototypeFactory class is responsible for managing and cloning prototypes.
// This setup allows for the creation of new shape instances by cloning existing prototypes,
// demonstrating the Prototype design pattern.

// Shape interface
interface Shape {
  clone(): Shape;
  draw(): void;
}

// Circle class
class Circle implements Shape {
  constructor(private radius: number) {}

  clone(): Circle {
    return new Circle(this.radius);
  }

  draw(): void {
    console.log(`Drawing Circle with radius: ${this.radius}`);
  }
}

// Square class
class Square implements Shape {
  constructor(private side: number) {}

  clone(): Square {
    return new Square(this.side);
  }

  draw(): void {
    console.log(`Drawing Square with side: ${this.side}`);
  }
}

// Prototype Factory
class PrototypeFactory {
  private prototypes: Map<string, Shape> = new Map();

  registerPrototype(name: string, prototype: Shape): void {
    this.prototypes.set(name, prototype);
  }

  createPrototype(name: string): Shape {
    const prototype = this.prototypes.get(name);
    if (!prototype) {
      throw new Error(`Prototype not found: ${name}`);
    }
    return prototype.clone();
  }
}

// Example usage
const factory = new PrototypeFactory();

factory.registerPrototype("circle", new Circle(10));
factory.registerPrototype("square", new Square(5));

const circle = factory.createPrototype("circle");
const square = factory.createPrototype("square");

circle.draw();
square.draw();
