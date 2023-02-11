const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const routes = require('./api/routes');
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
routes(app);

app.listen(port, ()=> {
   console.log('Server started on port: ' + port);
});
