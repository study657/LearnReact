import axios from 'axios';
import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes.js';

export function auth(email, password, isLogin){
    return async dispatch => {
        const authData = {email, password,returnSecureToken: true};

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBzFgtqZ0gSd6AcQnn6cf4eGnYkjK5NEUQ';

        if(isLogin){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBzFgtqZ0gSd6AcQnn6cf4eGnYkjK5NEUQ';
        }

        const response = await axios.post(url, authData);
        const data = response.data;

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000) // Здесь мы должны проверять время, т.к. обычно время действия токена дается на 3600 минут, после этого токен сбросится и нужно будет перезайти

        localStorage.setItem('token', data.idToken); // Заносим в локальное хранилище информацию о токене пользователя
        localStorage.setItem('userId', data.localId); // Заносим в локальное хранилище информацию об айди пользователя
        localStorage.setItem('expirationDate', expirationDate); // Заносим в локальное хранилище информацию о корректной дате сброса ключей

        dispatch(authSuccess(data.idToken)) // Отдиспатчиваем после всех этих манипуляций с локальным хранилищем наш токен ждя того, чтобы поддерживать локальную сессию
        dispatch(autoLogout(data.expiresIn)) // Задаем, что после 1 часа мы будем делать так, что пользователь потеряет авторизацию на сайте и ему нужно будет по новой войти
    }
};

export function autoLogout(time){
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000);
    }
};

export function logout(){
    localStorage.removeItem('token'); // Зачищаем локальное хранилище
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return {
        type: AUTH_LOGOUT
    }
};

export function autoLogin(){
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate')) // Создаем переменную для проверки валидности токена на данный момент
            if(expirationDate <= new Date()){
                dispatch(logout());
            }else{
                dispatch(authSuccess(token));
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
};

export function authSuccess(token){
    return {
        type: AUTH_SUCCESS,
        token
    }
};