import { hash, genSalt } from 'bcrypt';

export const getHashedPassword = async (password: string): Promise<string> => {
  const salt = await genSalt();
  const encryptedPassword = await hash(password, salt);
  return encryptedPassword;
};

export const generateOtp = async (length: number) => {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }

  return otp;
};
