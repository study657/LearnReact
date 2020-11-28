import React from 'react';

function DetailCar(props){
    return (
        <div>
            <h1>{props.match.params.name}</h1>
        </div>
    );
};

export default DetailCar;
