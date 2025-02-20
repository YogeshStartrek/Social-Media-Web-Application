import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'

const app = express();
// const cors = require('cors');
// to serve images to public
app.use(express.static('public'))
app.use('/images',express.static('images'))

// Middleware to handle parsing of request body into JSON from json string
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGODB)
    .then(() => app.listen(process.env.PORT, () => console.log(`Listening at Port ${process.env.PORT}`)))
    .catch((error)=>console.log(error));


// Routing path
app.use('/auth',AuthRoute);
app.use('/user',UserRoute);
app.use('/posts',PostRoute);
app.use('/upload',UploadRoute);