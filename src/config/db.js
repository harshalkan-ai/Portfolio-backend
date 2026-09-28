import mongoose from 'mongoose';

/**
 * Connects to MongoDB database using Mongoose
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
        console.log(`📦 Database Name: ${conn.connection.name}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        // Exit process with failure (1) so the host or container knows it failed to start
        process.exit(1);
    }
};

export default connectDB;