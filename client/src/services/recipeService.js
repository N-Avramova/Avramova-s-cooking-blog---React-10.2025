const baseUrl = 'http://localhost:3030';

export async function fetchRecipes() {
    const response = await fetch(`${baseUrl}/jsonstore/recipes`);
    const data = await response.json();
    return Object.values(data);
}

export async function fetchRecipeById(recipeId) {
    const response = await fetch(`${baseUrl}/jsonstore/recipes/${recipeId}`);
    const data = await response.json();
    return data;
}

export async function fetchRecipyByCategory(categoryName) {
    const recipesData = await fetchRecipes();
    const filteredRecipes = recipesData.filter(recipe => recipe.category && recipe.category.name && recipe.category.name.trim().toLowerCase() === categoryName.trim().toLowerCase());
    return filteredRecipes;
}

export async function fetchDistinctCategories() {
    const recipes = await fetchRecipes();
    const categories = Array.from(
        recipes
            .reduce((map, recipe) => {
                const key = recipe.category && recipe.category.name ? recipe.category.name.trim().toLowerCase() : null;
                if (key && !map.has(key)) {
                    map.set(key, recipe.category);
                }
                return map;
            }, new Map())
            .values()
    );
    return categories;
}

export async function deleteRecipe(recipeId) {
    const recipes = await fetchRecipes();
    return recipes.filter((item) => item.recipeId !== recipeId);
}