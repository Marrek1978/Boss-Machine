const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
const apiRouter = require('./server/api');
const PORT = process.env.PORT || 4001;
// const html = require('/index.html');



app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));
app.use('/api', apiRouter)


app.get("/", (req, res) => {
  console.log('res is', res)
  res.sendFile('./index.html', { root : __dirname});
  
});

if (!module.parent) { 
  app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))
}

module.exports = app;
