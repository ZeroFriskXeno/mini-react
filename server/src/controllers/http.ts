import { Request, Response } from 'express';

export const http404 = async (req: Request, res: Response) => {
	res.status(404).json({ ok: false, message: "404: Endpoint not found"  });
}
