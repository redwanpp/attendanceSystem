const User = require('../models/User');
const userService = require('../service/user')
const authService = require('../service/auth');
const error = require('../util/error');
const { trace, use } = require('../routes/users');

const getUsers = async (_req, res, next) => {
    try {
        const users = await userService.findUsers();

        if(!users) {
            return res.status(404).json({message: 'users not found'});
        }

        return res.status(200).json(users);
    } catch (e) {
        next(e);
    }
}
const getUserById = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const user = await userService.findUserByProperty('_id', userId);

        if(!user) {
            throw error('User not found', 404);
        }

        return res.status(200).json({user});
    } catch (e) {
        next(e);
    }
}
const postUser = async (req, res, next) => {
    const {name, email, password, roles, accountStatus} = req.body;

    try {
        const user = await authService.registerService({
            name,
            email,
            password,
            roles,
            accountStatus
        });
        return res.status(201).json(user);
    } catch (e) {
        next(e);
    }
};
    
const deleteUserById = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const user = await userService.findUserByProperty('_id', userId);

        if(!user) {
            throw error('User Not Found', 404);
        }
        console.log(user);
        await user.deleteOne();
        return res.status(203).send();
    } catch (e) {
        console.log(e);
        next(e);
    }
}

const putUserById = async (req, res, next) => {
    const userId = req.params.userId;
    const {name, email, roles, accountStatus} = req.body;

    try {
        const user = await userService.updateUser(userId, {name, email, roles, accountStatus});

        if(!user) {
            throw error('User Not Found');
        }

        return res.status(200).json(user);
    } catch (e) {
        next(e);        
    }
}

const patchUserById = async (req, res, next) => {
    const userId = req.params.userId;
    const {name, roles, accountStatus} = req.body;

    try {
        const user = await userService.findUserByProperty('_id', userId);

        if(!user) {
            throw error('User Not Found');
        }

        user.name = name ?? user.name;
        user.roles = roles ?? user.roles;
        user.accountStatus = accountStatus ?? user.accountStatus;

        await user.save();

        return res.status(200).json(user);
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUserById,
    patchUserById,
    deleteUserById
}