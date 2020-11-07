import React from 'react';
import Carclass from './Car.module.css';
import Redium from 'radium';
import classWith from '../EmptyComp/classWith.js';

const Car = props => {
    let inputClases = [Carclass.input];

    if(props.name != ''){
        inputClases.push(Carclass.green);
    }else{
        inputClases.push(Carclass.red);
    }

    if(props.name.length >= 5){
        inputClases.push(Carclass.bold);
    }

    return (
        <React.Fragment>
            <h3>Car name: {props.name}</h3>
            <p>Year: <strong>{props.year}</strong></p>
            <input className={inputClases.join(' ')} type="text" data-value={props.dataValue} value={props.value} onChange={props.changeName.bind(null)} />
            <button onClick={props.deleteCar.bind(null)}>Удалить</button>
        </React.Fragment>
    );
};

export default classWith(Redium(Car), Carclass.Car);
