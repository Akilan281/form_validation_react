import React,{useState} from 'react'
import './styles/navbar.css'
import {SCREEN} from '../../common/Constant'
import { useLocation } from 'react-router-dom'

function NavBarComponent() {
    let location = useLocation();

    const [activemenu, setActivemenu] = useState("Home")

    function selectedMenu() {
        setActivemenu('')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark header">
        
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className=" justify-content-space collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ">
                <li className="nav-item  " >
                <div className="nav-number">1</div> <div className={`nav-link ${location.pathname === SCREEN.PERSONAL ? 'active' : ''}`} href={SCREEN.PERSONAL}> Personal  Personal Details</div>
                </li>
                <li className="nav-item ">
                <div className="nav-number">2</div><div className={`nav-link ${location.pathname === SCREEN.OFFICE ? 'active' : ''}`} href={SCREEN.OFFICE}>Company Details</div>
                </li>
                <li className="nav-item ">
                <div className="nav-number">3</div><div className={`nav-link ${location.pathname === SCREEN.VERIFICATION ? 'active' : ''}`} href={SCREEN.VERIFICATION}>  Email Verification</div>
                </li>
              
            </ul>
        </div>
    </nav>
    )
}

export default NavBarComponent
