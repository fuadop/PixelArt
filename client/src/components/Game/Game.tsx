import React, {FC} from "react";
import { graphql } from "react-apollo";
// import compose from "lodash.flowright";
import {getRoom} from "../../GraphQl/Queries";

const Game: FC<any> = (props) => {

    if(props.room.loading) {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <div>
            <h1 className="display-4">
                {props.room.room.name}
            </h1>
            <h1 className="display-4">
                {props.room.room.player1}
            </h1>
            <h1 className="display-4">
                {props.room.room.player2}
            </h1>
        </div>
    )
}

export default graphql(getRoom, {
    name: "room",
    options: (props: any) => ({
        variables: {
            id: props.match.params.id
        }
    })
})(Game);
