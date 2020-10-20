
export type Path = "/practice" | "/rooms";

export interface NavProps {
    path?: Path
}

export interface ImageStyle {
    width: string
    height?: string
}

export interface RoomProps {
    rooms: any
    createroom: any
    joinroom: any
}

export interface IRoom {
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

