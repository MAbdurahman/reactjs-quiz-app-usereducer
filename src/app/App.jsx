import React, {useEffect, useReducer} from 'react';
import Header from "../layouts/Header";
import MainContent from "../layouts/MainContent";
import Error from "../components/Error";
import Loader from "../components/Loader";
import StartScreen from "../layouts/StartScreen";
import Question from "../components/Question";
import Footer from "../layouts/Footer";
import NextButton from "../components/NextButton";
import ProgressBar from "../components/ProgressBar";

//**************** Action Types ****************//
export const ACTION = {
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
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null
}

function quickQuizReducer(state, action) {
    switch (action.type) {
        case ACTION.DATA_RECEIVED:
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            };
        case ACTION.DATA_FAILED:
            return {
                ...state,
                status: "error"
            };
        case ACTION.START:
            return {
                ...state,
                status: "active",
            };
        case ACTION.NEW_ANSWER:
            const question = state.questions.at(state.index);

            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case ACTION.NEXT_QUESTION:
            return {
                ...state,
                index: state.index + 1,
                answer: null
            }
        default:
            throw new Error("Unknown Action: " + action.type);
    }


}

export default function App() {
    //**************** variables ****************//
    const API_URL = `https://mabdurahman.github.io/questions-api/data/reactjs-questions.json`;
    const [state, dispatch] = useReducer(quickQuizReducer, initialState);
    const {questions, index, status, answer, points, highScore, secondsRemaining} = state;
    const numberOfQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((previousValue, currentValue) => previousValue + currentValue.points, 0);

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
            <Header/>
            <MainContent>
                {status === "loading" && <Loader/>}
                {status === "error" && <Error/>}
                {status === "ready" && (
                    <StartScreen numQuestions={numberOfQuestions} dispatch={dispatch}/>
                )}
                {status === "active" && (
                    <>
                        <ProgressBar index={index} numQuestions={numberOfQuestions} points={points}
                                     maxPossiblePoints={maxPossiblePoints}
                                     answer={answer} />
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>

                            <NextButton dispatch={dispatch}
                                        answer={answer}
                                        numQuestions={numberOfQuestions}
                                        index={index}/>
                        </Footer>
                    </>
                )}
            </MainContent>
        </div>

    );
};