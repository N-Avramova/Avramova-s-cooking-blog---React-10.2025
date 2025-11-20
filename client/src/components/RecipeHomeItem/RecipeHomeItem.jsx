import { Link } from "react-router";

export default function RecipeHomeItem(
    {
        title,
        imageUrl,
        category,
        description,
        timeToCook,
        commentCount
    }
) {

    return (

        <div className="main-content w-4/5 mx-auto">
            <img
                src={imageUrl}
                alt="Recipe Image"
                class="w-full h-80 object-cover"
            />

            <div class="p-5">

                {/* <!-- Category Badge --> */}
                <span class="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-md mb-3">
                    {category}
                </span>

                <h2 class="text-xl font-semibold text-gray-800 mb-2">
                    {title}
                </h2>

                <p class="text-gray-600 text-sm mb-4">
                    {description}
                </p>

                <div class="flex items-center justify-between mb-3">
                    <span class="text-sm text-gray-500">⏱️ {timeToCook}</span>

                    {/* <!-- Comments --> */}
                    <span class="text-sm text-gray-500">💬 {commentCount} comments</span>
                </div>

                <Link
                    to="/details"
                    class="inline-block w-full text-center px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-colors text-sm font-medium"
                >
                    View Recipe
                </Link>
            </div>
        </div>

    )
}
