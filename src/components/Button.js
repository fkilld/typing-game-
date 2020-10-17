import React from 'react';

const Button = ({handleStart,disabled}) => {
    return (
        <button onClick={handleStart}>{disabled ? 'Start': 'Restart'}</button>
    )
}

export default Button;