const express = require('express');
const minionsRouter = express.Router();
const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase,deleteFromDatabasebyId } = require('../server/db.js')
const minionsWorkRouter = require('./minionsWorkRouter');


minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.send(minions);
});

minionsRouter.post('/', (req, res, next) => {

    const minion = addToDatabase('minions', req.body);
    res.status(201).send(minion);
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
        
minionsRouter.use('/:minionId/work', minionsWorkRouter);

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

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.id);
    if(!deleted){
        res.status(500);
    }else{
        res.status(204)
    }
    res.send()
});
// DELETE /api/minions/:minionId to delete a single minion by id.



module.exports = minionsRouter;