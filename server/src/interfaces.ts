import { PubSub } from "graphql-yoga";
import { Model, Document } from "mongoose";

//Room schema interface 
export interface IRoom extends Document{
    id: string
    name: string
    player1: string
    player2?: string
    password: string
    words: string[]
    isStarted: boolean
    player1Speed?: string
    player2Speed?: string
    player1Errors?: number
    player2Errors?: number
    player1WordsTyped?: number
    player2WordsTyped?: number
}

// context interface
export interface IContext {
    Room: Model<IRoom>
    pb: PubSub
}

// mongoose update interface
export interface IMongooseUpdate {
    n: number
    nModified: number
    ok: number
}

/**
 * 
 *  list of different args interfaces
 * 
*/

// Create room mutation interface
export interface ICreateRoomInput {
    player1: string
    password: string
    name: string
}

// join room mutation interfaces
export interface IJoinRoomInput {
    roomid: string
    player2: string
    password: string
}

export interface IDeleteRoomInput {
    roomid: string
}

export interface IRoomStateChangeInput {
    roomid: string
}

export interface IStartGameInput {
    roomid: string
}

export interface IUpdateGameInput {
    roomid: string
    player: string
    speed: string
    wordsTyped: number
    errors: number
}



export type IRoomStateMutation = "CREATED" | "JOINED" | "STARTGAME" | "UPDATEDTEXT";

export interface IRoomStateChangePayload {
    mutation: IRoomStateMutation
    data: IRoom
}