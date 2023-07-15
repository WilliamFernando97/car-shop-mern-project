import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    cellphone: {type: String, required: true},
    type_id: {type: String, required: true},
    id: {type: String, required: true,unique:true},
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true,},
});

export const ClientModel = mongoose.model("client", ClientSchema);