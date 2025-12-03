const baseUrl = 'http://localhost:3030';

export async function fetchComments() {
    const response = await fetch(`${baseUrl}/jsonstore/comments`);
    const data = await response.json();
    return Object.values(data);
}

export async function fetchNotApprovedComments() {
    const response = await fetch(`${baseUrl}/jsonstore/comments`);
    const data = await response.json();
    const allComments = Object.values(data);
    const notApprovedComments = allComments.filter(c => !c.isApproved);
    return notApprovedComments;
}

export async function createComment(data) {
    const response = await fetch(`${baseUrl}/jsonstore/comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
}
