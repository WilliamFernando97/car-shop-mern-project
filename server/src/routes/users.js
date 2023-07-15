import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import {UserModel} from '../models/Users.js';


const router = express.Router();

router.post("/register", async (req,res) => {
    const {username, password } = req.body;

    const user = await UserModel.findOne({username});

    if (user) {
        return res.status(400).json({message: "USUARIO YA EXISTE!. ESCOJA OTRO POR FAVOR."});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new UserModel({username, password: hashedPassword});

    await newUser.save()

    res.json({message: "USUARIO INGRESADO CON ÉXITO!"})

});

router.post("/login", async (req, res) => {
    const {username, password } = req.body;

    const user = await UserModel.findOne({username});

    if (!user) {
        return res
        .status(400)
        .json({message: "USUARIO NO EXISTE!"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid){
        return res
        .status(400)
        .json({message: "USUARIO O CONTRASEÑA INVALIDA!"});
    }

    const token = jwt.sign({id: user._id}, 'secret');

    res.json({token, userID: user._id});

});
export {router as userRouter};

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, "secret", (e) => {
        if (e) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };