// this is very important to first load the env file
{require("dotenv").config();}

const express = require('express')
const app = express()
var cors=require('cors');
const port = 4000
const connectfunction=require('./db');
connectfunction();
app.use(cors())

app.use(express.json())

app.use('/api/auth/',require('./routes/auth.js')) 
app.use('/api/product/',require('./routes/product'))
app.use('/api/cart/',require('./routes/cartproduct'))
app.use('/api/buy/',require('./routes/buy'))

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })
