var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require("request");

var ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:8080/order/';

app.set('view engine', 'ejs');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/', function(req, res){ 
    res.render('index',{order:null, message: null});
});

app.post('/order', urlencodedParser, function (req, res) {

   // Prepare output in JSON format
   payload = {
      item:req.body.item,
      quantity:req.body.quantity,
      price: req.body.price,
      remarks: req.body.remarks	
   };
   console.log(payload); 	
   console.log('ORDER_SERVICE_URL : '+ORDER_SERVICE_URL); 	
   request.post({
    	"headers": { "content-type": "application/json" },
    	"url": ORDER_SERVICE_URL,
    	"body": JSON.stringify(payload)
   }, (error, response, body) => {
    	if(error) {
        	return console.dir(error);
        	res.render('index',{order: null, message:"There is some error in processing:: "+error}); 
    	}
    	console.log(body);
        res.render('index',{order: body, message:"Order created"});
    });
    //return res.redirect('index',{order: response, message:"Order created"});	
})


var server = app.listen(3000, 'localhost', function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})