var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todolistModel'), //created model loading
  bodyParser = require('body-parser');

// Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/yourDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
    


// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import and register routes
var routes = require('./api/routes/todolistRoutes');
routes(app);

// Middleware for handling 404 errors
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);
