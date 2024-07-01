export type Recipe = {
    id?: string;
    name: string;
    details: string[];
    time: string;
    servings: string;
    calories: string;
    difficulty: string;
    ingredients: string[];
    steps: string[];
    categories: string[];
    isFavorite?: boolean;
    image: string; 
  };
  