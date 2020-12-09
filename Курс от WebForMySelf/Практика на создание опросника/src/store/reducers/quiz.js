// Данный файл будет отвечать за редюсер, который относится к тестам, т.к. state компонента QuizList.js и Quiz.js
import { FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS } from '../actions/actionTypes.js';
const initialState = { // Создается стейт, с которого начинается все наше приложение (state из файла QuizList.js)
    quizes: [],
    loading: false,
    error: null
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
        default:
            return state;
    }
};