const mongoose = require('mongoose');
async function connect() {
  await mongoose.connect('mongodb://0.0.0.0:27017/eweb');
  console.log("connected");
}
module.exports=connect;
