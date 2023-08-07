const express = require("express");
const productmodel = require("../models/allproducts");
const cartmodel = require("../models/cart");
const router = express.Router();
const fetchuser = require("../connection/fetchuse");

// THIS IS TO ADD A PRODUCT INTO THE CART;
router.post("/addtocart/:productid", fetchuser, async (req, res) => {
  const userid = req.userid;
  //   console.log(userid);
  const bodydata = req.body;
  const productid = req.params.productid;
  let success = false;
  const productdetails = await productmodel.findById(productid);
  const productincart = await cartmodel.findOne({
    name: productdetails.name,
    user: userid,
  });
  if (productincart) {
    const updatedquantity = await cartmodel.updateOne(
      { name: productdetails.name },
      { $set: { quantity: bodydata.quantity } }
    );
    success = true;
    const updatedcartdetials = await cartmodel.findOne({
      name: productdetails.name,
    });
    res.json({ success, updatedcartdetials });
  } else {
    try {
      const newcart = await cartmodel.create({
        user: userid,
        productdatabaseid:productid,
        name: productdetails.name,
        currentprice: productdetails.currentprice,
        normaldayprice: productdetails.normaldayprice,
        percentageof: productdetails.percentageof,
        producttype: productdetails.producttype,
        imgurl: productdetails.imgurl,
        available: productdetails.available,
        brand: productdetails.brand,
        material: productdetails.material,

        quantity: bodydata.quantity,
      });
      success = true;
      res.json({ success, newcart });
    } catch (error) {
      res.json({ success, error });
    }
  }
});

// TO SHOW ALL PRODUCT FORM THE CART
router.get("/allcartproduct", fetchuser, async (req, res) => {
  const userid = req.userid;
  let subtotal=0;
  let success = false;
  try {
    const allcartproduct = await cartmodel.find({ user: userid });
    // console.log(allcartproduct);
    for (let index = 0; index < allcartproduct.length; index++) {
      let another=allcartproduct[index].currentprice*allcartproduct[index].quantity;
      subtotal=subtotal+another;
      // console.log(subtotal);
    }
    if (allcartproduct.length === 0) {
      res.json({ success, error: "Your Cart is Empty" });
    } else {
      success = true;
      res.json({ success, allcartproduct,subtotal });
    }
  } catch (error) {
    res.json({ success, error });
  }
});

// THIS IS FOR THE DELETION OF THE CART PRODUCT
router.delete("/deletecart/:cartproductid", fetchuser, async (req, res) => {
  //   const userid = req.userid;
  const cartproductid = req.params.cartproductid;
  let success = false;
  try {
    const deletecart = await cartmodel.findByIdAndDelete(cartproductid);
    success = true;
    res.json({ success, deletecart });
  } catch (error) {
    res.json({ success, error });
  }
});

// THIS IS FOR THE DELETION OF THE CART PRODUCT
router.post("/update/:cartproductid", fetchuser, async (req, res) => {
  //   const userid = req.userid;
  const bodydata = req.body;
  const cartproductid = req.params.cartproductid;
  let success = false;
  try {
    const newdata = {
      quantity: bodydata.quantity,
    };
    if (bodydata.quantity === 0) {
      const deletecart = await cartmodel.findByIdAndDelete(cartproductid);
      success = true;
      res.json({ success, deletecart });
    } else {
      const updatedquantity = await cartmodel.findByIdAndUpdate(cartproductid, {
        $set: newdata,
      });
      success = true;
      const updatedcartdetials = await cartmodel.findById(cartproductid);
      res.json({ success, updatedcartdetials });
    }
  } catch (error) {
    res.json({ success, error });
  }
});

module.exports = router;
