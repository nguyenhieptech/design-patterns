// Component
interface Coffee {
  cost(): number;
  description(): string;
}

// Concrete Component
class BasicCoffee implements Coffee {
  cost(): number {
    return 5;
  }

  description(): string {
    return "Basic coffee";
  }
}

// Decorator
class CoffeeDecorator implements Coffee {
  protected coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  cost(): number {
    return this.coffee.cost();
  }

  description(): string {
    return this.coffee.description();
  }
}

// Concrete Decorators
class Milk extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  cost(): number {
    return super.cost() + 1;
  }

  description(): string {
    return super.description() + ", Milk";
  }
}

class Sugar extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  cost(): number {
    return super.cost() + 0.5;
  }

  description(): string {
    return super.description() + ", Sugar";
  }
}

class Caramel extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  cost(): number {
    return super.cost() + 1.5;
  }

  description(): string {
    return super.description() + ", Caramel";
  }
}

// Example usage
let coffee: Coffee = new BasicCoffee();
console.log(`${coffee.description()} costs $${coffee.cost()}`);

coffee = new Milk(coffee);
console.log(`${coffee.description()} costs $${coffee.cost()}`);

coffee = new Sugar(coffee);
console.log(`${coffee.description()} costs $${coffee.cost()}`);

coffee = new Caramel(coffee);
console.log(`${coffee.description()} costs $${coffee.cost()}`);
