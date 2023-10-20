var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Hospital');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/book', function(req,res){
    var Name = req.body.name;
    var Email =req.body.email;
   var Date=req.body.date;
   var Number=req.body.Number;
    var Doctor =req.body.doctor;
    var Message = req.body.message;
   
    var data = {
        "Name": Name,
        "Number":Number,
        "Email":Email,
       "Appointment Date":Date,
        "Doctor":Doctor,
        "Suffer":Message,
    }
db.collection('Booking Appointment').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");       
    });
     return res.redirect('success.html');
     
})
app.listen(8000);
console.log("server listening at port 8000");



app.post('/contact',function(req,res){
    var Name=req.body.name;
    var Email=req.body.email;
    var Message=req.body.message;
    var data={
        "Name":Name,
        "Email":Email,
        "Message":Message,
    }
    db.collection('Contact Feedback').insertOne(data,function(err,collection){
        if(err) throw err;
        console.log("Record feeded");
    });
    return res.redirect('contact.html');
 })
app.listen(8001);
console.log("server listening at port 8001");



app.post('/signup',function(req,res){
    var name=req.body.username;
    var password=req.body.password;
    var data={
        "UserName":name,
        "Password":password
    }
    db.collection('Signup').insertOne(data,function(err,collection){
        if(err) throw err;
        console.log("Record feeded");
    });
    return res.redirect('home.html');
 })
 app.listen(8003);
    console.log("server listening at port 8004");

 app.post('/login',async function(req,res){
        
   try{
    const c=await db.collection('Signup').find({username:req.body.username})
    if(c.password==req.body.password){
        return res.redirect("/home.html")
    }
    else{
        res.send("Wrong Password")
    }
   }
catch{
    res.send("Wrong details")
}
       
 })
    app.listen(8004);
    console.log("server listening at port 8004");

app.post('/booking1',function(req,res){
    var Name=req.body.name;
    var Email=req.body.email;
    var Phone=req.body.Phone;
    var data={
        "Name":Name,
        "Email":Email,
        "Number":Phone,
    }
    db.collection('Booking1').insertOne(data,function(err,collection){
        if(err) throw err;
        console.log("Record feeded");
    });
    return res.redirect('Specialists.html');
 })
app.listen(8002);
console.log("server listening at port 8010");



