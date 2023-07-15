import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    cellphone: {type: String, required: true},
    type_id: {type: String, required: true},
    id: {type: String, required: true,unique:true},
    brand: {type: String, required: true},
    model: {type: String, required: true},
    plate: {type: String, required: true, unique:true},
    gas_level: {type: String, required: true},
    ad_info: {type: String, required: true,unique:true},
    type_service: [{type: Object, required: true}],
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true,},
});

export const OrdersModel = mongoose.model("order", OrdersSchema);