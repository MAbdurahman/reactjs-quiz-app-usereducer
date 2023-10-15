import React from 'react';
import {ACTION} from "../app/App";

export default function Options({answer, dispatch, question}) {
    const hasAnswered = answer !== null;

    return (
        <div className={'options'}>
            {question.options.map((option, index) => (
                <button
                    className={`btn btn-option ${index === answer ? "answer" : ""} ${
                        hasAnswered
                            ? index === question.correctOption
                                ? "correct"
                                : "wrong"
                            : ""
                    }`}
                    key={option}
                    disabled={hasAnswered}
                    onClick={() => dispatch({type: ACTION.NEW_ANSWER, payload: index})}
                >
                    {option}
                </button>
            ))}
        </div>

    );
};