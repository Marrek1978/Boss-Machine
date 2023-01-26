const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('/minionsRouter');
const ideasRouter = require('./ideasRouter');
const meetingsRouter = require('./meetingsRouter');

const {getAllFromDatabase} = require('../server/db.js')

apiRouter.use('/minions', minionsRouter)
apiRouter.use('/ideas', ideasRouter)
apiRouter.use('/meetings', meetingsRouter)



// apiRouter.get('/ideas', (req, res, next) => {
//   const ideas = getAllFromDatabase('ideas');
//   res.send(ideas);
  
// })

// apiRouter.get('/meetings', (req, res, next) => {
//   const meetings = getAllFromDatabase('meetings');
//   res.send(meetings);
  
// })

module.exports = apiRouter;
