import { sign } from 'jsonwebtoken';
import IPayload from '../../interfaces/IPayload';

const secret = process.env.JWT_SECRET || 'jwt_secret';

function generateToken(payload: IPayload) {
  return sign(payload, secret, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
}
export default generateToken;
