const express=require("express")
const path=require("path")
const fs=require('fs')
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
// mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const app= express()
const port =8000;

// MongoDB Connection
mongoose.connect('mongodb+srv://Tony-Stark-Jr:Stark@cluster0.flvhw.mongodb.net/dance-website?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true 
})

mongoose.connection.on('error', err => {
    console.log("connection failed");
})

mongoose.connection.on("connected", connected => {
    console.log('connected with database');
})

// Define mongoose Schema
var contactSchema =new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String,
})

var Contact = mongoose.model('Contact', contactSchema)

// Express Specific Stuff 
app.use(express.static('static')); // For serving static files
app.use(express.urlencoded({ extended: true })) // Use of body-parser to read and write josn data to human data

// Pug Specific Stuff 
 app.set('view engine','pug') // Set the template engine as pug
 app.set('views',path.join(__dirname, 'views')); // Set teh views directory

 // ENDPOINTS
app.get('/index', (req, res)=>{
    const con = "";
    const params = {}
    res.status(200).render('home.pug',params);
})

app.get("/contact", (req, res)=>{ 
    const params={}
    res.status(200).render('contact.pug');
});


app.post("/contact", (req, res)=>{ 
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This Item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug');
});


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});