// Данный файл будет отвечать за редюсер, который относится к тестам, т.к. state компонента QuizList.js и Quiz.js
import { FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_SET_STATE, QUIZ_RETRY } from '../actions/actionTypes.js';
const initialState = { // Создается стейт, с которого начинается все наше приложение (state из файла QuizList.js)
    quizes: [],
    loading: false,
    error: null,

    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: null
};

export default function quizReducer(state = initialState, action){
    switch(action.type){
        case FETCH_QUIZES_START: // Делаем три проверки под наши переменный
            return { // Когда все начинает загружаться возвращаем клонированный state но меняем параметр у loading
                ...state, loading: true
            }
        case FETCH_QUIZES_SUCCESS: // Делаем три проверки под наши переменный
            return {
                ...state, loading: false, quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR: // Делаем три проверки под наши переменный
            return {
                ...state, loading: false, error: action.error
            }

        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz
            }
        case QUIZ_SET_STATE:
            return {
                ...state, answerState: action.answerState, results: action.results
            }

        case FINISH_QUIZ:
            return {
                ...state, isFinished: true
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state, answerState: null, activeQuestion: action.number
            }
        case QUIZ_RETRY:
            return {
                ...state,
                activeQuestion: 0,
                answerState: null,
                isFinished: false,
                results: {}
            }
        default:
            return state;
    }
};