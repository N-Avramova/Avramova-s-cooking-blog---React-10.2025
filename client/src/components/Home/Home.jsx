import { useEffect, useState } from "react";
import RecipeHomeItem from "../RecipeHomeItem/RecipeHomeItem";
import { fetchRecipes } from "../../services/recipeService";

export default function Home() {
    const [recipes, setRecipes] = useState([]);
   useEffect(() => {
       const allRecipes = async () => {
           const recipesData = await fetchRecipes();
           setRecipes(recipesData);
       }
       allRecipes();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 items-center justify-center min-h-screen">
       { recipes.map(recipe => 
          <div className="w-4/5 mx-auto">
            <RecipeHomeItem 
              key={recipe._id}    
              title={recipe.title}
               imageUrl={recipe.imageUrl} 
               category={recipe.category}
               description={recipe.summary}
               timeToCook={recipe.timeToCook}    
           />
          </div>
       )
       }
    </div>
  )
}