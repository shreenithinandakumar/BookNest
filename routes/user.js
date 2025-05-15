const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {authenticateToken} = require("./userAuth")

//sign-up
router.post("/sign-up", async(req, res)=> {
    try{
        const {username, email, password, address} = req.body

        if(username.length < 5){
            return res.status(400).json({message: "Username should be atleast 5 characters long"})
        }

        const existingUsername = await User.findOne({username: username})
        if(existingUsername){
            return res.status(400).json({message: "Username already exists"})
        }

        const existingEmail = await User.findOne({email: email})
        if(existingEmail){
            return res.status(400).json({message: "Email already exists"})
        }

        if(password.length<6){
            return res.status(400).json({message: "Password should be atleast 6 characters long"})
        }
        const hashPass = await bcrypt.hash(password, 10)

        const newUser = new User ({
            username: username, 
            email: email, 
            password: hashPass, 
            address: address
        })
        await newUser.save()
        return res.status(200).json({message:"Sign-up success"})
    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.post("/sign-in", async(req, res)=> {
    try{
        const {username, password} = req.body

        const existingUser = await User.findOne({username: username})
        if(!existingUser){
            res.status(400).json({message: "Invalid user"})
        }

        await bcrypt.compare(password, existingUser.password, (err, data) =>{
            if(data){
                const authClaims = [
                    {name: existingUser.username},
                    {role: existingUser.role}
                ]
                const token = jwt.sign({authClaims}, "secretkey", {expiresIn: "30d"})
                res.status(200).json({id: existingUser._id, role: existingUser.role, token: token})
            } else {
                res.status(400).json({message: "Invalid password"})
            }
        })

    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.get("/get-user-information", authenticateToken, async (req, res) => {
    try{
        const {id} = req.headers
        const data = await User.findById(id).select("-password")
        return res.status(200).json(data)
    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.put("/update-address", authenticateToken, async(req, res) => {
    try{
        const {id} = req.headers
        const {address} = req.body
        await User.findByIdAndUpdate(id, {address: address})
        return res.status(200).json({message: "Address updated successfully"})
    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
})

module.exports = router