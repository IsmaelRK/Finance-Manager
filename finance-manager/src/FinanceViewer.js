import React, { useState, useEffect } from 'react';
import './FinanceViewer.css';

function FinanceViewer() {
    // eslint-disable-next-line
    const [total, setTotal] = useState(0);
    const [currentBalance, setCurrentBalance] = useState(0);

    useEffect(() => {
        setCurrentBalance(total);
    }, [total]);

    const totalBalanceUpdate = (event) => {
        const newValue = parseFloat(event.target.value);

        fetch('http://localhost:3001/update-total', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({total: newValue}),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao enviar valor para o servidor');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Erro ao enviar valor para o servidor:', error);
            });
    }

    return (
        <div className="Finance-Viewer">
            <h2>Finance Viewer</h2>

            <label htmlFor="totalInput">Total:</label>
            <input
                type="number"
                id="totalInput"
                onChange={totalBalanceUpdate}
            />
            <p id="currentBalance">{currentBalance}</p>



        </div>
    );
}

export default FinanceViewer;