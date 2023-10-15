import React, {useReducer} from 'react';

const initialState = {count: 0, step: 1};

/**
 * @description - manages the state and action types for the useReducer for DateCounter
 * @param state - the count and the step
 * @param action - the action types
 * @returns {(*&{count: *})|{count: number, step: number}|(*&{step: *})|(*&{count: number})}
 */
function dateCounterReducer(state, action) {
    console.log(state, action);

    switch (action.type) {
        case "decrease":
            return {...state, count: state.count - state.step};
        case "increase":
            return {...state, count: state.count + state.step};
        case "setCount":
            return {...state, count: action.payload};
        case "setStep":
            return {...state, step: action.payload};
        case "reset":
            return initialState;
        default:
            throw new Error("Unknown Action: " + action.type);
    }
}

export default function DateCounter() {
    //**************** variables ****************//
    const [state, dispatch] = useReducer(dateCounterReducer, initialState);
    //**************** destruct variables from state ****************//
    const {count, step} = state;

    console.log(state);

    const date = new Date();
    date.setDate(date.getDate() + count);

    //**************** functions ****************//
    const decrementCount = function () {
        dispatch({type: 'decrease'});
    };

    const incrementCount = function () {
        dispatch({type: 'increase'});
    };

    const handleCount = function (e) {
        dispatch({type: "setCount", payload: Number(e.target.value)});
    };

    const handleStep = function (e) {
        dispatch({type: "setStep", payload: Number(e.target.value)});
    };

    const resetDateCounter = function () {
        dispatch({type: "reset"})
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={handleStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={decrementCount}>-</button>
                <input value={count} onChange={handleCount}/>
                <button onClick={incrementCount}>+</button>
            </div>

            <p className={'paragraph--date'}>{date.toDateString()}</p>

            <div>
                <button className={'button--date'} onClick={resetDateCounter}>Reset</button>
            </div>
        </div>
    );
};