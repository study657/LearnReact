import React, {Component} from 'react';
import classes from './QuizCreator.module.css';
import Button from '../Ui/Button/Button.js';
import {createControl, validate, validateForm} from '../../form/formFramwork.js';
import Input from '../../components/Ui/Input/Input.js';
import Auxililary from '../../hoc/Layout/Auxililary/Auxililary.js';
import Select from '../../components/Ui/Select/Select.js';
import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create';

function createOptionControl(number){
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number,
    }, {reguired: true})
};

function createFormControls(){
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {reguired: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    };
};

class QuizCreator extends Component{
    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    };

    submitHandler = event => {
        event.preventDefault();
    };

    addQuestionHandler = (event) => {
        event.preventDefault();

        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        };

        this.props.createQuizQuestion(questionItem);

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        });
    };

    createQuizHandler = event => {
        event.preventDefault();
            
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        });
        this.props.finishCreateQuiz();

        // Это уже старый метор, применяется уже более новый, он выше с асинк
        // axios.post('https://react-quiz-b7c90-default-rtdb.firebaseio.com/quizes.json', this.state.quiz).then(response => {
        //     console.log(response);
        // }).catch(error => console.log(error));
        
        // TODO: SERVER
    };

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control      = {...formControls[controlName]};

        control.touched = true;
        control.value   = value;
        control.valid   = validate(control.value, control.vaidation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        });
    };

    renderControls(){
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Auxililary key={controlName + index}>
                    <Input 
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </Auxililary>
            );
        });
    };

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        });
    };

    render(){
        const select = <Select 
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}

                        {select}

                        <br/>
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <br/>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={!this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    };
};

function mapStateToProps(state){ // Создаем эту функцию для работы
    return {
        quiz: state.create.quiz
    }
};

function mapDispatchToProps(dispatch){ // Создаем эту функцию для работы
    return { // В этой функции мы будем говорить, что ей нужно загрузить какой-то набор тестов для работы
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);