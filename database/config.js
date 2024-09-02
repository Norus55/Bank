import { connect } from "mongoose";
export async function dbConnect() {
    try {
        //Connect to database
        await connect(process.env.MONGO_CNN)
        console.log('Connection Successful');
        
    } catch (error) {
        console.log(error);
    }
}

export default dbConnect