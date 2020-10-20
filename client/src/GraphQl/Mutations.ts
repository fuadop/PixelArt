import {gql} from "apollo-boost";

export const joinRoomMutation = gql`
    mutation($roomid: ID!, $player2: String!, $password: String!) {
        joinRoom(data: {
            roomid: $roomid
            player2: $player2
            password: $password
        }){
            id
            name
        }
    }
`