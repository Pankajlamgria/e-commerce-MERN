// {require("dotenv").config();}
const express = require("express");
const productmodel = require("../models/allproducts");
const fetchuser=require("../connection/fetchuse");
const cartmodel =require("../models/cart");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])

router.post("/create-checkout-session", async (req, res) => {
  try {
    let storeItem=await productmodel.findById(req.body.id);
    storeItem=[storeItem];
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items:storeItem.map((item)=>{
        return {
          price_data:{
            currency:"inr",
            product_data:{
              name:item.name,
            },
            unit_amount:item.currentprice*100,
          },
          quantity:1,
        }
      }),
      success_url: `http://localhost:3000/`,
      cancel_url: `http://localhost:3000/productdetail`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})



router.post("/checkoutcart",fetchuser, async (req, res) => {
  try {
    const userid = req.userid;
    let storeItem = await cartmodel.find({ user: userid });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items:storeItem.map((item)=>{
        return {
          price_data:{
            currency:"inr",
            product_data:{
              name:item.name,
            },
            unit_amount:item.currentprice*100,
          },
          quantity:item.quantity,
        }
      }),
      success_url: `http://localhost:3000/`,
      cancel_url: `http://localhost:3000/search`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router;
