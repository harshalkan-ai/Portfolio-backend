/**
 * Global Error Handler Middleware
 * Express recognizes a middleware as an error handler ONLY if it takes exactly 4 arguments: (err, req, res, next)
 */
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Internal Server Error';

    // 1. Mongoose Bad ObjectId Error (CastError)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found: Invalid ID format';
    }

    // 2. Mongoose Duplicate Key Error (e.g., trying to use an existing email)
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `Duplicate value entered for '${field}'. Please use another value.`;
    }

    // 3. Mongoose Validation Error (e.g., missing required fields)
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((val) => val.message)
            .join(', ');
    }

    // 4. Send clean JSON response
    res.status(statusCode).json({
        success: false,
        message,
        // Only show stack trace in development mode for debugging
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

export default errorHandler;