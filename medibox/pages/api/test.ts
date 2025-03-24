import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	// Check if the request method is GET
	if (req.method === 'GET') {
		res.status(200).send('Hello, World!');
	} else {
		// Handle unsupported methods
		res.setHeader('Allow', ['GET']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
