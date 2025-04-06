import { NextApiRequest, NextApiResponse } from 'next';
import { saveUser } from '@/lib/userService';
import { userAgent } from 'next/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        const user= await saveUser(email, password);

        res.status(200).json({ user });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
