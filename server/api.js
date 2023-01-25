const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./minionsRouter');

const {getAllFromDatabase} = require('../server/db.js')

apiRouter.use('/minions', minionsRouter)



apiRouter.get('/ideas', (req, res, next) => {
  const ideas = getAllFromDatabase('ideas');
  res.send(ideas);
  
})

apiRouter.get('/meetings', (req, res, next) => {
  const meetings = getAllFromDatabase('meetings');
  res.send(meetings);
  
})

module.exports = apiRouter;
