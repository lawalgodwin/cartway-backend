import { hash, genSalt, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { config } from 'dotenv';
import { JwtPayload } from 'src/common/types/jwtpayload.type';

config();

export const getHashedPassword = async (password: string): Promise<string> => {
  const salt = await genSalt();
  const encryptedPassword = await hash(password, salt);
  return encryptedPassword;
};

export const verifyPasswordMatch = async (
  plainPassword: string,
  encriptedPassword: string,
) => {
  return compare(plainPassword, encriptedPassword);
};

export const getSignedJwtToken = async (payload: JwtPayload) => {
  return sign({ ...payload }, process.env.JWT_SECRET);
};

export const verifyJwtToken = async (jwtToken) => {
  return verify(jwtToken, process.env.JWT_SECRET);
};

export const generateOtp = async (length: number) => {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }

  return otp;
};
