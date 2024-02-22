import React from 'react'
import BasicCalculator from './BasicCalculator/BasicCalculator'
import PercentageCalculator from './PercentageCalculator/PercentageCalculator'

const Calculator = (props) => {
    return (
        <>
            {props.calculatorType == 'basicCalculator' && (
                <BasicCalculator />
            )}

            {props.calculatorType == 'percentageCalculator' && (
                <PercentageCalculator />
            )}
        </>
    )
}

export default Calculator