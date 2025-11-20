const baseUrl = 'http://localhost:3030';

export async function fetchRecipes() {
    const response = await fetch(`${baseUrl}/jsonstore/recipes`);
    const data = await response.json();
    return Object.values(data);
}