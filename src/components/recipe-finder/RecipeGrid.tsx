import React from "react";
import RecipeCard from "./RecipeCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  matchPercentage: number;
  missingIngredientsCount: number;
  prepTime: number;
}

interface RecipeGridProps {
  recipes?: Recipe[];
  onRecipeClick?: (recipeId: string) => void;
}

const RecipeGrid = ({
  recipes = [],
  onRecipeClick = () => {},
}: RecipeGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-6 auto-rows-max">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          title={recipe.title}
          imageUrl={recipe.imageUrl}
          matchPercentage={recipe.matchPercentage}
          missingIngredientsCount={recipe.missingIngredientsCount}
          prepTime={recipe.prepTime}
          onClick={() => onRecipeClick(recipe.id)}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;
