const baseUrl = 'http://localhost:3030';

export async function fetchUsersByUserIds(usersIds) {
    const response = await fetch(`${baseUrl}/jsonstore/users`);
    const data = await response.json();
    const usersArray = Object.values(data);
    const filteredUsers = usersArray.filter(user => usersIds.includes(user._id));
    return filteredUsers; //Object.values(data);
}

export async function fetchUserByEmail(email) {
    const response = await fetch(`${baseUrl}/jsonstore/users`);
    const data = await response.json();
    const usersArray = Object.values(data);
    const user = usersArray.find(user => user.email === email);
    return user?._id;
}  

export async function fetchAllUsers() {
    const response = await fetch(`${baseUrl}/jsonstore/users`);
    const data = await response.json();
    return Object.values(data);
}