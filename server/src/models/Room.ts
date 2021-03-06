import { Schema, model } from "mongoose";
import { IRoom } from "../interfaces";

const RoomSchema = new Schema({
    name: String,
    player1: String,
    player2: String,
    password: String,
    words: [String],
    isStarted: Boolean,
    player1Speed: Number,
    player2Speed: Number,
    player1Errors: Number,
    player2Errors: Number,
    player1WordsTyped: Number,
    player2WordsTyped: Number
}, {strict: false});

export default model<IRoom>("Room", RoomSchema);