import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {createStore, compose, applyMiddleware} from 'redux'; // Для создания этой библиотеки вводим команду: npm install redux react-redux. Импорт функции для работы со стором и вторая функция для работы с compose
import {Provider} from 'react-redux'; // Импорт компонента Provider
import rootReducer from './store/reducers/rootReducer.js'; // Импортируем наш rootReducer
import thunk from 'redux-thunk'; // Для установки данной библиотеки делается команда npm install react-thunk

const composeEnhancers =                                        // Данная функция была взята из github https://github.com/zalmoxisus/redux-devtools-extension в разделе 1.2 Advanced store setup
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
); // Создаем переменную store, которая определяется импортированной нами функцией, в которую нужно будет передать параметры (редюсеры) - это первый параметр и вторым параметром передаем composeEnhancers в которую в свою очередь передается функция applyMiddleware

const aplication = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      {aplication}
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
