import RecipeHomeItem from "../RecipeHomeItem/RecipeHomeItem";
import useRequest from '../../hooks/useRequest'

export default function Home(
    {
        categoryName
    }) {

    let url = "data/recipes?sortBy=_createdOn%20desc";
    if (categoryName) {
        url = url + `&where=categoryName%3D"${categoryName}"`;
    }
    const { data: recipes } = useRequest(url, []);  

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