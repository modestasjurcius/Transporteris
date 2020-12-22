var users = [
    {
        id: 0,
        login: 'admin',
        password: 'admin',
        firstName: 'Admin',
        lastName: 'Administratorius',
        email: 'admin@transporteris.lt',
        isVerified: true,
        isAdmin: true
    },
    {
        id: 1,
        login: 'client',
        password: 'client',
        firstName: 'Petras',
        lastName: 'Petraitis',
        email: 'p.petraitis@vgtu.lt',
        isVerified: true,
        isAdmin: false
    },
    {
        id: 2,
        login: 'client1',
        password: 'client1',
        firstName: 'Jonas',
        lastName: 'Jonaitis',
        email: 'j.jonaitis@vgtu.lt',
        isVerified: false,
        isAdmin: false
    }
];

var currentUser = null;

export function setCurrentUser(user) {
    currentUser = user;
}

export function getCurrentUser() {
    return currentUser;
}

export function findUser(login, password) {
    var user = users.find(u => u.login === login && u.password === password);
    if(!user && login === 'c')
        user = users.find(u => u.login === 'client');
    else if(!user)
        user = users.find(u => u.login === 'admin');

    return user;
}

export function getUserById(id) {
    return users.find(u => u.id === id);
}

export function getUserFullNameById(id) {
    const user = users.find(u => u.id === id);
    return user.firstName + ' ' + user.lastName;
}

var lastUserId = 2;
export function addUser(user) {
    lastUserId += 1;
    user.id = lastUserId;
    users.push(user);
    return true;
}

export function getNotVerifiedUsers() {
    return users.filter(u => !u.isVerified);
}

export function verifyUserById(id) {
    const uId = users.findIndex(u => u.id === id);
    users[uId].isVerified = true;
    return true;
}