const express = require('express');

const connectDB = require('./dbs');
const authenticate = require('./middleware/authenticate');
const routes = require('./routes/index');

const app = express();

app.use(express.json());

app.use(routes);

app.get('/private', authenticate, (req, res) => {
    console.log('I am user', req.user);

    return res.status(200).json({message: 'This is a private route'});
})

app.get('/public', (req, res) => {
    return res.status(200).json({message: 'This is a public route'});
})

app.get('/', (_req, res) => {
    const obj = {
        name: 'Ayaman',
        email: 'aymna@gmail.com',
    };
    res.json(obj);
});



app.use((err, _req, res, _next) => {
    const message = err.message ? err.message : 'Internal Server Error';
    const status = err.status ? err.status: 500;
    res.status(status).json({message});
})

connectDB('mongodb://localhost:27017/attendance-db').then(() => {
    console.log('[*] Database connected');
    app.listen(4000, () => {
        console.log('[*] I am listening on port 4000.......');
    });
}).catch ((e) => {
    console.log(e);
});