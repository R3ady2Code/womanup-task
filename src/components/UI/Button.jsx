import React from 'react';

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={`btn ${props.className}`}>
      {props.children}
    </button>
  );
};

export default Button;
