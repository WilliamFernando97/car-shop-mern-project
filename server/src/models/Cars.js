import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    brand: {type: String, required: true},
    model: {type: String, required: true},
    plate: {type: String, required: true, unique:true},
    gas_level: {type: String, required: true},
    ad_info: {type: String, required: true,unique:true},
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true,},
});

export const CarModel = mongoose.model("car", CarSchema);