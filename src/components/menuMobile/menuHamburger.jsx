import React, {useState} from 'react';
import "../../assets/style/menu-mobile.less";
import MenuItem from './menuItem';


const MenuHamburger = () => {
  const [open,setOpen] = useState(false);
  const [activePage, setActivePage] = useState(window.location.pathname.replace("/",""))
  const navigation = [
    {id:1, name : "Dashboard", pageToShow: "dashboard"},
    {id:2, name : "Products management", pageToShow: "productsManagement"},
    {id:3, name : "Employees management", pageToShow: "employeesManagement"},
    {id:4, name : "logout", pageToShow:"logout"}
  ]
  
  return (
    <header>
      <div className='menu-header'>
        <img src="/logo_circle_product.jpg" alt="Logo de la société Circle Products" />
        <div className='menu-mobile__icon' onClick={()=>setOpen(!open)}>{open?"x":"="}</div>
      </div>
      <nav className={"menu-navigation " + (open ? "open" : "") }>
        <ul>
          {navigation.map( navigationLink => <MenuItem setOpen={setOpen} key={navigationLink.id} navigationLink={navigationLink} activePage={activePage} />)}
        </ul>
      </nav>
    </header>
  );
};

export default MenuHamburger;