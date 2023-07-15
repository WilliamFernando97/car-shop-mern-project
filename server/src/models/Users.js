import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    savedOrder: [{type: mongoose.Schema.Types.ObjectId, ref: "order" }],
    savedInfo: [{type: mongoose.Schema.Types.ObjectId, ref: "client" }],
    savedCar: [{type: mongoose.Schema.Types.ObjectId, ref: "car" }],
    savedService: [{type: mongoose.Schema.Types.ObjectId, ref: "service" }],
});

export const UserModel = mongoose.model("users", UserSchema);



