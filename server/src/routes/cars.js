import express from 'express';
import mongoose from 'mongoose';
import { CarModel } from "../models/Cars.js";
import { UserModel } from '../models/Users.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.get("/car", async (req,res) => {
    try {
        const response = await CarModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.post("/car", async (req,res) => {
    const car = new CarModel(req.body);
    try {
        const response = await car.save();
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.put("/car", async (req,res) => {

    try {
        const car = await CarModel.findById(req.body.carID);
        const user = await UserModel.findById(req.body.userID);
        user.savedCar.push(car);
        await user.save();
        //const response = await client.save(client);
        res.json({savedCar: user.savedCar});
    } catch (error) {
        res.json(error);
    }
});

router.get("/car/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        res.json({savedCar: user?.savedCar})

    } catch (error) {
        res.json(error)
    }

});

router.get("/car", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        const savedCar = await CarModel.find({
            _id: {$in: user.savedCar},
        });
        res.json({savedCar})

    } catch (error) {
        res.json(error)
    }

});


export {router as carsRouter};