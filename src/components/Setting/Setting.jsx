import React, { useState, useEffect } from 'react';
import SidebarToogle from '../SidebarToogle/SidebarToogle';
import { Modal } from "react-bootstrap";


const Setting = () => {
    const [show, setShow] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState('');

    useEffect(() => {
        const storedTheme = localStorage.getItem('selectedTheme');
        if (storedTheme) {
            setSelectedTheme(storedTheme);
        }
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleThemeSelect = (theme) => {
        setSelectedTheme(theme);
        localStorage.setItem('selectedTheme', theme);
        handleClose();
    };

    useEffect(() => {
        if (selectedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, [selectedTheme]);


    return (
        <>
            <SidebarToogle />
            <div className="accordion sidebar-menu bg-light">
                <div className="card" role="button">
                    <div className="card-header bg-light card-text">
                        <div onClick={handleShow} className='d-flex justify-content-between'>
                            Theme
                            <div className='setting-inner-menu-value'>
                                {selectedTheme || 'Select Theme'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card" role="button">
                    <div className="card-header bg-light card-text">
                        <div className='d-flex justify-content-between'>
                            Currency Format
                        </div>
                    </div>
                </div>
                <div className="card" role="button">
                    <div className="card-header bg-light card-text">
                        <div className='d-flex justify-content-between'>
                            Set up Calculator Shortcut
                        </div>
                    </div>
                </div>
                <div className="card" role="button">
                    <div className="card-header bg-light card-text">
                        <div className='d-flex justify-content-between'>
                            Confirm before exit app
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-centered  bd-example-modal-sm">
                <Modal.Header >
                    <Modal.Title>Theme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='setting-inner-menu'>
                        <label>
                            <input
                                type="radio"
                                value="light"
                                checked={selectedTheme === 'light'}
                                onChange={() => handleThemeSelect('light')}
                            />
                          &nbsp;  Light Mode
                        </label>
                        <label className='ms-5'>
                            <input
                                type="radio"
                                value="dark"
                                checked={selectedTheme === 'dark'}
                                onChange={() => handleThemeSelect('dark')}
                            />
                           &nbsp; Dark Mode
                        </label>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Setting;
