import axios from '../../axios/axios-quiz.js';
import { FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS } from './actionTypes.js';

export function fetchQuizes(){
    return async dispatch => {
        dispatch(fetchQuizesStart()) // Продумываем какие функции нам нужно отдиспатчить, чтобы загрузить наш quizes
        try{                                                      // Вырезали это из QuizList.js из метода componentDidMount и вставили
            const response = await axios.get('/quizes.json');

            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            });

            dispatch(fetchQuizesSuccess(quizes)) // Когда мы получаем новый тест, то уже не пользуемся setState, а диспатчим новую функцию которая это будет делать
        }catch(e){
            dispatch(fetchQuizesError(e)) // В случае какой-то ошибки мы будем диспатчить новый екшион
        }
    }
};

export function fetchQuizesStart(){ // Три данные функции всегда должны возвращать какой-то объект с обязательным полем type. А эти тайпы мы делаем в файле actionTypes.js
    return {
        type: FETCH_QUIZES_START
    }
};

export function fetchQuizesSuccess(quizes){
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
};

export function fetchQuizesError(e){
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
};