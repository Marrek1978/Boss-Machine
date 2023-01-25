const express = require('express');
const minionsRouter = express.Router();
const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase } = require('../server/db.js')

minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.send(minions);
});

minionsRouter.post('/', (req, res, next) => {
    if(!req.body.name || !req.body.title || !req.body.salary){
        res.status(400).send('Minion must have a name, title, and salary');
    }else{
        const minion = addToDatabase('minions', req.body);
        res.status(201).send(minion);
    }
})

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if(!minion){
        res.status(404).send('Minion not found');
    }else{
       req.id = id;
       req.minion = minion;
       next();
    }
})

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
})

minionsRouter.put('/:minionId', (req, res, next) => {
    const minion = updateInstanceInDatabase('minions', req.body);
    if(!minion){
        res.status(400).send('Bad Request');
    }else{
        res.send(minion);
    }
})

// PUT /api/minions/:minionId to update a single minion by id.
// DELETE /api/minions/:minionId to delete a single minion by id.



module.exports = minionsRouter;