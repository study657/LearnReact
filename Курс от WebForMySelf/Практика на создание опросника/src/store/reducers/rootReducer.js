// rootReducer то по сути функция, которая объединяет все существующие редюсеры
import {combineReducers} from 'redux'; // Импортируем функцию для объединения всех существующих редюсеров
import quizReducer from './quiz.js'; // Импортируем наш редюсер

export default combineReducers({
    quiz: quizReducer // Создали новый стейт
});