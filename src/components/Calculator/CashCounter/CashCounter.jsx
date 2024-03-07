import React, { useState } from 'react';

const CashCounter = () => {

    var selectedTheme = localStorage.getItem('selectedTheme');

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
        let { value } = event.target;
        // Truncate value if it exceeds 10 characters
        value = value.slice(0, 15);
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
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>
                        Cash Counter
                    </h1>
                </div>
                <div className="card-body card-text">
                    <table className={`table table-bordered ${selectedTheme === 'dark' ? 'table-dark' : 'table-light'}`}>
                        <thead>
                            <tr>
                                <th scope="col" className='text-center'>Note</th>
                                <th scope="col" className='text-center'>Count</th>
                                <th scope="col" className='text-center'>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(notes).map(note => (
                                <tr className='pb-3' key={note} >
                                    <td className='card-text text-center'>{`₹${note}`}</td>
                                    <td>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Enter Value" value={notes[note].count}
                                                onChange={(e) => handleNoteChange(e, note)} />
                                        </div>
                                    </td>
                                    <td className='text-center'>
                                        <div>
                                            <strong>
                                                <span className='text-success'>
                                                    &nbsp; {`₹${notes[note].amount}`}
                                                </span>
                                            </strong>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <div>
                        <div>
                            <strong>
                                Total Amount =
                                <span className='text-success'>
                                    &nbsp; {calculateTotal()}
                                </span>
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CashCounter;
