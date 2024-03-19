import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../services/passwordServices";
import prisma from "../models/user";
import { generateToken } from "../services/auhtServices";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
   if(!email || !password){
    res.status(400).json({error: `email and password are required`})
    return
   }
    const passHash = await hashPassword(password);
    const user = await prisma.create({
      data: {
        email,
        password: passHash,
      },
    });

    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `hubo un error` });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
   const { email, password } = req.body;
  try {
    const user = await prisma.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(404).json({ error: `user not found` });
      return;
    }
    const passMatch = await comparePassword(password, user.password);
    if (!passMatch) {
      res.status(401).json({ error: `password incorrect` });
      return; // stop the function here if the password is incorrect. We don't want to continue if the password is incorrect. We don't want to generate a token if the password is incorrect. We don't want to send a response if the password is incorrect. We don't want to continue if the password is incorrect. We don't want to continue if the password is incorrect. We don't want to continue if the password is incorrect. We don't want to continue if the password is incorrect. We don't want to continue if the password is incorrect. We don't want to continue if the password is incorrect. We don't want to continue if the password is incorrect. We don't want to continue if the password is incorrect. We don't want to continue if the password is incorrect. We don't want to continue if the password is incorrect. We don't want to continue if the password is incorrect. We don't want to continue if the password is incorrect. We don't want to continue if the password is incorrect. We don't want to continue if the password is incorrect. We don't want to continue if the password is incorrect. We don't want
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `hubon un error` });
  }

}