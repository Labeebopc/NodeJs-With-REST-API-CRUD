const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const { PostSchema } = require("../models/postModel.js")



const Post = mongoose.model('Post', PostSchema)

/******************************************************* Create a Post *********************************************************/
//export 
const createPost = async (req, res) => {
    const { title, body } = req.body;
    let user = req.user
    try {
        const post = await Post.create({ title: title, body: body, user: user })
        res.status(201).json({ success: true, post, message: "Post Created Successfuly" })

    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }


}

/**************************************************** jwt token verification ******************************************************/

//export 
const verifyToken = (req, res, next) => {

    const headers = req.headers.authorization;
    console.log(headers);

    //const token = headers?.split('Bearer ')[1]
    const token = headers.replace('Bearer ', '')

    if (!token) {
        return res.status(404).json({ success: false, message: "No Token Found / User is Not Authenticated" })
    }

    //jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    jwt.verify(token, "RESTAPISECRETKEY", (err, result) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Invalid Token" })
        }

        console.log(result);
        req.user = result.id;

    })
    next();

}

/******************************************************* Get all Post *********************************************************/
//export 
const getPost = async (req, res) => {
   
    try {
        const post = await Post.find()
        res.status(201).json({ success: true, post, message: "Posts are Successfuly Fetched" })

    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }


}


module.exports = { createPost, verifyToken, getPost }