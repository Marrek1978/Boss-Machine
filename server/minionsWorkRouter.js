const express = require('express');
const minionsWorkRouter = express.Router();
const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase,deleteFromDatabasebyId } = require('../server/db.js')

// GET /api/minions/:minionId/work to get an array of all work for the specified minon.

minionsWorkRouter.get('/', (req, res, next) => {

  const allWork = getAllFromDatabase('work');
  // console.log('all work is', allWork);
  const minionWork = allWork.filter(work => work.minionId === req.id);
  // console.log('minionWork is', minionWork);
  res.send(minionWork);
});

minionsWorkRouter.post('/', (req, res, next) => {
    const work = addToDatabase('work', req.body);
    res.status(201).send(work);
})

// PUT /api/minions/:minionId/work/:workId to update a single work by id.
minionsWorkRouter.put('/:workId', (req, res, next) => {
  //is minion id the same
  console.log('req.params.minionId', req.id);
  console.log('req.body.minionId', req.body.minionId);
  if(req.id !== req.body.minionId){
    res.status(400).send('Bad Request');
  }else{
    const work = updateInstanceInDatabase('work', req.body);
    res.send(work);
  }
})

minionsWorkRouter.delete('/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work',req.params.workId );
    if(!deleted){
        res.status(500);
    }else{
        res.status(204)
    }
    res.send()
});

module.exports = minionsWorkRouter;