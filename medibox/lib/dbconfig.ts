import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        const uri = process.env.MONGO_URI as string;
        await mongoose.connect(uri, {  });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectToDatabase;
