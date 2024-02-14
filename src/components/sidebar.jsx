import React, { useState } from 'react';
import {Link } from "react-router-dom";

const Sidebar = () => {
    const [activePage, setActivePage] = useState(window.location.pathname.split("/")[1])
    const navigation = [
        {id:1, name : "Dashboard", pageToShow: "dashboard"},
        {id:2, name : "Products management", pageToShow: "productsManagement"},
        {id:3, name : "Employees management", pageToShow: "employeesManagement"},
        {id:4, name : "Logout", pageToShow:"logout"}
    ]
    
    return (
        <>
            <img src="/logo_circle_product.jpg" alt="Logo de la société Circle Products" />
            <nav>
                <ul>
                    {
                        navigation.map(navigationLink => { 
                            return (
                                <li key={navigationLink.id}><Link className={navigationLink.pageToShow==activePage ? "active" : ""} to={`/${navigationLink.pageToShow}`} onClick={()=>setActivePage(navigationLink.pageToShow)}>{navigationLink.name}</Link></li>
                            )}
                        )
                    }
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;