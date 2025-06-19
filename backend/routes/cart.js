const router = require("express").Router()
const User = require("../models/user")
const {authenticateToken} = require("./userAuth")

router.put("/add-to-cart", authenticateToken, async(req, res) => {
    try{
        const {id, bookid} = req.headers
        const userData = await User.findById(id)
        const isBookInCart = userData.cart.includes(bookid)
        if(isBookInCart){
            return res.json({
                status: "success",
                message: "Book is already in cart"
            })
        }

        await User.findByIdAndUpdate(id, { $push: {cart: bookid} })
        res.status(200).json({message: "Book added to cart"})
    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.put("/delete-from-cart", authenticateToken, async(req, res) => {
    try{
        const {id, bookid} = req.headers
        const userData = await User.findById(id)
        const isBookInCart = userData.cart.includes(bookid)
        if(isBookInCart){
            await User.findByIdAndUpdate(id, { $pull: {cart: bookid} })
        }
        res.status(200).json({message: "Book removed cart"})
    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.get("/get-user-cart", authenticateToken, async(req, res) => {
    try{
        const {id, bookid} = req.headers
        const userData = await User.findById(id).populate("cart")
        const cart = userData.cart.reverse()
    
        return res.status(200).json({
            status: "Success", 
            data: cart
        })
    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
})

module.exports = router