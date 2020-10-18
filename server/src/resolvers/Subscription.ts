import { IContext, IRoomStateChangeInput, IRoomStateChangePayload } from "../interfaces";

const Subscription = {
    roomStateChange: {
        subscribe: (_parent: any, { data }: {data: IRoomStateChangeInput}, { Room, pb }: IContext, _info: any) => {
            return Room.findById(data.roomid).then(currentRoom => {
                if(!currentRoom) {
                    throw new Error("Room doesn't exist");
                }
                return pb.asyncIterator<IRoomStateChangePayload>(`room ${data.roomid}`);
            })
        }
    }
}

export default Subscription;