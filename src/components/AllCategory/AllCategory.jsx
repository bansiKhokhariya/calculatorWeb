import { React, useState } from 'react'
import SidebarToogle from '../SidebarToogle/SidebarToogle'
import { Link } from 'react-router-dom'

const AllCategory = () => {
    return (
        <>
            <SidebarToogle />
            <div className="accordion sidebar-menu bg-light card-text" id="accordionExample">
                <div className="card">
                    <div className="card-header bg-light card-text " id="headingOne">
                        <div role="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            ▼ General
                        </div>
                    </div>
                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div className="accordion" id="accordionExample">
                            <div className="card border-0">
                                <Link className='redirect-link' to={'/'} >
                                    <div className="card-header bg-light text-primary" >
                                        <div>
                                            &nbsp; &nbsp;  Calculator
                                        </div>
                                    </div>
                                </Link>
                                <Link className='redirect-link' to={'/calculator/percentageCalculator'}>
                                    <div className="card-header bg-light text-primary" role="button">
                                        <div>
                                            &nbsp; &nbsp;  Percentage Calculator
                                        </div>
                                    </div>
                                </Link>
                                <Link className='redirect-link' to={'/calculator/bmiCalculator'}>
                                    <div className="card-header bg-light text-primary">
                                        <div>
                                            &nbsp; &nbsp;  BMI Calculator
                                        </div>
                                    </div>
                                </Link>
                                <Link className='redirect-link' to={'/calculator/numberToWordConverter'}>
                                    <div className="card-header bg-light text-primary">
                                        <div>
                                            &nbsp; &nbsp;  Number To Word Converter
                                        </div>
                                    </div>
                                </Link>
                                <Link className='redirect-link' to={'/calculator/unitConverter'}>
                                    <div className="card-header bg-light text-primary">
                                        <div>
                                            &nbsp; &nbsp;  Unit Converter
                                        </div>
                                    </div>
                                </Link>
                                <Link className='redirect-link' to={'/calculator/cashCounter'}>
                                    <div className="card-header bg-light text-primary">
                                        <div>
                                            &nbsp; &nbsp;  Cash Counter
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header bg-light card-text" id="headingTwo">
                        <div role="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                            ▼ Loan And Mortgage
                        </div>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div className="accordion" id="accordionExample">
                            <div className="card border-0">
                                <Link className='redirect-link' to={'/loanMortgage/loanCalculator'}>
                                    <div className="card-header bg-light text-primary">
                                        <div>
                                            &nbsp; &nbsp;  Loan Calculator
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header bg-light card-text" id="headingThree">
                        <div role="button" aria-expanded="false" data-toggle="collapse" data-target="#collapseThree" aria-controls="collapseThree">
                            ▼  Finance and Investment
                        </div>
                    </div>
                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div className="accordion" id="accordionExample">
                            <div className="card border-0">
                                <Link className='redirect-link' to={'/financeAndInvestment/currencyConverter'}>
                                    <div className="card-header bg-light text-primary">
                                        <div>
                                            &nbsp; &nbsp;  Currency Converter
                                        </div>
                                    </div>
                                </Link>
                                <Link className='redirect-link' to={'/financeAndInvestment/roiCalculator'}>
                                    <div className="card-header bg-light text-primary">
                                        <div>
                                            &nbsp; &nbsp;  Return on Investment (ROI) Calculator
                                        </div>
                                    </div>
                                </Link>
                                <Link className='redirect-link' to={'/financeAndInvestment/tvmCalculator'}>
                                    <div className="card-header bg-light text-primary">
                                        <div>
                                            &nbsp; &nbsp;  TVM Calculator
                                        </div>
                                    </div>
                                </Link>
                                <Link className='redirect-link' to={'/financeAndInvestment/tvmAdvancedCalculator'}>
                                    <div className="card-header bg-light text-primary">
                                        <div>
                                            &nbsp; &nbsp;  TVM Advanced Calculator
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div role="button" className="card-header bg-light card-text" id="headingFour">
                        <div data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                            ▼ Retirement
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header bg-light card-text" id="headingFive">
                        <div role="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                            ▼ Bond
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header bg-light card-text" id="headingSix">
                        <div role="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
                            ▼ Business Accounting
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header bg-light card-text" id="headingSeven">
                        <div role="button" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="true" aria-controls="collapseSeven">
                            ▼  Date and Time
                        </div>
                    </div>
                    <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven" data-parent="#accordionExample">
                        <div className="accordion" id="accordionExample">
                            <div className="card border-0">
                                <Link className='redirect-link' to={'/dateAndTime/durationBetweenTwoDates'}>
                                    <div className="card-header bg-light text-primary">
                                        <div>
                                            &nbsp; &nbsp;  Duration Between Two Dates
                                        </div>
                                    </div>
                                </Link>
                                <Link className='redirect-link' to={'/dateAndTime/dateAddSubtract'}>
                                    <div className="card-header bg-light text-primary">
                                        <div>
                                            &nbsp; &nbsp;  Date Add And Subtract
                                        </div>
                                    </div>
                                </Link>
                                <Link className='redirect-link' to={'/dateAndTime/weekDayCalculator'}>
                                    <div className="card-header bg-light text-primary">
                                        <div>
                                            &nbsp; &nbsp;  WeekDay Calculator
                                        </div>
                                    </div>
                                </Link>
                                <Link className='redirect-link' to={'/dateAndTime/ageCaculator'}>
                                    <div className="card-header bg-light text-primary">
                                        <div>
                                            &nbsp; &nbsp;  Age Caculator
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllCategory