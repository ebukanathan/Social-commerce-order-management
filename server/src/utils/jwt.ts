import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

type JwtPayload = {
  userId: string;
  businessId: string;
  role: string;
};

export const generateToken = (payload: JwtPayload) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const jwtSecret: Secret = secret;

  const options: SignOptions = {
    expiresIn: 60 * 60 * 24 * 7,
  };

  return jwt.sign(payload, jwtSecret, options);
};
