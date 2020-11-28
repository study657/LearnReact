import React, {useState} from 'react';
import classes from './CarsPage.module.css';
import Car from './Car.js';

function CarsPage(){
    const initeCars = [
        {name: 'BMW M3', year: '2017', price: '2.000.000'},
        {name: 'BMW M5', year: '2018', price: '3.000.000'},
        {name: 'BMW X5', year: '2019', price: '5.000.000'}
    ];

    const [cars, setCars] = useState(initeCars);

    const result = cars.map((car, index) => {
        return <Car key={index} name={car.name} year={car.year} price={car.price} />;
    });

    return (
        <div className={classes.Gen}>
            <h1>Мы предлагаем следующий модельный ряд машин:</h1>
            {result}
        </div>
    );
};

export default CarsPage;
