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
import FinishScreen from "../layouts/FinishScreen";
import Timer from "../components/Timer";

//**************** Action Types ****************//
export const ACTION = {
    DATA_RECEIVED: "DATA_RECEIVED",
    DATA_FAILED: "DATA_FAILED",
    START_QUIZ: "START_QUIZ",
    NEW_ANSWER: "NEW_ANSWER",
    NEXT_QUESTION: "NEXT_QUESTION",
    FINISH_QUIZ: "FINISH_QUIZ",
    RESTART_QUIZ: "RESTART_QUIZ",
    START_TIMER: "START_TIMER"
}

const SECONDS_PER_QUESTION = 30;

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

/**
 * @description -
 * @param state
 * @param action
 * @returns {(*&{status: string})|{highScore: number, answer: null, questions: ([]|*),
 * secondsRemaining: null, index: number, status: string, points: number}|(*&{highScore: (number|string|SVGPointList|*),
 * status: string})|(*&{secondsRemaining: number, status: (string|*)})|(*&{questions: *, status: string})|(*&{answer: *,
 * points: (*|number|string|SVGPointList)})|(*&{answer: null, index: *})}
 */
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
        case ACTION.START_QUIZ:
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
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
            };
        case ACTION.FINISH_QUIZ:
            return {
                ...state,
                status: "finished",
                highScore:
                    state.points > state.highScore ? state.points : state.highScore,
            };
        case ACTION.RESTART_QUIZ:
            return {
                ...initialState,
                questions: state.questions,
                status: "ready"
            }
        case ACTION.START_TIMER:
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? "finished" : state.status
            }
        default:
            throw new Error("Unknown Action: " + action.type);
    }
}

export default function App() {
    //**************** variables ****************//
    const API_URL = `https://mabdurahman.github.io/questions-api/data/deadly-animals.json`;
    const [state, dispatch] = useReducer(quickQuizReducer, initialState);
    const {questions, index, status, answer, points, highScore, secondsRemaining} = state;
    const numberOfQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((previousValue, currentValue) => previousValue + currentValue.points, 0);

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
                                     answer={answer}/>
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
                            <NextButton dispatch={dispatch}
                                        answer={answer}
                                        numQuestions={numberOfQuestions}
                                        index={index}/>
                        </Footer>
                    </>
                )}
                {status === "finished" && (
                    <FinishScreen
                        points={points}
                        maxPossiblePoints={maxPossiblePoints}
                        highScore={highScore}
                        dispatch={dispatch}
                    />
                )}
            </MainContent>
        </div>

    );
};