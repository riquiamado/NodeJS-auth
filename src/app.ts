import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import auhtroutes from './routes/auhtroutes';
import useroutes from './routes/useroutes'



const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes

//autenticacion
app.use("/auth",auhtroutes)
//user
app.use("/user",useroutes)
export default app;