import { Request, Response } from "express";
import prisma from "../models/user";
import { hashPassword } from "../services/passwordServices";

export const createUser = async (req: Request, res: Response):Promise<void> => {
  const { email, password } = req.body;
  try {
    const userEmail = await prisma.findUnique({where:{email}});
    if (userEmail?.email === email) {
      res.status(401).json(`the email ${email} is exist`);
      return;
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(`error al querer crear un usuario`);
    console.log(error);
  }
};

export const getUsers = async (req: Request, res: Response):Promise<void> => {
  try {
    const users = await prisma.findMany();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json(`error al llamar los usuarios`);
    console.log(error)
  }
  return;
};

export const getUser = async (req: Request, res: Response):Promise<void> => {
  const { id } = req.params;
  try {
    const user = await prisma.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
  return;
};

export const updateUser = async (req: Request, res: Response):Promise<void> => {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    if (!id) {
      res.status(404).json(`user with id ${id} not found`);
      return;
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.updateMany({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(200).json({ user });
  } catch (error) {}
};

export const deleteUser = async (req: Request, res: Response):Promise<void> => {
  const { id } = req.params;
  try {
    if (!id) {
     res.status(404).json(`user with id ${id} not found`);
    }
    const user = await prisma.delete({ where: { id: Number(id) } });
    res.status(200).json({ user });
  } catch (error) {}
};
