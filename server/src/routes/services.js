import express from 'express';
import mongoose from 'mongoose';
import { ServiceModel } from "../models/Services.js";
import { UserModel } from '../models/Users.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.get("/service", async (req,res) => {
    try {
        const response = await ServiceModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.post("/service", async (req,res) => {
    const service = new ServiceModel(req.body);
    try {
        const response = await service.save();
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.put("/service", async (req,res) => {

    try {
        const service = await ServiceModel.findById(req.body.serviceID);
        const user = await UserModel.findById(req.body.userID);
        user.savedService.push(service);
        await user.save();
        //const response = await client.save(client);
        res.json({savedService: user.savedService});
    } catch (error) {
        res.json(error);
    }
});

router.get("/service/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        res.json({savedService: user?.savedService})

    } catch (error) {
        res.json(error)
    }

});

router.get("/service", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        const savedService = await ServiceModel.find({
            _id: {$in: user.savedService},
        });
        res.json({savedService})

    } catch (error) {
        res.json(error)
    }

});


export {router as servicesRouter};