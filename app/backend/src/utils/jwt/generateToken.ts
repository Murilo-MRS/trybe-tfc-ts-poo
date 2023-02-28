import * as jwt from 'jsonwebtoken';
import IPayload from '../../interfaces/IPayload';

const secret = process.env.JWT_SECRET as string;

const generateToken = (payload: IPayload) =>
  jwt.sign(payload, secret, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

export default generateToken;
