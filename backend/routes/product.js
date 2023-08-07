const express = require("express");
{require("dotenv").config();}
const productmodel = require("../models/allproducts");
const authmodel = require("../models/authentication");
const router = express.Router();
const fetchuser = require("../connection/fetchuse");

// FOR ADDING PRODUCT
router.post("/addnewproduct", fetchuser, async (req, res) => {
  let success = false;
  const userid = req.userid;
  const bodydata = req.body;
  const user = await authmodel.findById(userid);
  if (user.email === "pankajlamgria@gmail.com") {
    const findproduct = await productmodel.findOne({ name: bodydata.name });
    if (findproduct) {
      res.json({ success, error: "The product already exists." });
    } else {
      try {
        const newproduct = await productmodel.create({
          name: bodydata.name,
          currentprice: bodydata.currentprice,
           normaldayprice: bodydata.normaldayprice,
          percentageof: bodydata.percentageof,
          producttype: bodydata.producttype,
          available:bodydata.available,
          imgurl: bodydata.imgurl,
          imgname:bodydata.imgname,
          brand: bodydata.brand,
          material: bodydata.material,
        });
        success = true;
        res.json({ success, newproduct });
      } catch (error) {
        res.json({ success, error });
      }
    }
  } else {
    res.json({ success, error: "Access Denied." });
  }
});

// FOR EDITING PRODUCT
router.post("/editproduct/:id", fetchuser, async (req, res) => {
  let success = false;
  const userid = req.userid;
  const productid = req.params.id;
  const bodydata = req.body;
  const user = await authmodel.findById(userid);
  if (user.email === "pankajlamgria@gmail.com") {
    
    try {
      const newvalues ={
        name: bodydata.name,
        currentprice: bodydata.currentprice,
        normaldayprice: bodydata.normaldayprice,
        percentageof: bodydata.percentageof,
        producttype: bodydata.producttype,
        available:bodydata.available,
        brand: bodydata.brand,
        material: bodydata.material,
      };
      const updatedproduct=await productmodel.findByIdAndUpdate(productid,{$set:newvalues});
      const updateddata=await productmodel.findById(productid);
      success = true;
      res.json({ success, updateddata });
    } catch (error) {
      res.json({ success, error });
    }
  } else {
    res.json({ success, error: "Access Denied." });
  }
});
router.delete("/deleteproduct/:id", fetchuser, async (req, res) => {
  let success = false;
  const userid = req.userid;
  const productid = req.params.id;
  const user = await authmodel.findById(userid);
  if (user.email === "pankajlamgria@gmail.com") {
    try {
    const deletedproduct=await productmodel.findByIdAndDelete(productid);
      success = true;
      res.json({ success, deletedproduct });
    } catch (error) {
      res.json({ success, error });
    }
  } else {
    res.json({ success, error: "Access Denied." });
  }
});

// FOR SHOWING ALL PRODUCTS
router.get("/allproducts", async (req, res) => {
  let success = false;
  try {
    const allproducts = await productmodel.find({});
    if (allproducts) {
      success = true;
      res.json({ success, allproducts });
    } else {
      res.json({ success, error: "products does not exists" });
    }
  } catch (error) {
    res.json({ success, error });
  }
});

// TO SHOW THE SPECIFIC PRODUCT DETAILS
router.get("/specificproduct/:id", async (req, res) => {
  let success = false;
  const productid=req.params.id;
  try {
    const product=await productmodel.findById(productid);
    success=true;
    res.json({success,product});
  } catch (error) {
    res.json({ success, error });
  }
});

// FOR THE FINDING OF THE PRODUCTS BY SEARCH BAR
router.get("/findproduct/:product", async (req, res) => {
  let success = false;
  const filter=req.params.product;
  try {
    const productbyname=await productmodel.findOne({name:filter});
    if(productbyname){
        success=true;
        res.json({success,productbyname});
    }
    else{
        const alldata=await productmodel.find({});
        let arraydata=[];
        for (let index = 0; index <  alldata.length; index++) {
            const name=alldata[index].name;
            if(RegExp(filter, 'i').test(name)){
                arraydata.push(alldata[index]);
            }
        }
        if(arraydata.length===0){
            res.json({success,error:"No data found by this name"});
        }
        else{
            success=true;
            res.json({success,arraydata}); 
        }
    }
  } catch (error) {
    res.json({ success, error });
  }
});







module.exports = router;
