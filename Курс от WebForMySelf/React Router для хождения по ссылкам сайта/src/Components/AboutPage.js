import React, {useState} from 'react';
import classes from './AboutPage.module.css';

function AboutPage(props){
    function goToHomePage(){
        props.history.push('/');
    };

    return (
        <div className={classes.Gen}>
            <h1>О НАС</h1>
            <h3>Мы компания, работающая с 2010 года. У нас много опыта в данной сфере и вообще мы все такие классные. Выбирайте нас и вы не пожалеете!</h3>
            <button onClick={goToHomePage}>Go To Home Page</button>
        </div>
    );
};

export default AboutPage;
