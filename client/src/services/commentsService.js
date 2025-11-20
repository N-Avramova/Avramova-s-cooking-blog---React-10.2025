const baseUrl = 'http://localhost:3030';

export async function fetchComments() {
    const response = await fetch(`${baseUrl}/jsonstore/comments`);
    const data = await response.json();
    return Object.values(data);
}