import React, { useState, useEffect } from 'react';
import './Setting.css';
import SidebarToogle from '../SidebarToogle/SidebarToogle';
import { Modal, Button } from "react-bootstrap";

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
        if (selectedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
    }, [selectedTheme]);

    return (
        <>
            <div className='sd-inner-menu-section'>
                <SidebarToogle />
                <div className='setting-container'>
                    <ul className='setting-menu'>
                        <li onClick={handleShow}>
                            <div>
                                Background Colour
                            </div>
                            <div className='setting-inner-menu-value'>
                                {selectedTheme || 'Select Theme'}
                            </div>
                        </li>
                        <li>Currency Format</li>
                        <li>Set up Calculator Shortcut</li>
                        <li>Confirm before exit app</li>
                    </ul>
                </div>

                <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-centered  bd-example-modal-sm">
                    <Modal.Header >
                        <Modal.Title>Background Colour</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className='setting-inner-menu'>
                            <li onClick={() => handleThemeSelect('light')}>Light Mode</li>
                            <li onClick={() => handleThemeSelect('dark')}>Dark Mode</li>
                        </ul>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default Setting;
