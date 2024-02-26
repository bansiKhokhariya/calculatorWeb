import { React, useState } from 'react'
import SidebarToogle from '../SidebarToogle/SidebarToogle'
import './AllCategory.css'
import { Link } from 'react-router-dom'


const AllCategory = () => {

    return (
        <>
            <SidebarToogle />
            <div className='sd-inner-menu-section'>
                <div className='setting-container'>
                    <ul className='setting-menu'>
                        <li className='category-inner-item'>
                            <input className="setting-menu-input" type="checkbox" name="setting-menu-item" id="setting-menu-item-1" />
                            <label htmlFor="setting-menu-item-1">
                                <svg className='down-arrow-svg' xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none">
                                    <path d="M7.49997 9.30044C7.23114 9.30044 6.96235 9.19779 6.75739 8.99294L0.307713 2.54319C-0.102571 2.13291 -0.102571 1.46771 0.307713 1.05759C0.71783 0.647471 1.3829 0.647471 1.79322 1.05759L7.49997 6.76468L13.2068 1.05779C13.617 0.64767 14.2821 0.64767 14.6921 1.05779C15.1026 1.46791 15.1026 2.13311 14.6921 2.54339L8.24256 8.99313C8.0375 9.19803 7.76871 9.30044 7.49997 9.30044Z" fill="#007B42" />
                                </svg>
                                &nbsp;
                                &nbsp;
                                General Calculator
                            </label>
                            <ul className="setting-menu-item-inner-list">
                                <Link className='redirect-link' to={'/'}>
                                    <li>Calculator</li>
                                </Link>
                                <Link className='redirect-link' to={'/calculator/percentageCalculator'}>
                                    <li>Percentage Calculator</li>
                                </Link>
                                <Link className='redirect-link' to={'/calculator/bmiCalculator'}>
                                    <li>BMI Calculator</li>
                                </Link>
                                <Link className='redirect-link' to={'/calculator/numberToWordConverter'}>
                                    <li>Number To Word Converter</li>
                                </Link>
                                <Link className='redirect-link' to={'/calculator/unitConverter'}>
                                    <li>Unit Converter</li>
                                </Link>
                            </ul>
                        </li>
                        <li className='category-inner-item'>Loan Calculator</li>
                        <li className='category-inner-item'>Finance and Investment</li>
                        <li className='category-inner-item'>Retirement</li>
                        <li className='category-inner-item'>Bond</li>
                        <li className='category-inner-item'>Business Accounting</li>
                        <li className='category-inner-item'>
                            <input className="setting-menu-input" type="checkbox" name="setting-menu-item" id="setting-menu-item-7" />
                            <label htmlFor="setting-menu-item-7">
                                <svg className='down-arrow-svg' xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none">
                                    <path d="M7.49997 9.30044C7.23114 9.30044 6.96235 9.19779 6.75739 8.99294L0.307713 2.54319C-0.102571 2.13291 -0.102571 1.46771 0.307713 1.05759C0.71783 0.647471 1.3829 0.647471 1.79322 1.05759L7.49997 6.76468L13.2068 1.05779C13.617 0.64767 14.2821 0.64767 14.6921 1.05779C15.1026 1.46791 15.1026 2.13311 14.6921 2.54339L8.24256 8.99313C8.0375 9.19803 7.76871 9.30044 7.49997 9.30044Z" fill="#007B42" />
                                </svg>
                                &nbsp;
                                &nbsp;
                                Date and Time
                            </label>
                            <ul className="setting-menu-item-inner-list">
                                <Link className='redirect-link' to={'/dateAndTime/durationBetweenTwoDates'}>
                                    <li>Duration Between Two Dates</li>
                                </Link>
                                <Link className='redirect-link' to={'/dateAndTime/dateAddSubtract'}>
                                    <li>Date Add And Subtract</li>
                                </Link>
                                <Link className='redirect-link' to={'/dateAndTime/weekDayCalculator'}>
                                    <li>WeekDay Calculator</li>
                                </Link>
                                <Link className='redirect-link' to={'/dateAndTime/ageCaculator'}>
                                    <li>Age Caculator</li>
                                </Link>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AllCategory