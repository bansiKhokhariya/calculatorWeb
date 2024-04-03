import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Modal } from "react-bootstrap";

const SidebarToggle = ({ openHistoryModal }) => {
    const [visible, setVisible] = useState(false);
    const [historyButtonShow, setHistoryButtonShow] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/financeAndInvestment/tvmAdvancedCalculator" || location.pathname === "/loanMortgage/loanCalculator" || location.pathname === "/" || location.pathname === "/financeAndInvestment/tvmCalculator") {
            setHistoryButtonShow(true);
        } else {
            setHistoryButtonShow(false);
        }
    }, [location.pathname]);

    const [show, setShow] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState('light');

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

    const handleDrawerClose = () => {
        setVisible(false);
    };

    return (
        <nav className="navbar bg-light navbar-expand-xl navbar-light sticky-top">
            <div className="container-fluid">
                <button className="btn btn-sm btn-light menu-button" onClick={() => setVisible(true)}>
                    <strong>☰</strong>
                </button>

                {historyButtonShow &&
                    <button className="btn btn-sm btn-light" onClick={openHistoryModal}>
                        {selectedTheme === 'light' ? (
                            <svg width="20" height="20" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_10)">
                                    <path d="M279.467 21.3333C227.877 21.5844 177.828 38.9423 137.161 70.6875C96.4944 102.433 67.5073 146.771 54.7414 196.757L39.1254 173.141C37.647 170.669 35.6832 168.521 33.3524 166.829C31.0216 165.136 28.372 163.932 25.5636 163.291C22.7551 162.65 19.8459 162.584 17.0113 163.098C14.1768 163.612 11.4756 164.694 9.07076 166.28C6.66589 167.866 4.60714 169.923 3.01865 172.326C1.43016 174.729 0.344845 177.429 -0.171854 180.263C-0.688553 183.097 -0.625928 186.006 0.0122448 188.815C0.650417 191.625 1.85092 194.275 3.54135 196.608L50.4747 267.733C53.7348 272.295 58.5415 275.517 64 276.8C69.5737 277.906 75.3589 276.796 80.128 273.707L150.528 226.283C152.955 224.767 155.053 222.778 156.696 220.435C158.339 218.092 159.493 215.442 160.091 212.644C160.689 209.845 160.717 206.955 160.175 204.145C159.633 201.335 158.53 198.663 156.934 196.288C155.338 193.913 153.28 191.883 150.883 190.32C148.486 188.756 145.799 187.691 142.982 187.187C140.165 186.684 137.275 186.752 134.485 187.388C131.695 188.025 129.062 189.216 126.741 190.891L94.72 212.48C103.242 177.886 121.317 146.383 146.882 121.567C172.447 96.7512 204.472 79.6208 239.305 72.1304C274.137 64.64 310.373 67.0914 343.88 79.2047C377.386 91.3181 406.812 112.606 428.802 140.639C450.792 168.672 464.459 202.321 468.244 237.748C472.03 273.175 465.781 308.953 450.211 340.999C434.641 373.046 410.376 400.07 380.186 418.99C349.996 437.909 315.095 447.962 279.467 448C248.925 447.918 218.854 440.462 191.811 426.266C164.768 412.071 141.553 391.555 124.139 366.464C122.579 364.069 120.554 362.012 118.184 360.415C115.814 358.818 113.147 357.713 110.342 357.166C107.537 356.62 104.65 356.642 101.854 357.233C99.0578 357.823 96.4087 358.97 94.064 360.604C91.7193 362.238 89.7268 364.327 88.2049 366.746C86.683 369.165 85.6627 371.865 85.2046 374.686C84.7464 377.507 84.8597 380.391 85.5378 383.168C86.2159 385.944 87.445 388.556 89.152 390.848C117.463 431.662 158.119 462.319 205.146 478.312C252.173 494.305 303.089 494.792 350.413 479.7C397.737 464.608 438.972 434.734 468.057 394.468C497.143 354.203 512.545 305.669 512 256C512.21 194.067 487.846 134.58 444.254 90.5874C400.661 46.5947 341.399 21.6889 279.467 21.3333Z" fill="black" />
                                    <path d="M277.333 126.933C271.675 126.933 266.249 129.181 262.248 133.182C258.248 137.182 256 142.609 256 148.267V256C256.091 261.639 258.326 267.032 262.251 271.083L326.251 335.659C330.267 339.612 335.668 341.839 341.303 341.867C346.938 341.895 352.361 339.721 356.416 335.808C360.432 331.824 362.702 326.409 362.726 320.752C362.75 315.095 360.526 309.66 356.544 305.643L298.667 247.232V148.267C298.667 142.609 296.419 137.182 292.418 133.182C288.417 129.181 282.991 126.933 277.333 126.933Z" fill="black" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2_10">
                                        <rect width="512" height="512" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_10)">
                                    <path d="M279.467 21.3333C227.877 21.5844 177.828 38.9423 137.161 70.6875C96.4944 102.433 67.5073 146.771 54.7414 196.757L39.1254 173.141C37.647 170.669 35.6832 168.521 33.3524 166.829C31.0216 165.136 28.372 163.932 25.5636 163.291C22.7551 162.65 19.8459 162.584 17.0113 163.098C14.1768 163.612 11.4756 164.694 9.07076 166.28C6.66589 167.866 4.60714 169.923 3.01865 172.326C1.43016 174.729 0.344845 177.429 -0.171854 180.263C-0.688553 183.097 -0.625928 186.006 0.0122448 188.815C0.650417 191.625 1.85092 194.275 3.54135 196.608L50.4747 267.733C53.7348 272.295 58.5415 275.517 64 276.8C69.5737 277.906 75.3589 276.796 80.128 273.707L150.528 226.283C152.955 224.767 155.053 222.778 156.696 220.435C158.339 218.092 159.493 215.442 160.091 212.644C160.689 209.845 160.717 206.955 160.175 204.145C159.633 201.335 158.53 198.663 156.934 196.288C155.338 193.913 153.28 191.883 150.883 190.32C148.486 188.756 145.799 187.691 142.982 187.187C140.165 186.684 137.275 186.752 134.485 187.388C131.695 188.025 129.062 189.216 126.741 190.891L94.72 212.48C103.242 177.886 121.317 146.383 146.882 121.567C172.447 96.7512 204.472 79.6208 239.305 72.1304C274.137 64.64 310.373 67.0914 343.88 79.2047C377.386 91.3181 406.812 112.606 428.802 140.639C450.792 168.672 464.459 202.321 468.244 237.748C472.03 273.175 465.781 308.953 450.211 340.999C434.641 373.046 410.376 400.07 380.186 418.99C349.996 437.909 315.095 447.962 279.467 448C248.925 447.918 218.854 440.462 191.811 426.266C164.768 412.071 141.553 391.555 124.139 366.464C122.579 364.069 120.554 362.012 118.184 360.415C115.814 358.818 113.147 357.713 110.342 357.166C107.537 356.62 104.65 356.642 101.854 357.233C99.0578 357.823 96.4087 358.97 94.064 360.604C91.7193 362.238 89.7268 364.327 88.2049 366.746C86.683 369.165 85.6627 371.865 85.2046 374.686C84.7464 377.507 84.8597 380.391 85.5378 383.168C86.2159 385.944 87.445 388.556 89.152 390.848C117.463 431.662 158.119 462.319 205.146 478.312C252.173 494.305 303.089 494.792 350.413 479.7C397.737 464.608 438.972 434.734 468.057 394.468C497.143 354.203 512.545 305.669 512 256C512.21 194.067 487.846 134.58 444.254 90.5874C400.661 46.5947 341.399 21.6889 279.467 21.3333Z" fill="white" />
                                    <path d="M277.333 126.933C271.675 126.933 266.249 129.181 262.248 133.182C258.248 137.182 256 142.609 256 148.267V256C256.091 261.639 258.326 267.032 262.251 271.083L326.251 335.659C330.267 339.612 335.668 341.839 341.303 341.867C346.938 341.895 352.361 339.721 356.416 335.808C360.432 331.824 362.702 326.409 362.726 320.752C362.75 315.095 360.526 309.66 356.544 305.643L298.667 247.232V148.267C298.667 142.609 296.419 137.182 292.418 133.182C288.417 129.181 282.991 126.933 277.333 126.933Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2_10">
                                        <rect width="512" height="512" fill="black" />
                                    </clipPath>
                                </defs>
                            </svg>
                        )}
                    </button>
                }

                <Offcanvas className="bg-light text-dark" show={visible} onHide={() => setVisible(false)} placement="start">
                    <Offcanvas.Header >
                        <h5 className="offcanvas-title">Calculator</h5>
                        <button className='card-text btn-light' onClick={() => {
                            setVisible(false)
                        }} ><strong>⛌</strong></button>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <div className='mb-4'>
                                <li className="nav-item nav-link"><strong>All By Category</strong> </li>
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
                                                    <Link className='redirect-link' to={'/'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary" >
                                                            <div>
                                                                &nbsp; &nbsp;  Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/calculator/percentageCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary" role="button">
                                                            <div>
                                                                &nbsp; &nbsp;  Percentage Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/calculator/bmiCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp;  BMI Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/calculator/numberToWordConverter'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp;  Number To Word Converter
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/calculator/unitConverter'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp;  Unit Converter
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/calculator/cashCounter'} onClick={handleDrawerClose}>
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
                                                    <Link className='redirect-link' to={'/loanMortgage/loanCalculator'} onClick={handleDrawerClose}>
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
                                                    <Link className='redirect-link' to={'/financeAndInvestment/currencyConverter'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp;  Currency Converter
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/roiCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp;  Return on Investment (ROI) Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/tvmCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp;  TVM Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/tvmAdvancedCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp;  TVM Advanced Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/mutualFundCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp;  Mutual Fund Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/SIPCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp;  SIP Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/PPFCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp; PPF Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/compoundInterestCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp; Compound Interest Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/FDCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp; FD Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/RDCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp; RD Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/gratuityCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp; Gratuity Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/CAGRCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp; CAGR Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/discountCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp; Discount Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/SWPCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp; SWP Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/lumpsumInvestmentCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp; Lumpsum Investment Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/presentValueCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp; Present Value Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/savingsCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp; Savings Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/educationCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp; Education Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/financeAndInvestment/downPaymentCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp; Down Payment Calculator
                                                            </div>
                                                        </div>
                                                    </Link> 
                                                    <Link className='redirect-link' to={'/financeAndInvestment/leaseCalculatorIndia'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp; Lease Calculator India
                                                            </div>
                                                        </div>
                                                    </Link> 
                                                    <Link className='redirect-link' to={'/financeAndInvestment/paybackPeriodCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp; Payback Period Calculator
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
                                        <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                                            <div className="accordion" id="accordionExample">
                                                <div className="card border-0">
                                                    <Link className='redirect-link' to={'/businessAccounting/depreciationCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp;  Depreciation Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/businessAccounting/breakEvenPointCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp;  Break Even Point Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/businessAccounting/marginMarkupCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp;  Margin and Markup Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
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
                                                    <Link className='redirect-link' to={'/dateAndTime/durationBetweenTwoDates'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp;  Duration Between Two Dates
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/dateAndTime/dateAddSubtract'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp;  Date Add And Subtract
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/dateAndTime/weekDayCalculator'} onClick={handleDrawerClose}>
                                                        <div className="card-header bg-light text-primary">
                                                            <div>
                                                                &nbsp; &nbsp;  WeekDay Calculator
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link className='redirect-link' to={'/dateAndTime/ageCaculator'} onClick={handleDrawerClose}>
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
                            </div>
                            <div className='mb-4'>
                                <li className="nav-item nav-link"><strong>Setting</strong> </li>
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
                            </div>
                            <Link className='redirect-link text-dark border-bottom' to={'/'}>
                                <li className="nav-item nav-link"> <strong>Shortcut Calculator</strong></li>
                            </Link>
                            <Link className='redirect-link text-dark border-bottom' to={'/'}>
                                <li className="nav-item nav-link"> <strong>About</strong></li>
                            </Link>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>

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
            </div>
        </nav>
    );
}

export default SidebarToggle;
