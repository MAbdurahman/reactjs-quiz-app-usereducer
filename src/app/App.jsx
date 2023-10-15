import React, {useEffect, useReducer} from 'react';
import Header from "../layouts/Header";

//**************** Action Types ****************//
const ACTION = {
    DATA_RECEIVED: "DATA_RECEIVED",
    DATA_FAILED: "DATA_FAILED",
    START: "START",
    NEW_ANSWER: "NEW_ANSWER",
    NEXT_QUESTION: "NEXT_QUESTION",
    FINISH: "FINISH",
    RESTART: "RESTART",
    TICK: "TICK"
}

//**************** initial state ****************//
const initialState = {
    questions: [],
    // statuses -> active, error, finished, loading, ready
    status: "ready",
    index: 0,
}

function quickQuizReducer(state, action) {
    switch(action.type) {
        case ACTION.DATA_RECEIVED:
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            }
        case ACTION.DATA_FAILED:
            return {
                ...state,
                status: "error"
            }
            default:
                throw new Error("Unknown Action: " + action.type);
    }


}
export default function App() {
    //**************** variables ****************//
    const API_URL = `https://mabdurahman.github.io/questions-api/data/reactjs-questions.json`;
    const [state, dispatch] = useReducer(quickQuizReducer, initialState);
    const {questions, index, status} = state;

    console.log(`questions: `, questions);
    console.log(`index: `, index);

    //**************** functions ****************//
    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => dispatch({type: ACTION.DATA_RECEIVED, payload: data}))
            .catch((err) => dispatch({type: ACTION.DATA_FAILED}));
    }, [API_URL]);

    return (
        <div className={'app'}>
            <Header />
        </div>

    );
};