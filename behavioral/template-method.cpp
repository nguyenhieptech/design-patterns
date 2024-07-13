#include <iostream>

// Abstract class representing a recipe
class Recipe
{
public:
  // Template method for cooking the recipe
  void cookRecipe()
  {
    prepareIngredients();
    performCooking();
    serveDish();
  }

  // Abstract methods to be implemented by subclasses
  virtual void prepareIngredients() = 0;
  virtual void performCooking() = 0;
  virtual void serveDish() = 0;
};

// Concrete class for Cake recipe
class CakeRecipe : public Recipe
{
public:
  void prepareIngredients() override
  {
    std::cout << "Preparing cake ingredients" << std::endl;
  }

  void performCooking() override
  {
    std::cout << "Baking the cake" << std::endl;
  }

  void serveDish() override
  {
    std::cout << "Serve the cake" << std::endl;
  }
};

// Concrete class for Soup recipe
class SoupRecipe : public Recipe
{
public:
  void prepareIngredients() override
  {
    std::cout << "Preparing soup ingredients" << std::endl;
  }

  void performCooking() override
  {
    std::cout << "Cooking the soup" << std::endl;
  }

  void serveDish() override
  {
    std::cout << "Serve the soup" << std::endl;
  }
};

// Example usage
int main()
{
  CakeRecipe cakeRecipe;
  std::cout << "Cooking Cake:" << std::endl;
  cakeRecipe.cookRecipe();

  SoupRecipe soupRecipe;
  std::cout << "Cooking Soup:" << std::endl;
  soupRecipe.cookRecipe();

  return 0;
}
