import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectdb = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: "SickleCellDB",
        });
        console.log("Connected to MongoDB", conn.connection.host);
    } catch (error) {
        console.error(`Error connecting to database: ${error instanceof Error ? error.message : error}`);
    }
};

export default connectdb;
