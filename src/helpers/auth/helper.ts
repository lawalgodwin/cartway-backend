import { hash, genSalt } from 'bcrypt'

export const getHashedPassword = async (password: string): Promise<string> => {
    const salt = await genSalt()
    const encryptedPassword = await hash(password, salt)
    return encryptedPassword
}