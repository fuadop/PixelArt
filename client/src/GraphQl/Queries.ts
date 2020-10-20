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

export const getRoom = gql `
    query($id: ID!) {
        room(id: $id) {
            id
            name
            player1
            player2
            words
            player1
            player1Speed
            player2Speed
            player1WordsTyped
            player2WordsTyped
            player1Errors
            player2Errors
        }
    }
`