import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to Database first, then start listening
const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(PORT, () => {
            console.log('==================================================');
            console.log(`🚀 Portfolio CMS Engine Running!`);
            console.log(`📡 Local Port: http://localhost:${PORT}`);
            console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
            console.log(`⚙️  Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log('==================================================');
        });

        // Global Process Crash Prevention
        process.on('unhandledRejection', (err) => {
            console.error(`❌ Unhandled Rejection Error: ${err.message}`);
            server.close(() => process.exit(1));
        });
    } catch (error) {
        console.error(`❌ Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

startServer();