import { sign } from 'jsonwebtoken';
import IPayload from '../../interfaces/IPayload';

const secret = process.env.JWT_SECRET as string;

function generateToken(payload: IPayload) {
  return sign(payload, secret, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
}
export default generateToken;
