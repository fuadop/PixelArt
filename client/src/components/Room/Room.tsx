import React, { FC , useRef, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import {graphql} from "react-apollo";
import compose from "lodash.flowright";
import Navbar from "../Navbar";
import {getRooms} from "../../GraphQl/Queries";
import { joinRoomMutation } from "../../GraphQl/Mutations";
import { RoomProps, IRoom } from "../interfaces";
import { Redirect } from "react-router-dom";
import SearchImage from "../images/loupe.svg";

const Room: FC<RoomProps | any > = (props) => {
    const [currentRoom, setCurrentRoom] = useState<string>("");
    const searchBar = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);

    const joinRoom = () => {
        return props.joinroom({
            variables: {
                roomid: currentRoom,
                player2: nameInput.current!.value,
                password: passwordInput.current!.value
            }
        }).then((res: any) => {
            return <Redirect to={`${res.data.joinRoom.id}`}/>
        }).catch((err: any) => {
            alert("Invalid password");
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
                                <button className="btn btn-primary" data-toggle="modal" data-target="#password_modal" onClick= {e => {
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
            <Navbar path="/rooms"/>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-2 text-right align-middle">
                        <img src={SearchImage} alt="search-icon" style={{width: "40px"}}/>
                    </div>
                    <div className="col-8">
                        <input type="text" className="form-control" placeholder="Search for a room.." ref={searchBar} />
                    </div>
                    <div className="col-2">
                        <button className="btn btn-warning text-white font-weight-bold">Create Room</button>
                    </div>
                </div>
            </div>
            <div className="rooms p-5">
                <div className="container">
                    {renderRooms()}
                </div>
            </div>

            <div className="modal" id="password_modal">
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
        </div>
    );
}

export default compose(
    graphql(getRooms, {
        name: "rooms"
    }), 
    graphql(joinRoomMutation, {
        name: "joinroom"
    })
)(Room);