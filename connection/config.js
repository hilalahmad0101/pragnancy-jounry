import mongoose from 'mongoose'
const connectionString = 'mongodb+srv://hilalahmaddeveloper:Ekhazkba7ClBZGrd@cluster0.galtgoj.mongodb.net/imsa';

const connection =async()=>{
    try {
        await mongoose.connect(connectionString);
        console.log('success')
    } catch (error) {
        console.log(error.message)
    }
}


export default connection;