import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import classes from './QuizList.module.css';
import Loader from '../../components/Ui/Loader/Loader.js';
import { connect } from 'react-redux'; // Импортируем функцию из библиотеки и оборачиваем в нее наше приложение внизу при экспорте
import {fetchQuizes} from '../../store/actions/quiz.js'; // Импортируем функцию fetchQuizes из файла

class QuizList extends Component{
    renderQuizes(){
        return this.props.quizes.map((quiz) => {  // Теперь мы обращаемся к props потому что теперь это получается как параметр
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            );
        });
    };

    componentDidMount(){ // Переделываем эту функцию в соответствии с redux технологией
        this.props.fetchQuizes(); // Вызываем данную функцию, которая в свою очередь будет диспатчить новый action creatorFetchQuizes
        // try{
        //     const response = await axios.get('/quizes.json');

        //     const quizes = [];
        //     Object.keys(response.data).forEach((key, index) => {
        //         quizes.push({
        //             id: key,
        //             name: `Тест №${index + 1}`
        //         })
        //     });

        //     this.setState({
        //         quizes,
        //         loading: false
        //     });
        // }catch(e){
        //     console.log(e);
        // }
    };

    render(){
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>

                    { this.props.loading && this.props.quizes.length !== 0 ? <Loader /> : <ul>{this.renderQuizes()}</ul> }
                </div>
            </div>
        );
    };
};

function mapStateToProps(state){ // Создаем эту функцию для работы
    return {
        quizes: state.quiz.quizes, // Эти два параметра описаны в начальном стейте
        loading: state.quiz.loading
    }
};

function mapDispatchToProps(dispatch){ // Создаем эту функцию для работы
    return { // В этой функции мы будем говорить, что ей нужно загрузить какой-то набор тестов для работы
        fetchQuizes: () => dispatch(fetchQuizes()) // функция для диспатчев
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList); // Во вторые скобки передаем компонент в который хотим обернуть нашу функцию, чтобы этот компонент взаимодействовал со стором