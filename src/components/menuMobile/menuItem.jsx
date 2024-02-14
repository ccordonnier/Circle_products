import React from 'react';
import { Link } from 'react-router-dom';


const MenuItem = ({setOpen, navigationLink, activePage}) => {

  return (
    <>
      <li key={navigationLink.id}><Link onClick={()=>setOpen(false)}className={navigationLink.pageToShow==activePage ? "active" : ""} to={navigationLink.pageToShow}>{navigationLink.name}</Link></li>
    </>
  );
};

export default MenuItem;