import { React, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './SidebarToogle.css'

const SidebarToogle = () => {

    const [isOpen, setIsopen] = useState(false);

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }

    const location = useLocation();

    // Check if the current URL is "/"
    const isRootHome = location.pathname === "/";

    return (
        <>
            <div className="container-fluid">
                {isRootHome
                    ?
                    <button className="menu-button" onClick={ToggleSidebar}>
                        ☰
                    </button>
                    :
                    <Link to={'/'}>
                        <button className="menu-button">
                            🏠︎
                        </button>
                    </Link>
                }

                <div className={`sidebar ${isOpen == true ? 'active' : ''}`}>
                    <div className="sd-header">
                        <h4 className="mb-0">Sidebar Header</h4>
                        <div className="menu-close-button" onClick={ToggleSidebar}>&#x2715;</div>
                    </div>
                    <div className="sd-body">
                        <ul>
                            <Link to={'/allCategory'}>
                                <li>All by Category</li>
                            </Link>
                            <Link to={'/setting'}>
                                <li>Setting</li>
                            </Link>
                            <Link to={'/'}>
                                <li>Shortcut Calculator</li>
                            </Link>
                            <Link to={'/'}>
                                <li>About </li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
            </div>
        </>
    )
}

export default SidebarToogle