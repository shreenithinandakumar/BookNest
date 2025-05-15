const router = require("express").Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const Book = require("../models/book")
const {authenticateToken} = require("./userAuth")

//add book - admin
router.post("/add-book", authenticateToken, async(req, res) => {
    try{
        const {id} = req.headers
        const user = await User.findById(id)
        if(user.role !== "admin"){
            res.status(400).json({message: "You do not have access to perform this action"})
        }
        const book = new Book ({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        })

        await book.save()
        res.status(200).json({message: "Book added successfully"})
    } catch(error){
        res.status(500).json({message: "Server Error"})
    }
})

router.put("/update-book", authenticateToken, async(req, res) => {
    try{
        const {bookid} = req.headers
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        })

        res.status(200).json({message: "Book updated successfully"})
    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.delete("/delete-book", authenticateToken, async(req, res) => {
    try{ 
        const {bookid} = req.headers
        await Book.findByIdAndDelete(bookid)
        res.status(200).json({message: "Book deleted successfully"})
    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.get("/get-all-books", async(req, res) => {
    try{
        const books = await Book.find().sort({createdAt: -1})
        return res.json({
            status: "Success",
            data: books
        })
    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.get("/get-recent-books", async(req, res) => {
    try{
        const books = await Book.find().sort({createdAt: -1}).limit(4)
        return res.json({
            status: "Success",
            data: books
        })
    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.get("/get-book-by-id/:id", async(req, res) => {
    try{
        const {id} = req.params
        const book = await Book.findById(id)
        return res.status(200).json({
            status: "success", 
            data: book
        })
    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
})
module.exports = router
