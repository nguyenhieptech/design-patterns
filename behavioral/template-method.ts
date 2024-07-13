// Certainly! Let's consider a real-life example of a Template Method pattern in the context of a recipe application.
// The recipe application provides a base class for recipes with a template method
// for cooking recipes. Subclasses for specific types of recipes, such as
// cake recipes and soup recipes, implement the abstract methods to customize the cooking process.

// Abstract class representing a recipe
abstract class Recipe {
  // Template method for cooking the recipe
  cookRecipe(): void {
    this.prepareIngredients();
    this.performCooking();
    this.serveDish();
  }

  // Abstract methods to be implemented by subclasses
  abstract prepareIngredients(): void;
  abstract performCooking(): void;
  abstract serveDish(): void;
}

// Concrete class for Cake recipe
class CakeRecipe extends Recipe {
  prepareIngredients(): void {
    console.log("Preparing cake ingredients");
  }

  performCooking(): void {
    console.log("Baking the cake");
  }

  serveDish(): void {
    console.log("Serve the cake");
  }
}

// Concrete class for Soup recipe
class SoupRecipe extends Recipe {
  prepareIngredients(): void {
    console.log("Preparing soup ingredients");
  }

  performCooking(): void {
    console.log("Cooking the soup");
  }

  serveDish(): void {
    console.log("Serve the soup");
  }
}

// Example usage
const cakeRecipe = new CakeRecipe();
console.log("Cooking Cake:");
cakeRecipe.cookRecipe();

const soupRecipe = new SoupRecipe();
console.log("Cooking Soup:");
soupRecipe.cookRecipe();
