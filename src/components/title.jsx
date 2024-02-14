import React from 'react';
import ArrowLeft from './icons/arrowLeft';

const Title = (props) => {
  return (
    <>
      {props.hasBackIcon && (
        <ArrowLeft />
      )}
        <h1> { props.title }</h1 >
    </>
  );
};

export default Title;