const express = require('express');

const { createPost, verifyToken, getPost } = require('../controllers/postController.js')

const router = express.Router()


//Create a Posts
router.post("/", verifyToken, createPost)

//Get all Posts
router.get("/",getPost)



module.exports = router;