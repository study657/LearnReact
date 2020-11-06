import React, {Component} from 'react';
import Radium from 'radium';
import Carclass from './Car.module.css';

class Car extends Component{
    render(){
        let inputClases = [Carclass.input];

        if(this.props.name != ''){
            inputClases.push(Carclass.green);
        }else{
            inputClases.push(Carclass.red);
        }

        if(this.props.name.length >= 5){
            inputClases.push(Carclass.bold);
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
            <div className={Carclass.Car} style={styleCar}>
                <h3>Car name: {this.props.name}</h3>
                <p>Year: <strong>{this.props.year}</strong></p>
                <input className={inputClases.join(' ')} type="text" data-value={this.props.dataValue} value={this.props.value} onChange={this.props.changeName.bind(null)} />
                <button onClick={this.props.deleteCar.bind(null)}>Удалить</button>
            </div>
        );
    };
};

export default Radium(Car);
