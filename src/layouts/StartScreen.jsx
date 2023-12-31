import React from 'react';
import {ACTION} from "../app/App";

export default function StartScreen({numQuestions, dispatch}) {

    return (
        <div className={"start"}>
            <h2>Welcome To The Quick Quiz</h2>
            <h3>{numQuestions} Questions To Test Your Mastery</h3>
            <button
                className={"btn btn-ui"}
                onClick={() => dispatch({type: ACTION.START_QUIZ})}
            >
                Start Test
            </button>
        </div>
    );
};