import React, {FC, useEffect} from 'react'

const Game: FC<any> = (props) => {

    return (
        <div>
            <h1>{ props.match.params.id}</h1>
        </div>
    )
}

export default Game
