import React, { FC , useRef} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import {graphql} from "react-apollo";
import Navbar from "../Navbar";
import {getRooms} from "../../GraphQl/Queries";
import { RoomProps, IRoom } from "../interfaces";
import { Link } from "react-router-dom";

const Room: FC<RoomProps | any > = (props) => {
    const searchBar = useRef<HTMLInputElement>(null)

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
                    <div className="card border-0 shadow-sm" key={room.id}>
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
                                <Link to="/" className="btn btn-primary">
                                    Join room
                                </Link>
                            }
                        </div>
                    </div>
                )
            })
        )
    }

    return (
        <div>
            <Navbar path="/rooms"/>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-2 text-center align-middle">
                        {/*TODO: Add search image*/}
                        
                    </div>
                    <div className="col-8">
                        <input type="text" className="form-control" placeholder="Search for a room.."/>
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
        </div>
    );
}

export default graphql(getRooms, {
    name: "rooms"
})(Room);