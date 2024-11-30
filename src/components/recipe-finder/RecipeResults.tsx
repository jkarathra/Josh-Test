import React, { useState } from "react";
import RecipeFilters from "./RecipeFilters";
import RecipeGrid from "./RecipeGrid";

interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  matchPercentage: number;
  missingIngredientsCount: number;
  prepTime: number;
}

interface RecipeResultsProps {
  recipes?: Recipe[];
  onFiltersChange?: (filters: {
    cuisine: string;
    maxPrepTime: number;
    maxAdditionalIngredients: number;
  }) => void;
  onRecipeSelect?: (recipeId: string) => void;
}

const RecipeResults = ({
  recipes = [],
  onFiltersChange = () => {},
  onRecipeSelect = () => {},
}: RecipeResultsProps) => {
  const [filters, setFilters] = useState({
    cuisine: "All",
    maxPrepTime: 60,
    maxAdditionalIngredients: 5,
  });

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="flex-1 min-h-screen bg-background p-6 flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Recipe Results
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {recipes.length} recipes found based on your ingredients
        </p>
      </div>

      <RecipeFilters
        selectedCuisine={filters.cuisine}
        maxPrepTime={filters.maxPrepTime}
        maxAdditionalIngredients={filters.maxAdditionalIngredients}
        onCuisineChange={(cuisine) =>
          handleFiltersChange({ ...filters, cuisine })
        }
        onPrepTimeChange={(maxPrepTime) =>
          handleFiltersChange({ ...filters, maxPrepTime })
        }
        onMaxIngredientsChange={(maxAdditionalIngredients) =>
          handleFiltersChange({ ...filters, maxAdditionalIngredients })
        }
      />

      <RecipeGrid recipes={recipes} onRecipeClick={onRecipeSelect} />
    </div>
  );
};

export default RecipeResults;
