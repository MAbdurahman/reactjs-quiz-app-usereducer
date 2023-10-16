import React from 'react';
import {ACTION} from "../app/App";

export default function NextButton({dispatch, answer, index, numQuestions}) {

    if (answer === null) {
        return null;
    }

    if (index < numQuestions - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({type: ACTION.NEXT_QUESTION})}
            >
                Next
            </button>
        );

    if (index === numQuestions - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({type: ACTION.FINISH_QUIZ})}
            >
                Finished Quiz
            </button>
        );
};