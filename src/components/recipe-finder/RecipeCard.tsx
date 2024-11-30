import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Plus } from "lucide-react";

interface RecipeCardProps {
  title?: string;
  imageUrl?: string;
  matchPercentage?: number;
  missingIngredientsCount?: number;
  prepTime?: number;
  onClick?: () => void;
}

const RecipeCard = ({
  title = "Spaghetti Carbonara",
  imageUrl = "https://dummyimage.com/340x200/cccccc/666666&text=Recipe+Image",
  matchPercentage = 75,
  missingIngredientsCount = 2,
  prepTime = 30,
  onClick = () => {},
}: RecipeCardProps) => {
  return (
    <Card className="w-[340px] h-[400px] bg-background overflow-hidden hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/20">
      <div
        className="w-full h-[200px] bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <CardContent className="p-4 space-y-4">
        <h3 className="text-xl font-semibold line-clamp-2 text-primary/90">
          {title}
        </h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary/80">Match</span>
            <span className="text-sm text-muted-foreground">
              {matchPercentage}%
            </span>
          </div>
          <Progress value={matchPercentage} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{prepTime} min</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Plus className="h-4 w-4" />
            <span>{missingIngredientsCount} ingredients needed</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant="secondary"
          className="w-full hover:bg-primary/10"
          onClick={onClick}
        >
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
