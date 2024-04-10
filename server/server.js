const express = require('express');
const bcryptjs = require('bcryptjs');

const connectDB = require('./dbs');
const User = require('./models/User');

const app = express();

app.use(express.json());


app.post('/register', async (req, res, next) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({message: "Invalid Data"});
    }

    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: 'User already exists'});
        }

        user = new User({name, email, password});

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        await user.save();

        return res.status(201).json({message:'User creates successfully', user});
    } catch (e) {
        next(e);
    }
});

app.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({message: 'Invalid Credential'});
        }

        const isValidPassword = await bcryptjs.compare(password, user.password);
        if(!isValidPassword) {
            return res.status(400).json({message: 'Invalid Credential'});
        }

        delete user.password;

        return res.status(200).json({message: 'Login Successfull', user});
    } catch (e) {
        next(e);
    }
}) 

app.get('/', (_, res) => {
    const obj = {
        name: 'Ayaman',
        email: 'aymna@gmail.com',
    };
    res.json(obj);
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({message: 'Internal Server Error'});
})

connectDB('mongodb://localhost:27017/attendance-db').then(() => {
    console.log('[*] Database connected');
    app.listen(4000, () => {
        console.log('[*] I am listening on port 4000.......');
    });
}).catch ((e) => {
    console.log(e);
});