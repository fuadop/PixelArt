import {gql} from "apollo-boost";

export const getRooms = gql `
    {
        rooms {
            id
            name
            player1
            player2
        }
    }
`