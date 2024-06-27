// exampleRecipes.ts
import { Recipe } from './types';

const exampleRecipes: Recipe[] = [
  {
      name: 'Beef and Mustard Pie',
      image: require('@/assets/images/beef_pie.jpg'),
      details: '1kg Beef, 2 tbs Plain Flour, 2 tbs Rapeseed Oil, 400ml Beef Stock',
      time: '35 Mins',
      servings: '3 Servings',
      calories: '103 Cal',
      difficulty: 'Easy',
      ingredients: ['1kg Beef', '2 tbs Plain Flour', '2 tbs Rapeseed Oil', '400ml Beef Stock'],
      steps: ['Preheat oven to 200°C', 'Mix ingredients', 'Bake for 45 mins'],
      isFavorite: false
  },
  {
      name: 'Beef and Oyster Pie',
      image: require('@/assets/images/oyster_pie.jpg'),
      details: '1kg Beef, 2 tbs Plain Flour, 2 tbs Rapeseed Oil, 400ml Beef Stock',
      time: '40 Mins',
      servings: '04 Servings',
      calories: '120 Cal',
      difficulty: 'Medium',
      ingredients: ['1kg Beef', '2 tbs Plain Flour', '2 tbs Rapeseed Oil', '400ml Beef Stock'],
      steps: ['Preheat oven to 200°C', 'Mix ingredients', 'Bake for 45 mins'],
      isFavorite: false
  }
];

export { exampleRecipes };
