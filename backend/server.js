const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const cors = require('cors')
const mongoose = require('mongoose');
const ImgSchema = require('./models/img')
const UserSchema = require('./models/users')
require('dotenv').config()



const myusername = 'admin'
const mypassword = 'pass'
const DatabaseUrl = process.env.DATABASEURL
const app = express();
const PORT = 4000;






mongoose.connect(DatabaseUrl).then(() => { console.log("MongoDB connected") });






const cloudinary = require('cloudinary');












cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });







const oneDay = 1000 * 60 * 60 * 24;





app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());
app.use(cors());




var session;




app.get('/',(req,res) => {
    session=req.session;
    console.log("/")
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('views/login.html',{root:__dirname})
});





app.post('/user',(req,res) => {

    const {username , password} = req.body;

    if(username == myusername && password == mypassword){
        session=req.session;
        session.userid=username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})




app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});





app.post('/user/sign-in',async (req,res) => {
    
    try{
        if(session.userid){
            res.json({status:"OK",data:session.userid});
        }
    }catch{
        res.json({status:"ERROR"});
    }
});




app.post('/user/verify-signin',async (req,res) => {
    const {username,password} = req.body;
    try{
        const result = await UserSchema.findOne({username:username}).lean();
        if(result){
            if(result.password == password){
                session = req.session;
                session.userid = username;
                res.json({status:"OK"});
            }else{
                res.json({status:"ERROR",data:"Invalid Password"});
            }
        }else{
            res.json({status:"ERROR",data:"User does not exist"});
        }
    }catch{
        res.json({status:"ERROR"});
    }
});





app.post('/user/verify-signup',async (req,res) => {
    const {username,password} = req.body;

    try{
        const result = await UserSchema.findOne({username:username}).lean();
        
        if(result){
            res.json({status:"ERROR",data:"User Exist"});
        }else{
            
            const result2 = await UserSchema.create({username,password});

            if(result2){
                session = req.session;
                session.userid = username;
                res.json({status:"OK"});
            }else{
                res.json({status:"ERROR",data:"Server Error"});
            }
        }
    }catch{
        res.json({status:"ERROR"});
    }
});



app.post('/user/upload-img',async (req,res) => {
    const {url , title , desc} = req.body;

    try{
        const result = await ImgSchema.create({url,title,description:desc});
    }catch(err){
        console.log(err);
    }
    res.json({status:"OK"});
});



app.post('/user/image-counter',async (req,res) => {

    const {url}= req.body;
    // console.log(url);

    try{
        const result = await ImgSchema.updateOne({url},{$inc:{views:1}});
        // console.log(result);
    }catch(err){
        console.log(err);
    }
    res.json({status:"OK"});

});




app.post('/user/all-img',async (req,res) => {
    var result;

    try{
        result = await ImgSchema.find();
    }catch(err){
        console.log(err);
    }
    res.json({status:"OK",data:result});
});
















app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));