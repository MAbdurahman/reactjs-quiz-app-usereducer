import React from 'react';

export default function Options({answer, dispatch, question, correctOption, options}) {
    const hasAnswered = answer !== null;

    /*console.log(`options`, question.options)*/

    return (
        <div className={'options'}>
            {options.map((option, index) => (
                <button
                    className={`btn btn-option ${index === answer ? "answer" : ""} ${
                        hasAnswered
                            ? index === correctOption
                                ? "correct"
                                : "wrong"
                            : ""
                    }`}
                    key={option}
                    disabled={hasAnswered}
                    onClick={() => dispatch({ type: "newAnswer", payload: index })}
                >
                    {option}
                </button>
            ))}
        </div>

    );
};