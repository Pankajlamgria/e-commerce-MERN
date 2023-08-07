const express = require("express");
const authmodel=require('../models/authentication');
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
const fetchuser=require("../connection/fetchuse");

const SECRET=`${process.env.JWTSECRET}`;

router.post("/createuser",async(req,res)=>{
    let success=false;
    const bodydata=req.body;
    const number=bodydata.number;
    if(bodydata.name.length<3){
        res.json({success,error:"Please enter the valid username."});
    }
    else if(bodydata.email.length<5|| !bodydata.email.includes('@gmail.com')){
        res.json({success,error:"Please enter the valid email."});
    }
    else if(bodydata.password.length<5){
        res.json({success,error:"Please enter the strong password."});
    }
      else if(number.toString().length!==10){
        res.json({success,error:"Please enter the 10digit valid phone number"});
      }
      else{
        let newuser=await authmodel.findOne({email:bodydata.email});
        if(newuser){
            res.json({success,error:"Account already exist with this email"});
        }
        else{
            try {
                const salt=await bcrypt.genSalt(10);
                const strongpswd=await bcrypt.hash(bodydata.password,salt);
                // console.log(strongpswd);
                newuser=await authmodel.create({
                    username:bodydata.name,
                    email:bodydata.email,
                    password:strongpswd,
                    number:bodydata.number,
                    address:bodydata.address
                });
                // console.log("user created");
                const token={
                    user:{id:newuser.id}
                };
                const authtoken=jwt.sign(token,SECRET);
                success=true;
                // console.log(authtoken);
                const email=newuser.email;
                res.json({success,authtoken,email});
            } catch (error) {
                res.json({success,error});
            }

        }
      }

})
router.post("/login",async(req,res)=>{
    let success=false;
    const bodydata=req.body;
     if(bodydata.email.length<5|| !bodydata.email.includes('@gmail.com')){
        res.json({success,error:"Please enter the valid email."});
    }
    else if(bodydata.password.length<5){
        res.json({success,error:"Please enter the strong password."});
    }
    else{
        const newuser=await authmodel.findOne({email:bodydata.email});
        if(!newuser){
            res.json({success,error:"Please enter the valid Email address."});
        }

        else{
            try {
                const verresult=await bcrypt.compare(bodydata.password,newuser.password);
                if(verresult){
                    const token={
                        user:{id:newuser.id}
                    };
                    const authtoken=jwt.sign(token,SECRET);
                    success=true;
                    const email=newuser.email;
                    res.json({success,authtoken,email});
                }
                else{
                    res.json({success,error:"Access Denied."});
                    
                }
            } catch (error) {
                res.json({success,error});
            }
        }
      }
})
router.get("/userdetails",fetchuser,async(req,res)=>{
    let success=false;
    const userid=req.userid;
        {
        const newuser=await authmodel.findById(userid).select("-password");
        if(!newuser){
            res.json({success,error:"Signin first."});
        }
        else{
            try {
                {
                    success=true;
                    res.json({success,newuser});
                    
                }
            } catch (error) {
                res.json({success,error});
            }
        }
      }
})


module.exports = router;