// import mongoose, { model } from 'mongoose';
const mongoose=require("mongoose");
const { Schema } = mongoose;

const productschema = new Schema({
  name:{type:String,required:true},
  currentprice:{type:Number,required:true},
  normaldayprice:{type:Number,required:true},
  percentageof:{type:Number,required:true},
  producttype:{type:String,required:true},
  imgurl:{type:String,required:true},
  imgname:{type:String,required:true},
  available:{type:String,required:true},
  brand:{type:String},
  material:{type:String},
});
module.exports=mongoose.model('product', productschema);

