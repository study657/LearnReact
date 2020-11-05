import React, {Component} from 'react';
import Radium from 'radium';
import Classes from './Car.module.css';

class Car extends Component{
    render(){
        let inputClases = [Classes.input];

        if(this.props.name != ''){
            inputClases.push(Classes.green);
        }else{
            inputClases.push(Classes.red);
        }

        if(this.props.name.length >= 5){
            inputClases.push(Classes.bold);
        }

        let styleCar = {
            border: '2px solid #ccc',
            boxShadow: '0 4px 5px 0 rgba(0, 0, 0, .14)',
            ':hover': {
                border: '2px solid #aaa',
                boxShadow: '0 4px 15px 0 rgba(0, 0, 0, .25)',
                cursor: 'pointer'
            }
        };

        return (
            <div className={Classes.Car} style={styleCar}>
                <h3>Car name: {this.props.name}</h3>
                <p>Year: <strong>{this.props.year}</strong></p>
                <input className={inputClases.join(' ')} type="text" data-value={this.props.dataValue} value={this.props.value} onChange={this.props.changeName.bind(null)} />
                <button onClick={this.props.deleteCar.bind(null)}>Удалить</button>
            </div>
        );
    };
};

export default Radium(Car);
