const tasks = require('../data/tasks.json');
const users = require('../data/users.json');
const { PubSub } = require('graphql-subscriptions');
const pubSub = new PubSub();

const TOPICS = {
    TASK_ADDED: 'TASK_ADDED',
    USER_ADDED: 'USER_ADDED'
};

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
        users.push(input);
        pubSub.publish(TOPICS.USER_ADDED, { userAdded: input });
        return input;
    },
    createTask: (root, { input }, { user }) => {
        // Add authorization
        /*if (!user) {
            throw new Error('Unauthorized');
        }*/
        tasks.push(input);
        pubSub.publish(TOPICS.TASK_ADDED, { taskAdded: input });
        return input;
    }
};

/* Subscriptions */

const Subscription = {
    taskAdded: {
        subscribe: (_root, _args, { user }) => {
            /*if (!user) {
                throw new Error('Unauthorized');
            }*/
            return pubSub.asyncIterator(TOPICS.TASK_ADDED);
        }
    },
    userAdded: {
        subscribe: () => pubSub.asyncIterator(TOPICS.USER_ADDED)
    }
};

module.exports = { Query, User, Task, Mutation, Subscription };