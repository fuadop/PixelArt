import 
{
    IContext, 
    ICreateRoomInput, 
    IDeleteRoomInput, 
    IJoinRoomInput, 
    IMongooseUpdate, 
    IRoom, 
    IStartGameInput,
    IUpdateGameInput,
} 
from "../interfaces";
import randomWords from "random-words";
import * as bcrypt from "bcrypt";

const Mutation = {
    createRoom: (_parent: any, {data}: {data: ICreateRoomInput}, {Room, pb}: IContext, _info: any) => {
        if(data.password.trim() === "" || data.password === null || data.password === undefined) {
            throw new Error("Password can't be empty");
        }
        const newRoom = new Room({
            player1: data.player1,
            name: data.name,
            words: randomWords(200) as string[],
            password: bcrypt.hashSync(`${data.password}`, 10),
            isStarted: false
        })
        return newRoom.save().then((res: IRoom) => {
            pb.publish(`room ${res._id}`, {roomStateChange: {
                mutation: "CREATED",
                data: res
            }})
            return res;
        }).catch((err: Error) => {
            throw new Error(`${err}`);
        });
    },
    joinRoom: (_parent: any, {data}: {data: IJoinRoomInput}, {Room, pb}: IContext, _info: any) => {
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
                    pb.publish(`room ${data.roomid}`, {
                        roomStateChange: {
                            mutation:"JOINED",
                            data: room
                        }
                    });
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
            // const deletedRoom: IRoom = JSON.parse(JSON.stringify(room));

            return Room.deleteOne({_id: data.roomid}, err => {
                if(err) {
                    throw new Error(`${err}`);
                }
                // return deletedRoom;
            })
        })
        
    },
    startGame: (_parent: any, {data}: {data: IStartGameInput}, { Room, pb }: IContext, _info: any) => {
        return Room.findById(`${data.roomid}`).then(room => {
            if(!room) {
                throw new Error("Room doesn't exist");
            }
            return Room.updateOne({_id: data.roomid}, {
                isStarted: true
            }).then((update: IMongooseUpdate) => {
                if(update.ok !== 1) {
                    throw new Error("Room not updated");
                }
                return Room.findById(data.roomid).then(val => {
                    pb.publish(`room ${data.roomid}`, {roomStateChange: {
                        mutation: "STARTGAME",
                        data: val
                    }})
                    return val
                })

            })
        }).catch(err => {
            throw new Error(err);
        });
    },
    updateGame: (_parent: any, {data}: {data: IUpdateGameInput}, {Room, pb}: IContext, _info: any) => {
        return Room.findById(`${data.roomid}`).then(room => {
            if(!room) {
                throw new Error("Room doesn't exist");
            }
            if(!room.isStarted) {
                throw new Error("Game hasn't started yet");
            }
            if(data.player === room.player1) {
                return Room.updateOne({_id: `${data.roomid}`}, {
                    player1WordsTyped: data.wordsTyped,
                    player1Errors: data.errors,
                    player1Speed: data.speed
                }).then((updated: IMongooseUpdate) => {
                    if(updated.ok !== 1) {
                        throw new Error("Not updated");
                    }
                    return Room.findById(data.roomid).then(val => {
                        pb.publish(`room ${data.roomid}`, {
                            roomStateChange: {
                                mutation: "UPDATEDTEXT",
                                data: room
                            }
                        })
                        return val
                    })
                })
            }

            return Room.updateOne({_id: `${data.roomid}`}, {
                player2WordsTyped: data.wordsTyped,
                player2Errors: data.errors,
                player2Speed: data.speed
            }).then((updated: IMongooseUpdate) => {
                if(updated.ok !== 1) {
                    throw new Error("Not updated");
                }
                return Room.findById(data.roomid).then(val => {
                    pb.publish(`room ${data.roomid}`, {
                        roomStateChange: {
                            mutation: "UPDATEDTEXT",
                            data: room
                        }
                    })
                    return val
                })
            })
           
            
        }).catch(err => {
            throw new Error(err);
        });
    }
}

export default Mutation;