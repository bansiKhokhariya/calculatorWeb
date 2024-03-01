import { React, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './SidebarToogle.css'
import { Button } from 'react-bootstrap';

const SidebarToogle = ({ openHistoryModal }) => {

    const [isOpen, setIsopen] = useState(false);
    const [previousPath, setPreviousPath] = useState('');

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }

    const location = useLocation();

    // Check if the current URL is "/"
    const isRootHome = location.pathname === "/";

    const navigate = useNavigate()

    return (
        <>
            <div className="container-fluid">
                <div className='navbar-section'>
                    {isRootHome
                        ?
                        <button className="menu-button" onClick={ToggleSidebar}>
                            ☰
                        </button>
                        :
                        <button onClick={() => navigate(-1)} className="menu-button">
                            🏠︎
                        </button>
                    }

                    <Button className="btn btn-sm btn-dark" onClick={openHistoryModal}>History</Button>

                </div>
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