import { getUserByEmail } from '@/lib/userService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        try {
            const user = await getUserByEmail(email);
            if (!user || user.password !== password) {
                return res.status(401).json({ error: 'Invalid email or password.' });
            }

            console.log('User logged in successfully:', user);
            return res.status(200).json({ user });
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed.` });
    }
}
