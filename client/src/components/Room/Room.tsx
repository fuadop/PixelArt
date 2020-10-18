import React, { FC } from "react";
import Navbar from "../Navbar";

const Room: FC<{}> = () => {
    return (
        <div>
            <Navbar path="/rooms"/>
        </div>
    );
}

export default Room;