import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get('next-token')?.value  || '';
        const decodedToken : any= jwt.verify(token, process.env.JWT_SECRET_KEY!);
        return decodedToken.userId;
    } catch (error: any) {
        throw new Error (error.message)
    }
}