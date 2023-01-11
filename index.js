const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRouter.js') 
const postRoutes = require('./routes/postRouter.js')

const app = express()

// Parse Application/json
app.use(bodyParser.json({extended:true}));

// Parse Application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

//User Routes
app.use('/api/v1',userRoutes)


//Post Routes
app.use('/api/v1/posts',postRoutes)

//Defining Connection URL & PORT
const CONNECTION_URL = 'mongodb://localhost:27017/test';
const PORT = process.env.PORT || 5000;


//Connecting with MongoDB
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology:true})
.then(()=>console.log('Database connected Succesfully'))
.then(()=> app.listen(PORT,()=>console.log(`Server running on port :${PORT}`)))
.catch((error)=> console.log(error.message));