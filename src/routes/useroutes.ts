import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/useControllers";

const router = express.Router();
const JWT_SECRET = process.env.JSON_WEB_SECRET || "deafult_secret";

//Middlewares para jwt para saber si estamos autentificados
const authenticToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
  });
  next();
};

router.get("/", authenticToken,getUsers);
router.post("/", authenticToken,createUser);
router.get("/:id", authenticToken,getUser);
router.put("/:id", authenticToken,updateUser);
router.delete("/:id", authenticToken,deleteUser);

export default router;
