import { IContext, ICreateRoomInput, IDeleteRoomInput, IJoinRoomInput, IMongooseUpdate, IRoom } from "../interfaces";
import randomWords from "random-words";
import * as bcrypt from "bcrypt";

const Mutation = {
    createRoom: (_parent: any, {data}: {data: ICreateRoomInput}, {Room}: IContext, _info: any) => {
        if(data.password.trim() === "" || data.password === null || data.password === undefined) {
            throw new Error("Password can't be empty");
        }
        const newRoom = new Room({
            player1: data.player1,
            words: randomWords(200) as string[],
            password: bcrypt.hashSync(`${data.password}`, 10)
        })
        return newRoom.save().then((res: IRoom) => {
            return res;
        }).catch((err: Error) => {
            throw new Error(`${err}`);
        });
    },
    joinRoom: (_parent: any, {data}: {data: IJoinRoomInput}, {Room}: IContext, _info: any) => {
        return Room.findById(data.roomid).then((val: IRoom | null) => {
            if(!val) {
                throw new Error("Room not found");
            }
            if(val.player2) {
                throw new Error("Room already full");
            }
            const isValidPassword: boolean = bcrypt.compareSync(`${data.password}`, val.password);
            
            if(!isValidPassword) {
                throw new Error("InCorrect Password");
            }
            return Room.updateOne({_id: `${data.roomid}`}, {
                player2: data.player2
            }).then((update: IMongooseUpdate) => {
                if(update.ok !== 1) {
                    throw new Error("Couldn't join room");
                }
                return Room.findById(data.roomid).then((room: IRoom | null) => {
                    return room;
                })
            }).catch((err: Error) => err);
        }).catch((err: Error) => {
            throw new Error(`${err}`);
        })
    },
    deleteRoom: (_parent: any, {data}: {data: IDeleteRoomInput}, {Room}: IContext, _info: any) => {
        return Room.findById(data.roomid).then(room => {
            if(!room) {
                throw new Error("Room not found");
            }

            return Room.deleteOne({_id: data.roomid}, err => {
                if(err) {
                    throw new Error(`${err}`);
                }
                return room;
            })
        })
        
    }
}

export default Mutation;