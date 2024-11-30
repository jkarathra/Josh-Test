import React, { useState, useEffect } from "react";
import IngredientManager from "./recipe-finder/IngredientManager";
import RecipeResults from "./recipe-finder/RecipeResults";
import RecipeDetail from "./recipe-finder/RecipeDetail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UtensilsCrossed } from "lucide-react";

interface Ingredient {
  name: string;
  id: string;
}

interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  matchPercentage: number;
  missingIngredientsCount: number;
  prepTime: number;
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  difficulty: string;
  servings: number;
}

const RECIPE_IMAGES = [
  "https://natashaskitchen.com/wp-content/uploads/2018/08/Chicken-Stir-Fry-1-1.jpg",
  "https://cdn.loveandlemons.com/wp-content/uploads/2021/04/green-salad.jpg",
  "https://www.onceuponachef.com/images/2023/08/Beef-Tacos.jpg",
];

const defaultRecipes: Recipe[] = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    imageUrl: RECIPE_IMAGES[0],
    matchPercentage: 75,
    missingIngredientsCount: 2,
    prepTime: 30,
    cuisine: "Italian",
    ingredients: [
      "Pasta",
      "Eggs",
      "Pecorino Romano",
      "Guanciale",
      "Black Pepper",
      "Salt",
    ],
    instructions: [
      "Bring a large pot of salted water to boil.",
      "Cook pasta according to package instructions until al dente.",
      "While pasta cooks, whisk eggs and grated cheese in a bowl.",
      "Cook guanciale until crispy, then remove from heat.",
      "Drain pasta, reserving some pasta water.",
      "Combine pasta with egg mixture, adding pasta water as needed.",
      "Season with black pepper and serve immediately.",
    ],
    difficulty: "Medium",
    servings: 4,
  },
  {
    id: "2",
    title: "Chicken Stir Fry",
    imageUrl: RECIPE_IMAGES[1],
    matchPercentage: 85,
    missingIngredientsCount: 1,
    prepTime: 25,
    cuisine: "Chinese",
    ingredients: [
      "Chicken Breast",
      "Soy Sauce",
      "Garlic",
      "Ginger",
      "Bell Peppers",
      "Onion",
      "Rice",
    ],
    instructions: [
      "Cut chicken into bite-sized pieces",
      "Prepare vegetables",
      "Heat wok or large pan",
      "Cook chicken until golden",
      "Add vegetables and stir-fry",
      "Add sauce and simmer",
      "Serve over rice",
    ],
    difficulty: "Easy",
    servings: 4,
  },
  {
    id: "3",
    title: "Margherita Pizza",
    imageUrl: RECIPE_IMAGES[2],
    matchPercentage: 60,
    missingIngredientsCount: 3,
    prepTime: 45,
    cuisine: "Italian",
    ingredients: [
      "Pizza Dough",
      "Tomatoes",
      "Fresh Mozzarella",
      "Basil",
      "Olive Oil",
      "Salt",
    ],
    instructions: [
      "Preheat oven to highest setting",
      "Roll out pizza dough",
      "Add tomato sauce",
      "Top with mozzarella",
      "Bake until crust is golden",
      "Add fresh basil",
      "Drizzle with olive oil",
    ],
    difficulty: "Medium",
    servings: 2,
  },
  {
    id: "4",
    title: "Greek Salad",
    imageUrl: RECIPE_IMAGES[0],
    matchPercentage: 90,
    missingIngredientsCount: 1,
    prepTime: 15,
    cuisine: "Mediterranean",
    ingredients: [
      "Cucumber",
      "Tomatoes",
      "Red Onion",
      "Feta Cheese",
      "Olives",
      "Olive Oil",
      "Oregano",
    ],
    instructions: [
      "Chop vegetables",
      "Combine in bowl",
      "Add feta and olives",
      "Dress with olive oil",
      "Season with oregano and salt",
    ],
    difficulty: "Easy",
    servings: 4,
  },
  {
    id: "5",
    title: "Beef Tacos",
    imageUrl: RECIPE_IMAGES[1],
    matchPercentage: 70,
    missingIngredientsCount: 2,
    prepTime: 30,
    cuisine: "Mexican",
    ingredients: [
      "Ground Beef",
      "Taco Seasoning",
      "Tortillas",
      "Lettuce",
      "Tomatoes",
      "Cheese",
      "Onion",
    ],
    instructions: [
      "Brown the ground beef",
      "Add taco seasoning",
      "Warm tortillas",
      "Assemble tacos with toppings",
    ],
    difficulty: "Easy",
    servings: 4,
  },
  {
    id: "6",
    title: "Vegetable Curry",
    imageUrl: RECIPE_IMAGES[2],
    matchPercentage: 65,
    missingIngredientsCount: 3,
    prepTime: 40,
    cuisine: "Indian",
    ingredients: [
      "Potatoes",
      "Carrots",
      "Peas",
      "Curry Powder",
      "Coconut Milk",
      "Onion",
      "Garlic",
      "Ginger",
    ],
    instructions: [
      "Sauté onion, garlic, and ginger",
      "Add curry powder",
      "Add vegetables",
      "Pour in coconut milk",
      "Simmer until vegetables are tender",
    ],
    difficulty: "Medium",
    servings: 6,
  },
];

function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes] = useState<Recipe[]>(defaultRecipes);
  const [userIngredients, setUserIngredients] = useState<Ingredient[]>([]);
  const [filteredRecipes, setFilteredRecipes] =
    useState<Recipe[]>(defaultRecipes);

  const calculateRecipeMatch = (
    recipeIngredients: string[],
    userIngredients: Ingredient[],
  ) => {
    const userIngredientNames = userIngredients.map((ing) =>
      ing.name.toLowerCase(),
    );
    const matchedIngredients = recipeIngredients.filter((ing) =>
      userIngredientNames.includes(ing.toLowerCase()),
    );
    return {
      matchPercentage: Math.round(
        (matchedIngredients.length / recipeIngredients.length) * 100,
      ),
      missingIngredientsCount:
        recipeIngredients.length - matchedIngredients.length,
    };
  };

  useEffect(() => {
    const updatedRecipes = recipes.map((recipe) => {
      const { matchPercentage, missingIngredientsCount } = calculateRecipeMatch(
        recipe.ingredients,
        userIngredients,
      );
      return {
        ...recipe,
        matchPercentage,
        missingIngredientsCount,
      };
    });
    setFilteredRecipes(updatedRecipes);
  }, [userIngredients, recipes]);

  const handleIngredientsChange = (ingredients: Ingredient[]) => {
    setUserIngredients(ingredients);
  };

  const handleFiltersChange = (filters: {
    cuisine: string;
    maxPrepTime: number;
    maxAdditionalIngredients: number;
  }) => {
    let filtered = [...recipes];

    // Apply cuisine filter
    if (filters.cuisine !== "All") {
      filtered = filtered.filter(
        (recipe) => recipe.cuisine === filters.cuisine,
      );
    }

    // Apply prep time filter
    filtered = filtered.filter(
      (recipe) => recipe.prepTime <= filters.maxPrepTime,
    );

    // Apply additional ingredients filter
    filtered = filtered.filter(
      (recipe) =>
        recipe.missingIngredientsCount <= filters.maxAdditionalIngredients,
    );

    // Update match percentages
    filtered = filtered.map((recipe) => {
      const { matchPercentage, missingIngredientsCount } = calculateRecipeMatch(
        recipe.ingredients,
        userIngredients,
      );
      return {
        ...recipe,
        matchPercentage,
        missingIngredientsCount,
      };
    });

    // Sort by match percentage
    filtered.sort((a, b) => b.matchPercentage - a.matchPercentage);

    setFilteredRecipes(filtered);
  };

  const handleRecipeSelect = (recipeId: string) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (recipe) {
      setSelectedRecipe(recipe);
    }
  };

  return (
    <div className="w-[1512px] min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="w-full h-16 bg-primary flex items-center justify-between px-6 shadow-md fixed top-0 z-50">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-primary-foreground" />
          <h1 className="text-xl font-bold text-primary-foreground">
            Makoto's Kitchen
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 pt-16">
        <IngredientManager onIngredientsChange={handleIngredientsChange} />
        <RecipeResults
          recipes={filteredRecipes}
          onFiltersChange={handleFiltersChange}
          onRecipeSelect={handleRecipeSelect}
        />

        <Dialog
          open={selectedRecipe !== null}
          onOpenChange={() => setSelectedRecipe(null)}
        >
          <DialogContent className="max-w-[800px] p-0">
            {selectedRecipe && (
              <RecipeDetail
                title={selectedRecipe.title}
                imageUrl={selectedRecipe.imageUrl}
                matchPercentage={selectedRecipe.matchPercentage}
                prepTime={selectedRecipe.prepTime}
                servings={selectedRecipe.servings}
                difficulty={selectedRecipe.difficulty}
                ingredients={selectedRecipe.ingredients.map((ing) => ({
                  name: ing,
                  have: userIngredients.some(
                    (userIng) =>
                      userIng.name.toLowerCase() === ing.toLowerCase(),
                  ),
                }))}
                instructions={selectedRecipe.instructions}
                onClose={() => setSelectedRecipe(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Home;
