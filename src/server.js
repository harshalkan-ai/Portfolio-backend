import dotenv from 'dotenv';

// 1. Load environment variables before anything else executes
dotenv.config();

import app from './app.js';

// 2. Define Port
const PORT = process.env.PORT || 5000;

// 3. Start the HTTP Server
const server = app.listen(PORT, () => {
    console.log('==================================================');
    console.log(`🚀 Portfolio CMS Engine Running!`);
    console.log(`📡 Local Port: http://localhost:${PORT}`);
    console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`⚙️  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('==================================================');
});

// 4. Global Process Crash Prevention
process.on('unhandledRejection', (err) => {
    console.error(`❌ Unhandled Rejection Error: ${err.message}`);
    // Close server gracefully before exiting process
    server.close(() => process.exit(1));
});