import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface RecipeFiltersProps {
  onCuisineChange?: (cuisine: string) => void;
  onPrepTimeChange?: (time: number) => void;
  onMaxIngredientsChange?: (count: number) => void;
  selectedCuisine?: string;
  maxPrepTime?: number;
  maxAdditionalIngredients?: number;
}

const cuisineTypes = [
  "All",
  "Italian",
  "Mexican",
  "Chinese",
  "Indian",
  "Japanese",
  "Mediterranean",
  "American",
  "Thai",
  "French",
];

const RecipeFilters = ({
  onCuisineChange = () => {},
  onPrepTimeChange = () => {},
  onMaxIngredientsChange = () => {},
  selectedCuisine = "All",
  maxPrepTime = 60,
  maxAdditionalIngredients = 5,
}: RecipeFiltersProps) => {
  return (
    <div className="w-full h-[60px] bg-background border rounded-lg p-4 flex items-center gap-6">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Cuisine:</span>
        <Select value={selectedCuisine} onValueChange={onCuisineChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select cuisine" />
          </SelectTrigger>
          <SelectContent>
            {cuisineTypes.map((cuisine) => (
              <SelectItem key={cuisine} value={cuisine}>
                {cuisine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Max Prep Time:</span>
        <div className="w-[200px]">
          <Slider
            value={[maxPrepTime]}
            onValueChange={(value) => onPrepTimeChange(value[0])}
            max={120}
            step={5}
          />
        </div>
        <span className="text-sm text-muted-foreground w-16">
          {maxPrepTime} min
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Max Additional Ingredients:</span>
        <div className="w-[150px]">
          <Slider
            value={[maxAdditionalIngredients]}
            onValueChange={(value) => onMaxIngredientsChange(value[0])}
            max={10}
            step={1}
          />
        </div>
        <span className="text-sm text-muted-foreground w-8">
          {maxAdditionalIngredients}
        </span>
      </div>
    </div>
  );
};

export default RecipeFilters;
