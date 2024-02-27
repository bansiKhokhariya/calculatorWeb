import React, { useState } from 'react';
import './CashCounter.css'

const CashCounter = () => {
    const [notes, setNotes] = useState({
        '1': { count: 0, amount: 0 },
        '2': { count: 0, amount: 0 },
        '5': { count: 0, amount: 0 },
        '10': { count: 0, amount: 0 },
        '20': { count: 0, amount: 0 },
        '50': { count: 0, amount: 0 },
        '100': { count: 0, amount: 0 },
        '200': { count: 0, amount: 0 },
        '500': { count: 0, amount: 0 },
        '2000': { count: 0, amount: 0 }
    });

    const handleNoteChange = (event, note) => {
        const { value } = event.target;
        const newValue = parseInt(value) || 0;
        const newNotes = { ...notes };
        newNotes[note] = { count: newValue, amount: newValue * parseInt(note) };
        setNotes(newNotes);
    };

    const calculateTotal = () => {
        let total = 0;
        for (const note in notes) {
            total += notes[note].amount;
        }
        return total;
    };

    return (
        <div className='percentage-caculator-section-main'>
            <div className="percentage-caculator-section">
                <h2 className='percentage-caculator-title'>Cash Counter</h2>
                <div className='percentage-caculator-main-box' >
                    <div className="cash-counter">
                        <table>
                            <thead style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                                <tr>
                                    <th className='percentage-caculator-lable'>Note</th>
                                    <th className='percentage-caculator-lable'>Count</th>
                                    <th className='percentage-caculator-lable'>Amount</th>
                                </tr>
                            </thead>
                            <tbody style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                                {Object.keys(notes).map(note => (
                                    <tr key={note} style={{ display: "flex", alignItems: "center" }}>
                                        <td className='percentage-caculator-lable'>{`₹${note}`}</td>
                                        <td>
                                            <input
                                                className='cash-caculator-input'
                                                type="number"
                                                value={notes[note].count}
                                                onChange={(e) => handleNoteChange(e, note)}
                                            />
                                        </td>
                                        <td className='percentage-caculator-lable result-value-span-green'>{`₹${notes[note].amount}`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='result-value' style={{ textAlign: "center" }}>
                            Total Amount: <span className='percentage-caculator-lable result-value-span-green'>₹{calculateTotal()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CashCounter;
