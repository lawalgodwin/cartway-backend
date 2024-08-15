import { hash, genSalt, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { config } from 'dotenv';
import { JwtPayload } from 'src/common/types/jwtpayload.type';
import { orderType } from 'src/common';

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

async function generateRandomCode(length: number) {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }

  return code;
}

export const generateOtp = async (length: number) =>
  await generateRandomCode(length);

export const generateCode = async (length: number, type: orderType) => {
  let code = '';
  if (type === 'delivery') {
    code = `CARD${await generateRandomCode(length)}`;
  } else {
    code = `CARF${await generateRandomCode(length)}`;
  }
  return code;
};
