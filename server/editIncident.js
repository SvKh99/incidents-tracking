const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://User:1234@cl1-3ou4n.mongodb.net/test?retryWrites=true&w=majority';
const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = function editIncidentFunc(incidentID, incidentDescription, incidentAssignee, incidentStatus) {
    mongoClient.connect(function (err, client) {
        if (err) {
            return console.dir(err);
        }

        const db = client.db('incidentsdb');
        const collection = db.collection('incidents');
        console.log(incidentID, incidentStatus, incidentAssignee);

        collection.updateOne({ id: incidentID }, {$set: { description: incidentDescription,
                assignee: incidentAssignee, status: incidentStatus } });
    });
};
