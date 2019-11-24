const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const md5 = require('md5');

const getUsers = require('./getUsers');
const addUser = require('./addUser');
const getIncidents = require('./getIncidents');
const addIncident = require('./addIncident');
const editIncident = require('./editIncident');

function quickSearchByID(search, arr){
    if (search === arr[0].id) return 0;
    if (search === arr[arr.length - 1].id) return arr.length - 1;

    for (var x1 = 0, mid, x2 = arr.length; x1 < x2;){
        mid = x2 + x1 - 1 >> 1;
        if (arr[mid].id > search) x2 = mid;
        else x1 = mid + 1;
    }
    return (x1 %= arr.length) && arr[x1 -= 1].id === search ? x1 : -1;
}

app.use(bodyParser.json());
app.use(expressJwt({ secret: 'accessKey' }).unless({ path: ['/api/auth', '/api/refreshToken'] }));

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

        res.send({ token, username: user.username });
    });
});

app.post('/api/refreshToken', (req, res) => {
    let token = jwt.sign({ username: res.username }, 'accessKey', { expiresIn: '2h' });

    res.send({ token });
});

app.get('/api/getUsers', (req, res) => {
    getUsers.getUsersFunc(function (items) {
        items.map(user => {
            delete user.password;
            delete user._id;
        });

        res.send({ users: items });
    });
});

app.post('/api/addUser', (req, res) => {
    let newUser = req.body.newUser;

    getUsers.getUsersFunc(function(items) {
        const user = items.find(user => user.username === newUser.username);

        if(!!user) {
            res.send({ users: items, message: 'Error! User with this name is already existed!' });
            return;
        }
        let newUserWithPassword = {
            username: newUser.username,
            password: md5(newUser.password),
            birthday: newUser.birthday,
            position: newUser.position,
            areas: newUser.areas
        };

        try {
            addUser(newUserWithPassword);

            items.map(user => {
                delete user.password;
                delete user._id;
            });
            items.push(newUserWithPassword)
        } catch (e) {
            console.log(e);
        }

        res.send({ users: items, message: undefined });
    });
});

app.get('/api/getIncidents', (req, res) => {
    getIncidents.getIncidentsFunc(function (items) {
        items.map(incident => {
            delete incident._id;
        });
        res.send({ incidents: items });
    });
});

app.post('/api/addIncident', (req, res) => {
    let newIncident = req.body.incident;

    getIncidents.getIncidentsFunc(function (items) {
        let ids = [];

        items.forEach(item => {
            ids.push(item.id);
        });
        let newIncidentID;

        if (ids.length === 0){
            newIncidentID = 1;
        } else {
            newIncidentID = Math.max.apply(null, ids) + 1;
        }
        newIncident.id = newIncidentID;

        try {
            addIncident(newIncident);
            items.map(incident => {
                delete incident._id;
            });
            items.push(newIncident)
        } catch (e) {
            console.log(e);
        }

        res.send({ incidents: items });
    });
});

app.patch('/api/editIncident', (req, res) => {
    let editedParams = req.body;
    console.log(editedParams);

    getIncidents.getIncidentsFunc(function (items) {
        let index = quickSearchByID(editedParams.id, items);

        if (index !== -1) {
            items[index].description = editedParams.description;
            items[index].status = editedParams.status;
            items[index].assignee = editedParams.assignee;
            console.log(index);

            editIncident(editedParams.id, editedParams.description, editedParams.assignee, editedParams.status);
        }

        res.send({ incident: items[index] })
    });
});

app.listen(4000, function () {
    console.log('Netcracker App API Server listening on port 4000!');
});
