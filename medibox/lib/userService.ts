import User from '../models/userModel';
import connectToDatabase from './dbconfig';

export const saveUser = async (email: string, password: string) => {
    try {
        connectToDatabase(); // Ensure the database connection is established
        const user = new User({ email, password });
        await user.save();
        console.log('User saved successfully:', user);
        return user;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        connectToDatabase(); // Ensure the database connection is established
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return null;
        }
        console.log('User retrieved successfully:', user);
        return user;
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw error;
    }
};
