from abc import ABC, abstractmethod


# Abstract class representing a recipe
class Recipe(ABC):
    # Template method for cooking the recipe
    def cook_recipe(self) -> None:
        self.prepare_ingredients()
        self.perform_cooking()
        self.serve_dish()

    # Abstract methods to be implemented by subclasses
    @abstractmethod
    def prepare_ingredients(self) -> None:
        pass

    @abstractmethod
    def perform_cooking(self) -> None:
        pass

    @abstractmethod
    def serve_dish(self) -> None:
        pass


# Concrete class for Cake recipe
class CakeRecipe(Recipe):
    def prepare_ingredients(self) -> None:
        print("Preparing cake ingredients")

    def perform_cooking(self) -> None:
        print("Baking the cake")

    def serve_dish(self) -> None:
        print("Serve the cake")


# Concrete class for Soup recipe
class SoupRecipe(Recipe):
    def prepare_ingredients(self) -> None:
        print("Preparing soup ingredients")

    def perform_cooking(self) -> None:
        print("Cooking the soup")

    def serve_dish(self) -> None:
        print("Serve the soup")


# Example usage
if __name__ == "__main__":
    cake_recipe = CakeRecipe()
    print("Cooking Cake:")
    cake_recipe.cook_recipe()

    soup_recipe = SoupRecipe()
    print("Cooking Soup:")
    soup_recipe.cook_recipe()
