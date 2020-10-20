import { IContext, IRoom } from "../interfaces";

const Query = {
    rooms: (_parent: any, _args: any, {Room}: IContext, _info: any) => {
        return Room.find((err: Error , data: IRoom) => {
            if(err) {
                throw new Error("An Error occured: " + err);
            }
            return data;
        });
    },
    room: (_parent: any, args: {id: string}, {Room}: IContext, _info: any) => {
        return Room.findById(args.id).then(room => {
            if(!room) {
                throw new Error("Room not found");
            }
            return room;
        }).catch(err => {
            throw new Error(err);
        })
    }
}

export default Query;