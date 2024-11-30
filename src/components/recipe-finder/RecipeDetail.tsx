import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat, UtensilsCrossed } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Ingredient {
  name: string;
  have: boolean;
}

interface RecipeDetailProps {
  title?: string;
  imageUrl?: string;
  matchPercentage?: number;
  prepTime?: number;
  servings?: number;
  difficulty?: string;
  ingredients?: Ingredient[];
  instructions?: string[];
  onClose?: () => void;
}

const defaultIngredients: Ingredient[] = [
  { name: "Pasta", have: true },
  { name: "Eggs", have: true },
  { name: "Pecorino Romano", have: false },
  { name: "Guanciale", have: false },
  { name: "Black Pepper", have: true },
  { name: "Salt", have: true },
];

const defaultInstructions = [
  "Bring a large pot of salted water to boil.",
  "Cook pasta according to package instructions until al dente.",
  "While pasta cooks, whisk eggs and grated cheese in a bowl.",
  "Cook guanciale until crispy, then remove from heat.",
  "Drain pasta, reserving some pasta water.",
  "Combine pasta with egg mixture, adding pasta water as needed.",
  "Season with black pepper and serve immediately.",
];

const RecipeDetail = ({
  title = "Spaghetti Carbonara",
  imageUrl = "https://dummyimage.com/800x400/cccccc/666666&text=Recipe+Image",
  matchPercentage = 75,
  prepTime = 30,
  servings = 4,
  difficulty = "Medium",
  ingredients = defaultIngredients,
  instructions = defaultInstructions,
  onClose = () => {},
}: RecipeDetailProps) => {
  return (
    <div className="w-[800px] h-[600px] bg-background">
      <ScrollArea className="h-full">
        <div className="space-y-6 p-6">
          {/* Header */}
          <div className="space-y-4">
            <div
              className="w-full h-[400px] bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <h2 className="text-3xl font-semibold">{title}</h2>
          </div>

          {/* Recipe Stats */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{prepTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5" />
              <span>{servings} servings</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              <span>{difficulty}</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={matchPercentage} className="w-[100px] h-2" />
              <span className="text-sm">{matchPercentage}% match</span>
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Ingredients</h3>
            <div className="grid grid-cols-2 gap-3">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-card rounded-lg border"
                >
                  <span className="text-sm">{ingredient.name}</span>
                  <Badge
                    variant={ingredient.have ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {ingredient.have ? "Have" : "Need"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Instructions</h3>
            <ol className="space-y-4">
              {instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex gap-4 p-4 bg-card rounded-lg border"
                >
                  <span className="text-lg font-semibold text-muted-foreground">
                    {index + 1}
                  </span>
                  <p className="text-sm">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Close Button */}
          <div className="pt-4">
            <Button variant="secondary" className="w-full" onClick={onClose}>
              Close Recipe
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecipeDetail;
