import bcrypt from 'bcrypt';

const saltRound:number = 10;

export const hashPassword = async (password: string):Promise<string> => {
    return await bcrypt.hash(password, saltRound);
}


export const comparePassword = async (password: string, hash: string):Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}