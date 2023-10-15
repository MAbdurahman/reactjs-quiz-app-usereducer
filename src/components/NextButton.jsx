import React from 'react';

export default function NextButton({dispatch, answer, currentIndex, numQuestions}) {

    if(answer === null) {
        return null;
    }

    if (currentIndex < numQuestions - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "nextQuestion" })}
            >
                Next
            </button>
        );

    if (currentIndex === numQuestions - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "finish" })}
            >
                Finish
            </button>
        );
};