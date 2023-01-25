const express = require('express');
const minionsRouter = express.Router();
const {getAllFromDatabase, addToDatabase, getFromDatabaseById} = require('../server/db.js')

minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.send(minions);
});


minionsRouter.post('/', (req, res, next) => {
    console.log('req.body', req.body)
    if(!req.body.name || !req.body.title || !req.body.salary){
        res.status(400).send('Minion must have a name, title, and salary');
    }else{
        const minion = addToDatabase('minions', req.body);
        res.status(201).send(minion);
    }
})

minionsRouter.get('/:minionId', (req, res, next) => {
    const id = req.params.minionId;
    const minion = getFromDatabaseById('minions', id);
    if(!minion){
        res.status(404).send('Minion not found');
    }else{
        res.send(minion);
    }
})

// GET /api/minions/:minionId to get a single minion by id.
// PUT /api/minions/:minionId to update a single minion by id.
// DELETE /api/minions/:minionId to delete a single minion by id.



module.exports = minionsRouter;