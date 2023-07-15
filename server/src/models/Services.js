import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    type_service: [{type: String, required: true}],
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true,},
});

export const ServiceModel = mongoose.model("service", ServiceSchema);