import React from 'react';
import Options from "./Options";

export default function Question({question, dispatch, answer, correctOption, options}) {


    return (
        <div>
            <h4>{question}</h4>
            <Options question={question} options={options} correctOption={correctOption} dispatch={dispatch}
                     answer={answer}/>
        </div>

    );
};