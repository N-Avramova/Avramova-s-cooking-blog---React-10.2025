import { useState } from "react";
import { useNavigate } from "react-router";
import useRequest from '../../hooks/useRequest';

export default function CreateRecipe() {
    const navigate = useNavigate();
    const { requestData } = useRequest();

    const [newRecipe, setNewRecipe] = useState({
        title: "",
        date: "",
        imageUrl: "",
        summary: "",
        timeToCook: "",
        ingredients: [""],
        category: {
            name: "",
            description: "",
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe({ ...newRecipe, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe({
            ...newRecipe,
            category: { ...newRecipe.category, [name]: value },
        });
    };

    const handleIngredientChange = (index, value) => {
        const updated = [...newRecipe.ingredients];
        updated[index] = value;
        setNewRecipe({ ...newRecipe, ingredients: updated });
    };

    const addIngredient = () => {
        setNewRecipe({ ...newRecipe, ingredients: [...newRecipe.ingredients, ""] });
    };

    const removeIngredient = (index) => {
        const updated = newRecipe.ingredients.filter((_, i) => i !== index);
        setNewRecipe({ ...newRecipe, ingredients: updated });
    };

    const createRecipeHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const { image, ...newRecipe } = Object.fromEntries(formData);

        console.log(image);

        // if (imageUpload) {
        //     // upload image
        //     const imageRef = ref(storage, `images/${image.name}`);
        //     await uploadBytes(imageRef, image);
        //     newRecipe.imageUrl = await getDownloadURL(imageRef);
        // } else {
        //     newRecipe.imageUrl = image;
        // }
        
        newRecipe._createdOn = Date.now();

        try {
            await requestData('data/recipes', 'POST', newRecipe);

            navigate('/');
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Create New Recipe</h2>

            <form onSubmit={createRecipeHandler} className="space-y-6">

                {/* Title */}
                <div>
                    <label className="block font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={newRecipe.title}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </div>

                {/* Image URL + Preview */}
                <div>
                    <label className="block font-medium">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={newRecipe.imageUrl}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />

                    {newRecipe.imageUrl && (
                        <img
                            src={newRecipe.imageUrl}
                            alt="Preview"
                            className="mt-3 w-48 h-32 object-cover rounded border"
                        />
                    )}
                </div>

                {/* Summary */}
                <div>
                    <label className="block font-medium">Summary</label>
                    <textarea
                        name="summary"
                        value={newRecipe.summary}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded h-28"
                        required
                    />
                </div>

                {/* Time To Cook */}
                <div>
                    <label className="block font-medium">Time to Cook</label>
                    <input
                        type="text"
                        name="timeToCook"
                        value={newRecipe.timeToCook}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </div>

                {/* Ingredients */}
                <div>
                    <label className="block font-medium">Ingredients</label>

                    <div className="space-y-2 mt-2">
                        {newRecipe.ingredients.map((ing, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={ing}
                                    onChange={(e) =>
                                        handleIngredientChange(index, e.target.value)
                                    }
                                    className="flex-1 p-2 border rounded"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => removeIngredient(index)}
                                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    -
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addIngredient}
                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Ingredient
                    </button>
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium">Category</label>
                    <select
                        name="name"
                        value={newRecipe.category.name}
                        onChange={handleCategoryChange}
                        className="w-full mt-1 p-2 border rounded bg-white"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="soup">Soup</option>
                        <option value="sweet">Sweet</option>
                        <option value="main-course">Main Dish</option>
                        <option value="salad">Salad</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Create Recipe
                    </button>
                </div>
            </form>
        </div>
    );
}
