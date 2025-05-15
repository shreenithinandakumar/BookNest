const express = require("express")
const app = express()
const cors = require('cors');
require ("dotenv").config()
require("./conn/conn")
const User = require("./routes/user")
const Books = require("./routes/book")
const Favourite = require("./routes/favourite")
const Cart = require("./routes/cart")
const Order = require("./routes/order")

const allowedOrigins = ['http://localhost:1000', 'https://jovial-baklava-c6b7dc.netlify.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}));

app.use(express.json())
app.use("/api/v1", User)
app.use("/api/v1", Books)
app.use("/api/v1", Favourite)
app.use("/api/v1", Cart)
app.use("/api/v1", Order)

app.listen(process.env.PORT, ()=>{
    console.log(`server started ${process.env.PORT}`)
})