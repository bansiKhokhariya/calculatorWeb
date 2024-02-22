import { React, useState } from 'react'
import './Home.css'
import SidebarToogle from '../SidebarToogle/SidebarToogle'
import Calculator from '../Calculator/Calculator'

const Home = () => {


    return (
        <>
            <SidebarToogle />
            <Calculator calculatorType='basicCalculator'/>  
        </>
    )
}

export default Home