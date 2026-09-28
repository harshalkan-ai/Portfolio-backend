import express from 'express';
import cors from 'cors';

// 1. Initialize Express application
const app = express();

// 2. Body Parser Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Cross-Origin Resource Sharing (CORS) Configuration
const allowedOrigins = [
    process.env.CLIENT_URL || 'http://localhost:3000',
    process.env.ADMIN_URL || 'http://localhost:5173',
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps, curl, or Postman)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);

// 4. Base Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Backend API is alive and reachable',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
    });
});

// 5. Catch-All 404 Route (For undefined endpoints)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Resource not found on endpoint: ${req.originalUrl}`,
    });
});

export default app;