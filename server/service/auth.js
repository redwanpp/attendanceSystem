const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')

const {findUserByProperty, creatNewUser} = require('./user');
const error = require('../util/error');

const registerService = async ({name, email, password, roles, accountStatus}) => {
    let user = await findUserByProperty('email', email);
        if (user) throw error('User already exists', 400);

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);

       return creatNewUser({name, email, password: hash, roles, accountStatus});
}

const loginService = async ({email, password}) => {
    const user = await findUserByProperty('email', email);
        if(!user) throw error('Invalid Credential', 400);
        
        const isValidPassword = await bcryptjs.compare(password, user.password);
        if(!isValidPassword) throw error('Invalid Credential', 400);

        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            accountStatus: user.accountStatus,
        }

        return jwt.sign(payload, 'secret-key', {expiresIn: '2h'} ); 
}

module.exports = {
    registerService,
    loginService
}