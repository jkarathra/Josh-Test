import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Ingredient {
  name: string;
  id: string;
}

interface IngredientListProps {
  ingredients?: Ingredient[];
  onRemove?: (id: string) => void;
}

const defaultIngredients: Ingredient[] = [
  { name: "Tomatoes", id: "1" },
  { name: "Onions", id: "2" },
  { name: "Garlic", id: "3" },
  { name: "Chicken", id: "4" },
  { name: "Rice", id: "5" },
];

const IngredientList = ({
  ingredients = defaultIngredients,
  onRemove = () => {},
}: IngredientListProps) => {
  return (
    <div className="w-[360px] h-[800px] bg-background border rounded-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Your Ingredients</h3>
        <span className="text-sm text-muted-foreground">
          {ingredients.length} items
        </span>
      </div>

      <ScrollArea className="h-[720px] pr-4">
        <div className="space-y-2">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="flex items-center justify-between p-3 bg-card rounded-lg border"
            >
              <span className="text-sm font-medium">{ingredient.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => onRemove(ingredient.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default IngredientList;
