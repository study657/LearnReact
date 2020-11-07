import React from 'react';
import EmptyComp from '../EmptyComp/EmptyComp.js';

class Counter extends React.Component{
    constructor(){
        super();
        this.state = {counter: 0};
    };

    addCounter(){
        this.setState({counter: this.state.counter + 1});
    };

    render(){
        // // Способ 1:
        // return (
        //     [
        //         <h2 key={'1'}>Counter {this.state.counter}</h2>,
        //         <button key={'2'} onClick={this.addCounter.bind(this)}>+</button>,
        //         <button key={'3'} onClick={() => this.setState({counter: this.state.counter - 1})}>-</button>
        //     ]
        // );

        // // Способ 2:
        // return (
        //     <React.Fragment>
        //         <h2 key={'1'}>Counter {this.state.counter}</h2>
        //         <button key={'2'} onClick={this.addCounter.bind(this)}>+</button>
        //         <button key={'3'} onClick={() => this.setState({counter: this.state.counter - 1})}>-</button>
        //     </React.Fragment>
        // );

        // Способ 3 (создание своего собственного пустого компонента с нашим названием)
        return (
            <EmptyComp>
                <h2 key={'1'}>Counter {this.state.counter}</h2>
                <button key={'2'} onClick={this.addCounter.bind(this)}>+</button>
                <button key={'3'} onClick={() => this.setState({counter: this.state.counter - 1})}>-</button>
            </EmptyComp>
        );
    };
};

export default Counter;
