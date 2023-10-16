const express=require('express');
const path=require('path');
const app=express();
const bodyparser=require('body-parser');
const session=require('express-session');
const router=require('./router');
const port=3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));

app.use(session({
    secret:["secretkey"],
    resave:false,
    saveUninitialized:true
}));

app.set('view engine','ejs');

//load static assets
//the commmand will returnn the path of public folder to the use method 

app.use('/static',express.static(path.join(__dirname,'public'))) //dirname: return the name of project directory

app.use('/static',express.static(path.join(__dirname,'public/assets')))


app.use('/',router);
app.use("/login",router);
app.use("/route",router)

//home route

app.get('/',(req,res)=>{
    const email = req.session.user;
    
    if(email){
        res.render("dashboard",{user:email})
    } else{
        const err = req.session.err
        res.render("base",{err})
    }
})



app.listen(port,()=>{console.log("Listening to server on http://localhost:3000")});