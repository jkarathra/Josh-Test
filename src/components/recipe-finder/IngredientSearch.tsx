import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IngredientSearchProps {
  onSelect?: (ingredient: string) => void;
}

const ingredientsList = [
  // Proteins
  "Chicken Breast",
  "Ground Beef",
  "Salmon",
  "Eggs",
  "Tofu",
  "Shrimp",
  // Vegetables
  "Tomatoes",
  "Onions",
  "Garlic",
  "Bell Peppers",
  "Carrots",
  "Broccoli",
  "Spinach",
  "Potatoes",
  "Mushrooms",
  "Lettuce",
  // Pantry Items
  "Rice",
  "Pasta",
  "Flour",
  "Sugar",
  "Salt",
  "Black Pepper",
  "Olive Oil",
  "Soy Sauce",
  // Dairy
  "Milk",
  "Butter",
  "Cheese",
  "Yogurt",
  "Heavy Cream",
  // Herbs & Spices
  "Basil",
  "Oregano",
  "Thyme",
  "Cumin",
  "Paprika",
  "Cinnamon",
].sort();

const IngredientSearch = ({ onSelect = () => {} }: IngredientSearchProps) => {
  return (
    <Select
      onValueChange={(value) => {
        onSelect(value);
      }}
    >
      <SelectTrigger className="w-[360px]">
        <SelectValue placeholder="Select an ingredient" />
      </SelectTrigger>
      <SelectContent>
        {ingredientsList.map((ingredient) => (
          <SelectItem key={ingredient} value={ingredient}>
            {ingredient}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default IngredientSearch;
