import { useParams, useNavigate, Link } from "react-router";
import DetailsComments from "../Details/details-comments/DetailsComments";
import CreateComment from "../Details/create-comment/CreateComments";
import useRequest from '../../hooks/useRequest';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function Details() {
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    let url = `data/recipes?where=_id%3D"${recipeId}"`;
    const { data: recipeDataValue, requestData } = useRequest(url, []);
    const recipeData = recipeDataValue[0] === undefined ? {} : recipeDataValue[0];

    const deleteRecipeHandler = async () => {
        const isConfirmed = confirm(`Are you sure you want to delete recipe: ${recipeData.title}`);

        if (!isConfirmed) {
            return;
        }

        const deleteUrl = `data/recipes/${recipeId}`;
        await requestData(deleteUrl, 'DELETE');      
        navigate('/');
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
                        {recipeData.categoryName}
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

                <DetailsComments recipeId={recipeData._id} />
                {
                    user && <CreateComment />
                }
                {
                    user && (user._id === recipeData._ownerId) && (
                        <div className="flex justify-center gap-4 mt-6">                           
                            <Link
                                to={`/${recipeData._id}/edit`}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow">
                                Edit
                            </Link>
                            <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700" onClick={deleteRecipeHandler}>Delete</button>
                        </div>
                    )
                }
            </div>
        </>
    )
}