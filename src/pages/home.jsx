import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import "../assets/style/style.less";
import "../assets/style/mobile-style.less";
import MenuHamburger from "../components/menuMobile/menuHamburger";

const Home = () => {
        if(window.innerWidth <= 440 || window.innerWidth<=1025){
            localStorage.setItem("device","mobile");
        }else{
            localStorage.setItem("device","desktop")
        }
    const device = localStorage.getItem("device");
    return (
        <>
            <div style={{display:"flex"}} className={device}>
                {device == "mobile" && <MenuHamburger />}
                {device != "mobile" && (
                <aside className="sidebar">
                    <Sidebar />
                </aside>
                )}
                <main className='container'>
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default Home;