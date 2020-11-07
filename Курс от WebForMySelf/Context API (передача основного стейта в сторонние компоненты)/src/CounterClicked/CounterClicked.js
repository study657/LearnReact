import React from 'react';
import {ClickedContext} from '../App.js';

export default () => {
    return (
        <div style={{border: '1px solid #ccc', width: 200, margin: '0 auto'}}>
            <h3>CounterClicked</h3>
            <ClickedContext.Consumer>
                {clicked => clicked ? <p>Yeee Clicked!!!</p> : null}
            </ClickedContext.Consumer>
        </div>
    );
};