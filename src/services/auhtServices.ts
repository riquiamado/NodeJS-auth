
import jwt from 'jsonwebtoken';
import { User } from '../models/user.interfaces';

const jsonSecret = process.env.JSON_WEB_SECRET || 'secret';

export const generateToken = (user:User) => {
    return jwt.sign({ id:user.id, email:user.email }, jsonSecret, { expiresIn: '1h' });

};