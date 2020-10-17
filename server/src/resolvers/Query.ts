import { IContext, IRoom } from "../interfaces";

const Query = {
    rooms: (_parent: any, _args: any, {Room}: IContext, _info: any) => {
        return Room.find((err: Error , data: IRoom) => {
            if(err) {
                throw new Error("An Error occured: " + err);
            }
            return data;
        });
    }
}

export default Query;