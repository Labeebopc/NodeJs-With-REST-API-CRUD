const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserSchema } = require("../models/userModel.js")



const User = mongoose.model('User', UserSchema)

/******************************************************* Signup **********************************************************************/
//export 
const Signup = async (req, res) => {
    const { name, email, gender, password, place } = req.body;

    try {
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {

            res.status(400).json({ message: "User Already Exists" })
        }
        if (!existingUser) {
            //hashing password
            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await User.create({ name, email, password: hashedPassword, place, gender })

            res.status(201).json({ success: true, user, message: "Account Successfuly Created" })
        }

    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }


}

/******************************************************* Login **********************************************************************/

//export 
const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ success: false, message: "Please provide email and password" })
    }

    try {
        const existingUser = await User.findOne({ email }).select("+password")
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" })
        }
        //Comparing hashed password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" })
        }


        // jwt token

        //const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET_KEY )

        const token = jwt.sign({ id: existingUser._id }, "RESTAPISECRETKEY")

        res.status(200).json({ result: existingUser,token,  message: "Successfully Logged in" })


    } catch (error) {

        return res.status(500).json({ message: "Login Failed" })

    }


}

/******************************************************* Get all users **************************************************************/

//export
const getAllUsers = async (req, res) => {

    try {
        const allUsers = await User.find()
        res.status(200).json({ success: true, allUsers, message: "Fetched All Users" })


    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }

}

/******************************************************* Get a User With Id ********************************************************/

const getUserWithId = async (req, res) => {
    const userId = req.params.id;
    let user;
    try {
        user = await User.find({ _id: userId })

    } catch (error) {
        return res.status(400).json({ success: false })

    }
    if (!user) {
        return res.status(404).json({ success: false, message: "User Not Found" })
    }

    return res.status(200).json({ success: true, user })

}

/******************************************************* Pagination with Query parameters ********************************************************/

const getUserWithQueryPara = async (req, res) => {
    const { name = "", page = 1, pagesize = 5 } = req.query;
    let users;
    try {
        if (name === "") {
            users = await User.find().skip(pagesize * (page - 1)).limit(pagesize)
        }

        else {
            users = await User.find({ name: name })
        }

    } catch (error) {
        return res.status(400).json({ success: false })

    }

    return res.status(200).json({ success: true, users })

}


/******************************************************* Update a User With Id ********************************************************/

const updateUserWithId = async (req, res) => {
    const userId = req.params.id;
    let user;
    try {
        user = await User.updateOne({ _id: userId }, req.body)
        user = await User.findOne({ _id: userId })

    } catch (error) {
        return res.status(400).json({ success: false })

    }
    // if (!user) {
    //     return res.status(404).json({ success: false, message: "User Not Found" })
    // }

    return res.status(200).json({ success: true, user, message: "User Successfully Updated" })

}


/******************************************************* Delete a User With Id ********************************************************/

const deleteUserWithId = async (req, res) => {
    const userId = req.params.id;
    let user;
    try {
        user = await User.deleteOne({ _id: userId })

    } catch (error) {
        return res.status(400).json({ success: false })

    }

    return res.status(200).json({ success: true, message: "User Deleted Successfully" })

}


/******************************************************* Get user **********************************************************************/

//export 
const getUser = async (req, res) => {
    const userId = req.id;
    let user;
    try {
        user = await User.findById(userId, '-password')

    } catch (error) {
        return res.status(400).json({ success: false })

    }
    if (!user) {
        return res.status(404).json({ success: false, message: "User Not Found" })
    }
    return res.status(200).json({ success: true, user })

}

module.exports = { Signup, Login, getAllUsers, getUserWithId, getUserWithQueryPara, updateUserWithId, deleteUserWithId, getUser }