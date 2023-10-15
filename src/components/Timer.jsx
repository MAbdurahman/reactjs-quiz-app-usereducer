import React, {useEffect} from 'react';
import {ACTION} from "../app/App";

export default function Timer({dispatch, secondsRemaining}) {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(
        function () {
            const id = setInterval(function () {
                dispatch({type: ACTION.START_TIMER});
            }, 1000);

            return () => clearInterval(id);
        },
        [dispatch]
    );

    return (
        <div className="timer">
            {minutes < 10 && "0"}
            {minutes}:{seconds < 10 && "0"}
            {seconds}
        </div>
    );
};