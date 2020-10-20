import React, { FC , useRef, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import {graphql} from "react-apollo";
import compose from "lodash.flowright";
import Navbar from "../Navbar";
import {getRooms} from "../../GraphQl/Queries";
import { joinRoomMutation, createRoomMutation } from "../../GraphQl/Mutations";
import { RoomProps, IRoom } from "../interfaces";
import { Redirect } from "react-router-dom";
import SearchImage from "../images/loupe.svg";

const Room: FC<RoomProps | any > = (props) => {
    const [currentRoom, setCurrentRoom] = useState<string>("");
    const [newRoom, setNewRoom] = useState<string>("");
    const [joinRoomRedirect, setJoinRoomRedirect] = useState<boolean>(false);
    const [createRoomRedirect, setCreateRoomRedirect] = useState<boolean>(false);
    const searchBar = useRef<HTMLInputElement>(null);
    
    // join room input fields
    const passwordInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);

    // create room input fields
    const roomNameInput = useRef<HTMLInputElement>(null);
    const playerNameInput = useRef<HTMLInputElement>(null);
    const roomPasswordInput = useRef<HTMLInputElement>(null);


    const createRoom = () => {
        return props.createroom({
            variables: {
                roomname: roomNameInput.current!.value ,
                player1: playerNameInput.current!.value ,
                password: roomPasswordInput.current!.value
            }
        }).then((res: any) => {
            document.body.classList.remove("modal-open");
            document.body.lastChild!.remove();
            setNewRoom(res.data.createRoom.id);
            return setCreateRoomRedirect(true);
        }).catch((err: any) => {
            alert(err);
        })
    }// createRoom()

    const joinRoom = () => {
        return props.joinroom({
            variables: {
                roomid: currentRoom,
                player2: nameInput.current!.value,
                password: passwordInput.current!.value
            }
        }).then((_res: any) => {
            document.body.classList.remove("modal-open");
            document.body.lastChild!.remove();
            return setJoinRoomRedirect(true);
        }).catch((err: any) => {
            alert(err);
        })
    }// joinRoom()

    const renderRooms = () => {
        if(props.rooms.loading) {
            return (
                <p>Loading...</p>
            );
        }

        if(props.rooms.rooms.length === 0) {
            return (
                <p className="display-1 text-center">
                    No room is available
                </p>
            )
        }

        return (
            props.rooms.rooms.map((room: IRoom) => {
                return (
                    <div className="card border-0 shadow-sm mb-4" key={room.id}>
                        <div className="card-header bg-primary">
                            <p className="card-title font-weight-bold text-center">
                                {room.name}
                            </p>
                        </div>
                        <div className="card-body">
                            <b>Status:</b> {room.player1 && room.player2? 
                            <span className="text-lead">Full</span>:
                            <span className="text-lead">Waiting for one more player</span>
                            }
                        </div>
                        <div className="text-center p-2">
                            {room.player1 && !room.player2 && 
                                <button className="btn btn-primary" data-toggle="modal" data-target="#joinroom_modal" onClick= {e => {
                                    setCurrentRoom(room.id);
                                }}>
                                    Join room
                                </button>
                            }
                        </div>
                    </div>
                )
            })
        )
    } // renderRooms()

    return (
        <div>
            {joinRoomRedirect && <Redirect to={`/rooms/${currentRoom}`} />}
            {createRoomRedirect && <Redirect to={`/rooms/${newRoom}`} />}
            <Navbar path="/rooms"/>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-2 text-right align-middle">
                        <img src={SearchImage} alt="search-icon" style={{width: "40px"}}/>
                    </div>
                    <div className="col-8">
                        <input type="text" className="form-control" placeholder="Enter room name..." ref={searchBar} />
                    </div>
                    <div className="col-2">
                        <button className="btn btn-warning text-white font-weight-bold"data-toggle="modal" data-target="#createroom_modal" onClick={() => {
                            roomNameInput.current!.value = searchBar.current!.value;
                        }}>Create Room</button>
                    </div>
                </div>
            </div>
            <div className="rooms p-5">
                <div className="container">
                    {renderRooms()}
                </div>
            </div>

            <div className="modal" id="joinroom_modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="container text-center">
                                <input type="text" placeholder="Enter your name..." className="form-control" ref={nameInput}/>
                                <br/>
                                <input type="password" placeholder="Enter room password..." className="form-control" ref={passwordInput}/>
                                <div className="mt-2">
                                    <button className="font-weight-bold btn btn-primary" onClick={joinRoom}>Join</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" id="createroom_modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <p className="modal-title text-capitalize">
                                create room
                            </p>
                        </div>
                        <div className="modal-body">
                            <div className="container text-center">
                                <label htmlFor="room_name" className="font-weight-bold">Room name</label>
                                <input type="text" name="room_name" placeholder="Enter room name..." className="form-control" ref={roomNameInput} />
                                
                                <label htmlFor="player_name" className="font-weight-bold">Player name</label>
                                <input type="text" name="player_name" placeholder="Enter your name..." className="form-control" ref={playerNameInput} />

                                <label htmlFor="room_password" className="font-weight-bold">Password</label>
                                <input type="password" name="room_password" placeholder="Enter room password..." className="form-control" ref={roomPasswordInput} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="container text-center">
                                <button className="btn-primary btn text-capitalize font-weight-bold text-white" onClick={createRoom}>create room</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default compose(
    graphql(getRooms, {
        name: "rooms"
    }), 
    graphql(joinRoomMutation, {
        name: "joinroom"
    }), 
    graphql(createRoomMutation, {
        name: "createroom"
    })
)(Room);