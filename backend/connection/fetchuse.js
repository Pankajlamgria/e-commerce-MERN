{require("dotenv").config();}
var jwt = require("jsonwebtoken");
const JWT_SECRET =`${process.env.JWTSECRET}`;
const fetchuser=(req,res,next)=>{
    // console.log(JWT_SECRET);
    const token=req.header("auth_token");
    if(!token){
        console.log("no Authentication");
        return res.json({success:false,error:"Authentication not found"});
    }
    let data=jwt.verify(token,JWT_SECRET);
    req.userid=data.user.id;
    next();
}
module.exports=fetchuser;