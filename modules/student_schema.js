import mongoose from 'mongoose';
const {Schema, model}=mongoose;
const studentSchema =Schema({
    first_name: String,
    last_name: String,
    date_of_birth: String,
    school: String,});

const mystudentModel = model('student', studentSchema)
export default mystudentModel;
