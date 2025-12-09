import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useRequest from '../../hooks/useRequest';
import useForm from "../../hooks/useForm";

export default function Edit() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { requestData } = useRequest();

  const editRecipeHandler = async (values) => {
    let data = values;
    if (!Array.isArray(values.ingredients)) {
      data = {
        ...values,
        ingredients: values.ingredients.split(",")
      }
    }
    try {
      await requestData(`data/recipes/${recipeId}`, 'PUT', data);

      navigate(`/details/${recipeId}`);
    } catch (err) {
      alert(err.message);
    }
  }

  const {
    registerValueData,
    formActionHandler,
    setValues
  } = useForm(editRecipeHandler, {
    title: "",
    imageUrl: "",
    summary: "",
    timeToCook: "",
    ingredients: "",
    categoryName: "",
  });

  useEffect(() => {
    requestData(`data/recipes/${recipeId}`)
      .then(result => {
        setValues(result);
      })
      .catch(err => {
        alert(err.message);
      })
  }, [recipeId, setValues]);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>

      <form action={formActionHandler} className="space-y-6">

        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            {...registerValueData("title")}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        {/* Image URL + Preview */}
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            {...registerValueData("imageUrl")}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        {/* Summary */}
        <div>
          <label className="block font-medium">Summary</label>
          <textarea
            name="summary"
            {...registerValueData("summary")}
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
            {...registerValueData("timeToCook")}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block font-medium">Ingredients</label>

          <div className="space-y-2 mt-2">
            <textarea
              name="ingredients"
              {...registerValueData("ingredients")}
              className="w-full mt-1 p-2 border rounded h-28"
              required
              placeholder="Please, add ingredients separate with comma"
            />
          </div>

        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <select
            name="categoryName"
            {...registerValueData("categoryName")}
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
        <div className="flex justify-center gap-4 mt-6"> 
          <button
            value="Edit Recipe"
            type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate(`/details/${recipeId}`)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
