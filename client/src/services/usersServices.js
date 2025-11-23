const baseUrl = 'http://localhost:3030';

export async function fetchUsersByUserIds(usersIds) {
    const response = await fetch(`${baseUrl}/jsonstore/users`);
    const data = await response.json();
    const usersArray = Object.values(data);
    const filteredUsers = usersArray.filter(user => usersIds.includes(user._id));
    return filteredUsers; //Object.values(data);
}