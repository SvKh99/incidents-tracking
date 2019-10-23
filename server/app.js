const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const md5 = require('md5');

const getUsers = require('./getUsers');
const addUser = require('./addUser');


app.use(bodyParser.json());
app.use(expressJwt({ secret: 'accessKey' }).unless({ path: ['/api/auth', '/api/reg'] }));

app.get('/', function (req, res) {
    res.send('Angular Netcracker App API Server')
});

app.post('/api/auth', (req, res) => {
    const body = req.body;
    console.log(body);

    getUsers.getUsersFunc(function (items) {
        console.log(items);
        const user = items.find(user => user.username === body.username);

        if (!user) {
            return res.send({ error: 'Could not authenticate: there is no user with this name!' });
        }
        console.log(md5(body.password));
        if (!user || md5(body.password) !== user.password) return res.send({ error: 'Could not authenticate: password is incorrect!' });
        console.log({ username: user.username });
        let token = jwt.sign({ username: user.username }, 'accessKey', { expiresIn: '2h' });
        console.log(token);

        res.send({ token });
    });

});

app.post('/api/reg', (req, res) => {
    getUsers.getUsersFunc(function(items) {
        const user = items.find(user => user.username === body.username);

        if(!!user) {
            return res.send({ error: 'Could not register: user with this name already exists!' });
        }

        let username = body.username;
        let newUser = {
            username: username,
            password: md5(body.password),
            birthday: body.birthday,
            position: body.position
        };

        addUser(newUser);
        let token = jwt.sign({ username: username }, 'accessKey', { expiresIn: '2h' });

        res.send({ token });
    });
});

app.listen(4000, function () {
    console.log('Netcracker App API Server listening on port 4000!');
});
