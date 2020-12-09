import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.js';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz.js';
import Loader from '../../components/Ui/Loader/Loader.js'
import { connect } from 'react-redux'; // Подключаем функцию connect
import { fetchQuizesById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';

class Quiz extends Component{

    componentDidMount(){
        this.props.fetchQuizesById(this.props.match.params.id);
    };

    componentWillUnmount(){
        this.props.retryQuiz();
    };

    render(){
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    { 
                        this.props.loading || !this.props.quiz
                        ? <Loader />
                        : this.props.isFinished 
                        ? 
                        <FinishedQuiz 
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onRetry={this.props.retryQuiz}
                        />
                        :
                        <ActiveQuiz 
                            answers={this.props.quiz[this.props.activeQuestion].answers} 
                            question={this.props.quiz[this.props.activeQuestion].question}
                            onAnswerClick={this.props.quizAnswerClick}
                            quizLength={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion + 1}
                            state={this.props.answerState}
                        />
                    }
                </div>
            </div>
        );
    };
};

function mapStateToProps(state){ // Создаем эту функцию для работы
    return {
        results: state.quiz.results,         // Эти параметры описаны в начальном стейте
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
};

function mapDispatchToProps(dispatch){ // Создаем эту функцию для работы
    return { // В этой функции мы будем говорить, что ей нужно загрузить какой-то набор тестов для работы
        fetchQuizesById: (id) => dispatch(fetchQuizesById(id)), // функции для диспатчев
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);