import express from 'express';
import mongoose from 'mongoose';
import { OrdersModel } from "../models/Orders.js";
import { UserModel } from '../models/Users.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.get("/order", async (req,res) => {
    try {
        const response = await OrdersModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.post("/order",verifyToken ,async (req,res) => {
    const order = new OrdersModel({
        _id: new mongoose.Types.ObjectId(),
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        cellphone:req.body.cellphone,
        type_id:req.body.type_id,
        id:req.body.id,
        brand:req.body.brand,
        model:req.body.model,
        plate:req.body.plate,
        gas_level:req.body.gas_level,
        ad_info:req.body.ad_info,
        type_service:req.body.type_service,
        userOwner:req.body.userOwner,
    });
    console.log(order);
    try {
        const response = await order.save(); 
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/order", async (req,res) => {

    try {
        const order = await OrdersModel.findById(req.body.orderID);
        const user = await UserModel.findById(req.body.userID);
        user.savedOrder.push(order);
        await user.save();
        //const response = await client.save(client);
        res.status(201).json({savedOrder: user.savedOrder});
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/savedOrder/ids/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        res.json({savedOrder: user?.savedOrder})

    } catch (error) {
        res.json(error)
    }

});

router.get("/savedOrder/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        const savedOrder = await OrdersModel.find({
            _id: {$in: user.savedOrder},
        });
        res.json({savedOrder})

    } catch (error) {
        res.json(error)
    }

});


export {router as ordersRouter};