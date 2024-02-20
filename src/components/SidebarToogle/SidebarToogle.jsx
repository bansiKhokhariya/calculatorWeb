import { React, useState } from 'react'
import ReactDOM from "react-dom";
import './SidebarToogle.css'

const SidebarToogle = () => {

    const [isOpen, setIsopen] = useState(false);

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }

    return (
        <>
            <div className="container-fluid">
                <button className="menu-button" onClick={ToggleSidebar}>
                    ☰
                </button>
                <div className={`sidebar ${isOpen == true ? 'active' : ''}`}>
                    <div className="sd-header">
                        <h4 className="mb-0">Sidebar Header</h4>
                        <div className="menu-close-button" onClick={ToggleSidebar}>&#x2715;</div>
                    </div>
                    <div className="sd-body">
                        <ul>
                            <li><a className="sd-link">Menu Item 1</a></li>
                            <li><a className="sd-link">Menu Item 2</a></li>
                        </ul>
                    </div>
                </div>
                <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
            </div>
        </>
    )
}

export default SidebarToogle