import React from 'react';

const ChevronDown = (props) => {
  const handleClick = () => {
    return props.onClick??true;
  }
  return (
    <>
      <i onClick={()=>handleClick}>
        <svg xmlns="http://www.w3.org/2{000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </i>
    </>
  );
};

export default ChevronDown;