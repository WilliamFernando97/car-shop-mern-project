import express from 'express';
import mongoose from 'mongoose';
import { ClientModel } from "../models/Clients.js";
import { UserModel } from '../models/Users.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.get("/client", async (req,res) => {
    try {
        const response = await ClientModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.post("/client", async (req,res) => {
    const client = new ClientModel(req.body);
    try {
        const response = await client.save(); 
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.put("/client", async (req,res) => {

    try {
        const client = await ClientModel.findById(req.body.clientID);
        const user = await UserModel.findById(req.body.userID);
        user.savedInfo.push(client);
        await user.save();
        //const response = await client.save(client);
        res.json({savedInfo: user.savedInfo});
    } catch (error) {
        res.json(error);
    }
});

router.get("/Savedinfo/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        res.json({savedInfo: user?.savedInfo})

    } catch (error) {
        res.json(error)
    }

});


router.get("/Savedinfo", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        const savedInfo = await ClientModel.find({
            _id: {$in: user.savedInfo},
        });
        res.json({savedInfo})

    } catch (error) {
        res.json(error)
    }

});



export {router as clientsRouter};