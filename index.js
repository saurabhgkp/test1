import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/usrRoute.js';
import fileUpload from 'express-fileupload';
const app = express();

app.use(express.json());

app.use("/", userRoute);
app.use(fileUpload());


mongoose.connect('mongodb://localhost:27017/test1').then(() => {
    app.listen(3000, () => { console.log('server is running on port 3000'); })
})
