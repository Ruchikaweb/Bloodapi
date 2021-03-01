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

////try/////

/// blood group////
app.get('/group' ,(req,res) =>{
    db.collection('Bloodgroups').find().toArray((err,result) => {
        if(err) throw err ;
        res.send(result)
    })
})

/////get register/////
app.get('/register',(req,res)=>{
    db.collection('register').find().toArray((err,result)=>{
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

////Delete register///
app.delete('/deleteregister',(req,res) => {
    var question = req.body.question ;
    var answer = req.body.answer ;
    // var del = mongo.ObjectID(req.params.id) 
    db.collection('register').remove({selectquestion:question,answer:answer},(err,result)=>{
        if(err) throw err;
        res.status(200).send("Data Removed")
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
/////Delete //////
app.delete('/delete/:id',(req,res) => {
    var del = mongo.ObjectID(req.params.id)
//     var id = mongo.ObjectID(req.body._id)
    db.collection('requirement').remove({_id:del},(err,result)=>{
        if(err) throw err;
        res.status(200).send("Data Removed")
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
