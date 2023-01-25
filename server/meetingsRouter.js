const express = require('express');
const meetingsRouter = express.Router();
const {getAllFromDatabase, addToDatabase, createMeeting ,deleteAllFromDatabase } = require('../server/db.js')

meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.send(meetings);
});

meetingsRouter.post('/', (req, res, next) => {
    let newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
})


meetingsRouter.delete('/', (req, res, next) => {
    const deleted = deleteAllFromDatabase('meetings');
    if(!deleted){
        res.status(404);
    }else{
        res.status(204);
    }
    res.send();
});



module.exports = meetingsRouter;