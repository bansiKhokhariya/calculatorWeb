import React from 'react'
import SidebarToogle from '../SidebarToogle/SidebarToogle'


const AllCategory = () => {
    return (
        <>
            <div className='sd-inner-menu-section'>
                <SidebarToogle />
                <div className='setting-container'>
                    <ul className='setting-menu'>
                        <li>General Calculator</li>
                        <li>Loan Calculator</li>
                        <li>Finance and Investment</li>
                        <li>Retirement</li>
                        <li>Bond </li>
                        <li>Business Accounting </li>
                        <li>Date and Time </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AllCategory