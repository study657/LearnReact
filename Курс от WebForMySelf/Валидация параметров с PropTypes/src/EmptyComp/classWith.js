import React from 'react';

const classWith = (Component, className) => {
    return (props) => {
        return (
            <div className={className}>
                <Component {...props} />
            </div>
        );
    };
};

export default classWith;
