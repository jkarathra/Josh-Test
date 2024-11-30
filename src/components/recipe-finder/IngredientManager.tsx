import React, { useState } from "react";
import IngredientSearch from "./IngredientSearch";
import IngredientList from "./IngredientList";

interface Ingredient {
  name: string;
  id: string;
}

interface IngredientManagerProps {
  onIngredientsChange?: (ingredients: Ingredient[]) => void;
  initialIngredients?: Ingredient[];
}

const defaultIngredients: Ingredient[] = [
  { name: "Tomatoes", id: "1" },
  { name: "Onions", id: "2" },
  { name: "Garlic", id: "3" },
];

const IngredientManager = ({
  onIngredientsChange = () => {},
  initialIngredients = defaultIngredients,
}: IngredientManagerProps) => {
  const [ingredients, setIngredients] =
    useState<Ingredient[]>(initialIngredients);

  const handleAddIngredient = (ingredientName: string) => {
    if (
      ingredients.some(
        (ing) => ing.name.toLowerCase() === ingredientName.toLowerCase(),
      )
    ) {
      return;
    }

    const newIngredient = {
      name: ingredientName,
      id: Math.random().toString(36).substr(2, 9),
    };
    const updatedIngredients = [...ingredients, newIngredient];
    setIngredients(updatedIngredients);
    onIngredientsChange(updatedIngredients);
  };

  const handleRemoveIngredient = (id: string) => {
    const updatedIngredients = ingredients.filter((ing) => ing.id !== id);
    setIngredients(updatedIngredients);
    onIngredientsChange(updatedIngredients);
  };

  return (
    <div className="w-[400px] min-h-screen bg-secondary/5 border-r border-primary/10 p-6 flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Ingredient Manager
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Add ingredients you have available to find matching recipes.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block text-primary/80">
            Search and add ingredients
          </label>
          <IngredientSearch onSelect={handleAddIngredient} />
        </div>

        <div className="flex-1">
          <IngredientList
            ingredients={ingredients}
            onRemove={handleRemoveIngredient}
          />
        </div>
      </div>
    </div>
  );
};

export default IngredientManager;
