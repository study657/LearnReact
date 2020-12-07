import React from 'react';
import classes from './Input.module.css';

function isInvalid({valid, touched, shouldValidate}){
    return !valid && shouldValidate && touched;
};

const Input = props => {
    const inputPype = props.type || 'text';
    const cls       = [classes.Input];
    const htmlFor   = `${inputPype}-${Math.random()}`;

    if(isInvalid(props)){
        cls.push(classes.invalid);
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input type={inputPype} id={htmlFor} value={props.value} onChange={props.onChange}/>

            {isInvalid(props) ? <span>{props.errorMessage || 'Введите верное значение'}</span> : null}
        </div>
    );
};

export default Input;