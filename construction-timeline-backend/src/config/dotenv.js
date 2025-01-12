import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({
    path: path.resolve(process.cwd(), '.env')
});

// Export configuration object
export const config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/construction-timeline',
    jwtSecret: process.env.JWT_SECRET || 'development_secret_not_for_production',
    nodeEnv: process.env.NODE_ENV || 'development'
};
