const tasks = require('../data/tasks.json');
const users = require('../data/users.json');

/* Queries */

const Query = {
    message: () => "Hello World!",
    task: (root, { id }) => tasks.find(task => task.id === id), 
    tasks: () => tasks,
    user: (root, { id }) => users.find(user => user.id === id),
    users: () => users
};

const User = {
    tasks: (user) => tasks.filter(task => task.assignedTo === user.id)
}

const Task = {
    assignedTo: (task) => users.find(user => user.id === task.assignedTo),
    createdBy: (task) => users.find(user => user.id === task.createdBy)
}

/* Mutations */

const Mutation = {
    createUser: (root, { input }, { user }) => {
        if (!user) {
            throw new Error('Unauthorized');
        }
        console.log(`user: ${JSON.stringify(user)}`);
        users.push(input);
        return input;
    },
    createTask: (root, { input }, { user }) => {
        if (!user) {
            throw new Error('Unauthorized');
        }
        console.log(`user: ${JSON.stringify(user)}`);
        tasks.push(input);
        return input;
    }
};

module.exports = { Query, User, Task, Mutation };