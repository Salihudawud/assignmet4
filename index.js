import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import mystudentModel from "./modules/student_schema.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const DB = process.env.DB_URL;
app.use(express.json());


app.get('/student', async (req, res)=>{
const {school} = req.params

    const getAllstudent = await mystudentModel.find({}).limit(3)
})

app.post('/student',async(req,res)=>{
        res.send('user has been created')

const {first_name,last_name,date_of_birth,school} = req.body
const addNewstudent = await myschoolModel.create({
    first_name,
    last_name,
    date_of_birth,
    school,

})

})
mongoose.connect(DB, {})

app.listen(port,function(){
    console.log('app is listening on port '+ port);
})
