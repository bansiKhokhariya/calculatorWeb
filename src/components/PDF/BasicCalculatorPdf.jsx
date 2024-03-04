import React from 'react'

const BasicCalculatorPdf = ({ savedResults }) => {

    return (
        <>
            <h1>My History</h1>
            <div className='card-container'>
                {savedResults.map((result, index) => (
                    index % 3 === 0 && (
                        <div className="row" key={index / 3}>
                            {savedResults.slice(index, index + 3).map((item, i) => (
                                <div className="col-md-4" key={index + i}>
                                    <div className="card bg-light mb-2">
                                        <div className="card-body">
                                            <h5 className="card-title card-text">Calculation {index + i + 1}</h5>
                                            <p className="card-text">{item}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ))}
            </div>
        </>
    )
}

export default BasicCalculatorPdf