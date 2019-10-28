const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const md5 = require('md5');

const getUsers = require('./getUsers');
const addUser = require('./addUser');


app.use(bodyParser.json());
app.use(expressJwt({ secret: 'accessKey' }).unless({ path: ['/api/auth'] }));

app.get('/', function (req, res) {
    res.send('Angular Netcracker App API Server')
});

app.post('/api/auth', (req, res) => {
    const body = req.body;

    getUsers.getUsersFunc(function (items) {
        const user = items.find(user => user.username === body.username);

        if (!user) {
            return res.send({ error: 'Could not authenticate: there is no user with this name!' });
        }
        if (!user || md5(body.password) !== user.password) return res.send({ error: 'Could not authenticate: password is incorrect!' });
        let token = jwt.sign({ username: user.username }, 'accessKey', { expiresIn: '2h' });

        res.send({ token });
    });

});

app.get('/api/getUsers', (req, res) => {
    getUsers.getUsersFunc(function (items) {
        items.map(user => {
            delete user.password;
            delete user._id;
            // user.birthday = String(user.birthday.getDate()).padStart(2, '0') + '-' + String(user.birthday.getMonth()).padStart(2, '0') + '-' + user.birthday.getFullYear();
        });

        res.send(items);
    });
});

app.post('/api/addUser', (req, res) => {
    let body = req.body;

    getUsers.getUsersFunc(function(items) {
        const user = items.find(user => user.username === body.username);

        if(!!user) {
            console.log('Could not sign up: user with this name already exists!');
            return;
        }

        let newUser = {
            username: body.username,
            password: md5(body.password),
            birthday: body.birthday,
            position: body.position
        };

        try {
            addUser(newUser);

            items.map(user => {
                delete user.password;
                delete user._id;
            });
            items.push(newUser)
        } catch (e) {
            console.log(e);
        }

        res.send(items);
    });
});

app.listen(4000, function () {
    console.log('Netcracker App API Server listening on port 4000!');
});
