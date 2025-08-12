import mongoose from "mongoose"


const connectDB  = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongodb connected , ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("mongodb connection error" , error);
        
    }
}

export default connectDB