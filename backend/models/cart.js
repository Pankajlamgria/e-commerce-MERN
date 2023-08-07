const mongoose=require("mongoose");
const { Schema } = mongoose;

const cartproductschema = new Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  productdatabaseid:{type:mongoose.Schema.Types.ObjectId,ref:"product"},
  name:{type:String,required:true},
  currentprice:{type:Number,required:true},
  normaldayprice:{type:Number,required:true},
  percentageof:{type:Number,required:true},
  producttype:{type:String,required:true},
  imgurl:{type:String,required:true},
  available:{type:String,required:true},
  brand:{type:String},
  material:{type:String},
  quantity:{type:Number,required:true}
});
module.exports = mongoose.model("cart", cartproductschema);
