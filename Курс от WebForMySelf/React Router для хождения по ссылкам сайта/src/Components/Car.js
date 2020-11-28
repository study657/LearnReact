import React from 'react';
import {withRouter} from 'react-router-dom';

function Car(props){
    return (
        <div onClick={() => props.history.push('/cars' + props.name.toLowerCase())}>
            <h2>{props.name}</h2>
            <p>Год выпуска: {props.year}</p>
            <p>Цена: {props.price} рублей</p>
        </div>
    );
};

export default withRouter(Car);
