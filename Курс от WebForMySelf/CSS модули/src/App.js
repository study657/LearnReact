import { render } from '@testing-library/react';
import React, {Component} from 'react';
import './App.css';
import Car from './Car/Car.js';

class App extends Component{
  constructor(){
    super();
    this.state = {cars: [
        {name: 'Ford', year: '2018'},
        {name: 'Mazda', year: '2016'},
        {name: 'Audi', year: '2015'},
        {name: 'BMW', year: '2012'},
      ], pageTitle: 'Автосалон', showCars: false, button: 'Показать'
    };
  };

  changeInput(event){
    this.setState({pageTitle: event.target.value});
  };

  showCars(){
    this.setState({showCars: !this.state.showCars});

    if(this.state.showCars){
      this.setState({button: 'Показать'});
    }else{
      this.setState({button: 'Скрыть'});
    }
  };

  deleteCar(index){
    this.state.cars.splice(index, 1);
    this.setState({cars: this.state.cars});
  };

  changeName(event){
    let index = event.target.dataset.value;
    this.state.cars[index].name = event.target.value;
    this.setState({cars: this.state.cars});
  };
  
  render(){
    const cars = this.state.cars.map((car, index) => {
      return <div key={index} style={{width: '400 px', margin: 'auto', paddingTop: '20px'}}>
        <Car name={car.name} year={car.year} dataValue={index} value={car.name} changeName={this.changeName.bind(this)} deleteCar={this.deleteCar.bind(this, index)} />
      </div>;
    });

    return (
      <div className="App">
        <h1>{this.state.pageTitle}</h1>
        <input type="text" onChange={this.changeInput.bind(this)} />
        <button onClick={this.showCars.bind(this)}>{this.state.button}</button>
        {this.state.showCars ? cars : ''}
      </div>
    );
  };
};

export default App;
