import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

const authenticateToken = (token: string) => {
  const verificationResponse = jwt.verify(token, secret);
  return verificationResponse;
};

export default authenticateToken;
