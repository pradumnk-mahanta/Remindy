var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoDB = require('mongodb');
var monk = require('monk');
var db = monk('// DB URI');
var accountSid = 'TWILIO ACCOUNT ID';
var authToken = 'AUTHENTICATION TOKEN';
var fromNumber = 'TWILIO NUMBER';
var client = require('twilio')(accountSid, authToken);


//Send Function for Twilio (Simplified)
var sendSMS = function(to, message) {
  client.messages.create({
    body: message,
    to: to,
    from: fromNumber
  }, function(err, data) {
        //Handle Error Here;
  });
};

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended : true
}));

app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/remindme', function(request, response) {
  console.log('+' + request.body.countryCode + request.body.phoneNumber, request.body.remindText);

  //Writing to mongoDB Simplified.
  var collection = db.get('reminders');
  collection.insert(request.body, function(error, doc){
    if(error){
      console.log("Could not add to database.");
    }else{
      console.log("Data processed successfully.");
    }
  });

  //Calling the Send Function
  sendSMS('+' + request.body.countryCode + request.body.phoneNumber, request.body.remindText);
});


app.listen(app.get('port'), function() {
  console.log('Node Application is Running on PORT:', app.get('port'));
});
