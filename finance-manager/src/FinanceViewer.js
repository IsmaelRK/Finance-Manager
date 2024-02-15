import React, { useState, useEffect } from 'react'
import './FinanceViewer.css'
import axios from 'axios'

function FinanceViewer() {
    const [total, setTotal] = useState(0);
    const [currentBalance, setCurrentBalance] = useState(total)

    const totalBalanceUpdate = (event) => {
        const newValue = parseFloat(event.target.value)

        axios.post('http://localhost:3001/update-total', {total: newValue})
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error('Erro ao enviar valor para o servidor:', error);
            });
    }

    return (
        <div className="Finance-Viewer">
            <h2>Finance Viewer</h2>

            <label htmlFor="totalInput">Total:</label>
            <input type="number" id="totalInput" value={total} onChange={totalBalanceUpdate}/>
            <p id="currentBalance">{currentBalance}</p>

        </div>
    );
}

export default FinanceViewer;
