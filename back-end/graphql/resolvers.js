const tasks = require('../data/tasks.json');
const users = require('../data/users.json');

const Query = {
    message: () => "Hello World!",
    tasks: () => tasks
};

const Task = {
    assignedTo: (task) => users.find(user => user.id === task.assignedTo),
    createdBy: (task) => users.find(user => user.id === task.createdBy)
}

module.exports = { Query, Task };