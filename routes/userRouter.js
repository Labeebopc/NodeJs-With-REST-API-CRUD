const express = require('express');

const { getUser, Login, getAllUsers, getUserWithId, getUserWithQueryPara,updateUserWithId, deleteUserWithId, Signup } = require('../controllers/userController.js')

const router = express.Router()

//SignUp and Login
router.post('/signup', Signup)
router.post('/login', Login)

//Get all Users / Get Users with Query Parameters
router.get('/users', getAllUsers)
router.get('/users',getUserWithQueryPara)

//Get a perticular User / Update / Delete
router.get('/users/:id', getUserWithId)
router.put('/users/:id',updateUserWithId)
router.delete('/users/:id',deleteUserWithId)


//router.get('/user', verifyToken, getUser)



module.exports = router;