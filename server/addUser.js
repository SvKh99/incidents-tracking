const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://User:1234@cl1-3ou4n.mongodb.net/test?retryWrites=true&w=majority';
const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = function addUsersFunc(user) {
    mongoClient.connect(function (err, client) {
        if (err) {
            return console.dir(err);
        }

        const db = client.db('usersdb');
        const collection = db.collection('users');

        collection.insertOne(user);
    });
};
