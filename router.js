var express=require("express");
var router=express.Router();

const credential={
    email:"navya@gmail.com",
    password:"navya"
};

///login user

router.post('/login',(req,res)=>{
    if(req.body.email==credential.email&&req.body.password==credential.password){
        req.session.user=req.body.email;
        if(req.session.user){
            res.redirect("/")
        }
    }else{
        req.session.err = "invalid"
        res.redirect(`/`)
    }
});



//route for logout

router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            
            console.log("logout successful");
                res.redirect('/')        
            }
    })
});

module.exports=router;