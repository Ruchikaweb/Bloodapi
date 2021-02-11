var express = require('express')
var app = express()
var cors = require('cors')
var bodyparser = require('body-parser')
var mongo = require('mongodb')
var mongoclint = mongo.MongoClient
var mongourl =  "mongodb+srv://ruchika:ruchika123@rest.ujhyi.mongodb.net/BloodDonar?retryWrites=true&w=majority";
// var mongourl = "mongodb://localhost:27017";
var db;  
var port = process.env.PORT||9000;  
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json()) 

app.get('/', (req,res) =>{
    res.send('Health Ok')
})

/// blood group////
app.get('/group' ,(req,res) =>{
    db.collection('Bloodgroups').find().toArray((err,result) => {
        if(err) throw err ;
        res.send(result)
    })
})

/////get register/////
app.get('/register',(req,res)=>{
    var query = req.query.bloodgroup 
    if(req.query.bloodgroup){
        query = { bloodgroup:req.query.bloodgroup ,isActive:true}
    }else{
        query = {isActive:true}
    }
    db.collection('register').find(query).toArray((err,result)=>{
        if(err) throw err ;
        res.send(result)
    })
}) 

app.get('/register/:group', (req,res) => {
    var id = req.params.group
    db.collection('register').find({bloodgroup:id}).toArray((err,result) => {
        if (err) throw err;
        res.send(result)           
    })
})

/////Post register/////
app.post('/registration',(req,res)=>{
    db.collection('register').insert(req.body ,(err,result) => {
        if(err) throw err ;
        res.send("data added")
    })
})


//////get require//////
app.get('/post',(req,res)=>{
    db.collection('requirement').find().toArray((err,result)=>{
        if(err) throw err ;
        res.send(result)
    })
})

/////Post reqquire/////
app.post('/require',(req,res)=>{
    db.collection('requirement').insert(req.body ,(err,result) => {
        if(err) throw err ;
        res.send("data added")
    })
})


mongoclint.connect(mongourl, (err, connection) => {
    if (err) throw err;
    db = connection.db('BloodDonar')
})

app.listen( port ,(err)=>{
    if(err) throw err
    console.log(` Server is running port no ${port}`)
})