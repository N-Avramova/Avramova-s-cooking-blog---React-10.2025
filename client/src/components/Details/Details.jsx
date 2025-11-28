import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchRecipeById } from "../../services/recipeService";
import DetailsComments from "../Details/details-comments/DetailsComments";
import CreateComment from "../Details/create-comment/CreateComments";

export default function Details(
    {
        userId
    }
) {
    const { recipeId } = useParams();
    const [recipeData, setRecipeData] = useState({});
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const recipeData = async () => {
            const recipesData = await fetchRecipeById(recipeId);
            setRecipeData(recipesData);
        }
        recipeData();
    }, [recipeId]);

    const commentRefreshHandler = () => {
        setRefresh(state => !state);
    }

    return (
        <>
            <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">

                {/* <!-- Title --> */}
                <h1 class="text-3xl font-bold text-gray-800 mb-4">{recipeData.title}</h1>

                {/* <!-- Main Image --> */}
                <img
                    src={recipeData.imageUrl}
                    alt="Recipe Image"
                    class="w-full h-64 object-cover rounded-lg mb-6"
                />

                {/* <!-- Meta info --> */}
                <div class="flex items-center space-x-4 text-gray-500 text-sm mb-6">
                    <span class="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-md mb-3">
                        {recipeData.category?.name}
                    </span>
                    <span>⏱️ {recipeData.timeToCook}</span>

                </div>

                {/* Ingredients */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Ingredients</h2>
                    {Array.isArray(recipeData.ingredients) && recipeData.ingredients.length > 0 ? (
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            {recipeData.ingredients.map((ingredient, idx) => (
                                <li key={idx}>{ingredient}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No ingredients available.</p>
                    )}
                </div>

                {/* Description */}
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">Instructions</h2>
                    <p class="text-gray-700 leading-relaxed">
                        {recipeData.summary}
                    </p>
                </div>

                <DetailsComments recipeId={recipeData._id} refresh={refresh} />
                <CreateComment onCreate={commentRefreshHandler} />
                {
                    userId && (
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                type="button"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow"
                                onClick={() => { /* TODO: implement edit action (navigate/open form) */ }}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow"
                                onClick={() => { /* TODO: implement delete action (confirm & delete) */ }}
                            >
                                Delete
                            </button>
                        </div>
                    )
                }

            </div>
        </>
    )
}