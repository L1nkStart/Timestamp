// index.js
// where your node app starts
var port = '3500';
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



app.get("/api/time/:fecha", function (req, res) {
  var fechas = req.params.fecha
  let fecha

  if(!fechas){
    fecha = new Date()
  }else{
    if(isNaN(fechas)){
      fecha = new Date((fechas))
    }else {
      fecha = new Date(parseInt(fechas))
    }
  }
  if (fecha.toString() == 'Invalid Date'){
    res.json({ error: fecha.toString() })
  }else{
    res.json({ unix: fecha.getTime(), utc: fecha.toUTCString() })
  }
});







// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
