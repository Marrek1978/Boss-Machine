const express = require('express');
const ideasRouter = express.Router();
const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase,deleteFromDatabasebyId } = require('../server/db.js')
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
});



ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    // if(!req.body.name || !req.body.description || !req.body.numWeeks || !req.body.weeklyRevenue){
    //     res.status(400).send('Ideas must have a name, description, numWeeks, and weeklyRevenue');
    // }else{
        const idea = addToDatabase('ideas', req.body);
        res.status(201).send(idea);
    // }
})

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if(!idea){
        res.status(404).send('idea not found');
    }else{
       req.id = id;
       req.idea = idea;
       next();
    }
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
})

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const idea = updateInstanceInDatabase('ideas', req.body);
    if(!idea){
        res.status(400).send('Bad Idea');
    }else{
        res.send(idea);
    }
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.id);
    if(!deleted){
        res.status(404);
    }else{
        res.status(204);
    }
    res.send()
});



module.exports = ideasRouter;