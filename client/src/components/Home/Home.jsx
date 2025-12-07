import { useEffect } from "react";
import RecipeHomeItem from "../RecipeHomeItem/RecipeHomeItem";
import useRequest from '../../hooks/useRequest'

export default function Home(
    {
        categoryName
    }) {

   const { data: recipes } = useRequest('data/recipes?sortBy=_createdOn%20desc',[]);

    useEffect(() => {
        // const getRecipes = async () => {
        //     const response = await fetch('http://localhost:3030/data/recipes', {
        //         method: 'GET',
        //         headers: {
        //             'content-type': 'application/json',
        //         },
        //         //body: JSON.stringify({ email, password }),
        //     });

        //     const result = await response.json();
        //     console.log(result);
        // }

        // getRecipes();

        // const allRecipes = async () => {
        //     let recipesData = {};
        //     if (categoryName) {// && Object.keys(category).length > 0 && category[0].get('c') !== null) {
        //         recipesData = await fetchRecipyByCategory(categoryName);                
        //     }
        //     else {
        //         recipesData = await fetchRecipes();
        //     }

        //     recipesData.sort((a, b) => new Date(b._createdOn) - new Date(a._createdOn));
        //     setRecipes(recipesData);
        //     const allComments = await fetchComments();
        //     const commentCountsMap = {};
        //     recipesData.forEach(recipe => {
        //         commentCountsMap[recipe._id] = allComments.filter(comment => comment.recipeId === recipe._id).length;
        //     });
        //     setCommentCounts(commentCountsMap);
        // }
        // allRecipes();
    }, [categoryName]);

    return (
        <div className="grid grid-cols-1 gap-4 items-center justify-center min-h-screen">
            {recipes?.map(recipe =>
                <div className="w-4/5 mx-auto">
                    <RecipeHomeItem
                        key={recipe._id}
                        recipeId={recipe._id}
                        title={recipe.title}
                        imageUrl={recipe.imageUrl}
                        category={recipe.category?.name}
                        description={recipe.summary}
                        timeToCook={recipe.timeToCook}
                        createdOnValue={recipe._createdOn}
                        commentCount={0}
                    />
                </div>
            )
            }
        </div>
    )
}