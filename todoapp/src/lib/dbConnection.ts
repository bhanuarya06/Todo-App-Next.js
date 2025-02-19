import mongoose from 'mongoose';

type connectionObject = {
    isConnected?: Number
}

const connection: connectionObject =  {}

async function dbCon(): Promise<void> {
    if (connection.isConnected){
        console.log("Database already connected")
        return
    }
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI as string)
        connection.isConnected = conn.connection.readyState
        console.log("Database connected sucessfully")
        console.log("connection:",connection)
    }catch(error){
        console.log("Error connecting to database", error)
    }
}

export default dbCon;