var express= require('express');
var path=require('path');
var bodyParser= require('body-parser');

var index=require('./routes/index');
var todos=require('./routes/todos');

var app=express();

//view engine
app.set('views', path.join(__dirname,'client/src/'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static(path.join(__dirname,'client')));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
    
//     // res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//     res.header("Access-Control-Allow-Headers", "GET, PUT, POST, DELETE,OPTIONS");
    
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     // res.header("Access-Control-Allow-Headers", "GET,PUT,POST,DELETE,OPTIONS");
    
//     next();
//   });
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use('/',index);
app.use('/api/v1/',todos);

app.listen(4100,function(){
    console.log('Server Started:4100')
});

  