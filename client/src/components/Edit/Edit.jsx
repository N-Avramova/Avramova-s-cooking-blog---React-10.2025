import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchRecipeById } from "../../services/recipeService";

export default function Edit({ onSave, onCancel }) {
  
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const [recipeData, setRecipeData] = useState({});  

     useEffect(() => {
            const recipeData = async () => {
                const recipesData = await fetchRecipeById(recipeId);
                setRecipeData(recipesData);
            }
            recipeData();
        }, [recipeId]);

  const [form, setForm] = useState({
    title: recipeData.title,
    date: recipeData.date,
    imageUrl: recipeData.imageUrl,
    summary: recipeData.summary,
    timeToCook: recipeData.timeToCook,
    ingredients: recipeData.ingredients,
    category: {
      name: recipeData.category?.name,
      description: recipeData.category?.description,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      category: { ...form.category, [name]: value },
    });
  };

  const handleIngredientChange = (index, value) => {
    const updated = [...form.ingredients];
    updated[index] = value;
    setForm({ ...form, ingredients: updated });
  };

  const addIngredient = () => {
    setForm({ ...form, ingredients: [...form.ingredients, ""] });
  };

  const removeIngredient = (index) => {
    const updated = form.ingredients.filter((_, i) => i !== index);
    setForm({ ...form, ingredients: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        {/* Image URL + Preview */}
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />

          {form.imageUrl && (
            <img
              src={form.imageUrl}
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
            value={form.summary}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded h-28"
          />
        </div>

        {/* Time To Cook */}
        <div>
          <label className="block font-medium">Time to Cook</label>
          <input
            type="text"
            name="timeToCook"
            value={form.timeToCook}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block font-medium">Ingredients</label>

          <div className="space-y-2 mt-2">
            {form.ingredients?.map((ing, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={ing}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  className="flex-1 p-2 border rounded"
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
          <label className="block font-medium">Category Name</label>
          <input
            type="text"
            name="name"
            value={form.category.name}
            onChange={handleCategoryChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Category Description</label>
          <textarea
            name="description"
            value={form.category.description}
            onChange={handleCategoryChange}
            className="w-full mt-1 p-2 border rounded h-24"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}
