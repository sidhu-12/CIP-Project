var express = require('express');
var mongoose = require('mongoose');
var config = require('./config.json');
var routes  = require("./routes.js");
var bodyParser = require('body-parser');



var mongoHost = config.db.prod.host;
mongoose.connect(mongoHost,{ useNewUrlParser: true ,useUnifiedTopology: true});


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('json spaces', 40);

routes(app);

app.listen(process.env.PORT||config.PORT, () => {
    console.log('Connected The Server is running on  ' + config.PORT);
});
