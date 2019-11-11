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
            res.send({ users: items, message: 'Error! User with this name is already existed!' });
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

        res.send({ users: items, message: undefined });
    });
});

app.get('/api/getIncidents', (req, res) => {
    res.send([
            {
                id: 1,
                name: 'Breakdown of coloring instrument',
                assignee: '',
                area: 'Coloring',
                startDate: new Date(2019, 11, 7),
                dueDate: new Date(2019, 11, 14),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                priority: 'Normal',
                status: 'Opened'
            }, {
                id: 2,
                name: 'Primer was spilled',
                assignee: '',
                area: 'Primer',
                startDate: new Date(2019, 11, 6),
                dueDate: new Date(2019, 11, 8),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                priority: 'Minor',
                status: 'Closed'
            }, {
                id: 3,
                name: 'Disaster',
                assignee: 'Daniil Sirozh',
                area: 'Assembling',
                startDate: new Date(2019, 11, 9),
                dueDate: new Date(2019, 11, 10),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                priority: 'Major',
                status: 'Needed info'
            }
        ])
    /* getUsers.getUsersFunc(function (items) {
        items.map(user => {
            delete user.password;
            delete user._id;
            // user.birthday = String(user.birthday.getDate()).padStart(2, '0') + '-' + String(user.birthday.getMonth()).padStart(2, '0') + '-' + user.birthday.getFullYear();
        });

        res.send(items);
    }); */
});

app.post('/api/addIncident', (req, res) => {
    console.log(req.body);
    res.send([
        {
            id: 1,
            name: 'Breakdown of coloring instrument',
            assignee: '',
            area: 'Coloring',
            startDate: new Date(2019, 11, 7),
            dueDate: new Date(2019, 11, 14),
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            priority: 'Normal',
            status: 'Opened'
        }, {
            id: 2,
            name: 'Primer was spilled',
            assignee: '',
            area: 'Primer',
            startDate: new Date(2019, 11, 6),
            dueDate: new Date(2019, 11, 8),
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            priority: 'Minor',
            status: 'Closed'
        }, {
            id: 3,
            name: 'Disaster',
            assignee: 'Daniil Sirozh',
            area: 'Assembling',
            startDate: new Date(2019, 11, 9),
            dueDate: new Date(2019, 11, 10),
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            priority: 'Major',
            status: 'Needed info'
        }, req.body.incident
    ])
});

app.listen(4000, function () {
    console.log('Netcracker App API Server listening on port 4000!');
});
