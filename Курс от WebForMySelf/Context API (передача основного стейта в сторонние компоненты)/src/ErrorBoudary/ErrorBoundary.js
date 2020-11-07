import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(){
        super();
        this.state = {hasError: false};
    };

    componentDidCatch(error, info){
        this.setState({hasError: true});
    };

    render(){
        if(this.state.hasError){
            return <h1 style={{color: 'red'}}>ОШИБКА! Обратитесь к администратору!</h1>;
        }

        return this.props.children;
    };
};

export default ErrorBoundary;
