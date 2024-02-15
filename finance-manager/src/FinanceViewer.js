import React, { useState, useEffect } from 'react'
import './FinanceViewer.css'

function FinanceViewer() {
    const [total, setTotal] = useState(0)
    const [currentBalance, setCurrentBalance] = useState(0)

    const [transactions, setTransactions] = useState([])
    const [inputType, setInputType] = useState('received')
    const [inputValueReceived, setInputValueReceived] = useState('')
    const [inputValueSpent, setInputValueSpent] = useState('')

    const fetchTotal = () => {
        fetch('http://localhost:3001/get-total')
            .then(response => response.json())
            .then(data => {
                setTotal(data.total)
                setInputValueReceived('')
                setInputValueSpent('')
            })
            .catch(error => console.error('Error fetching total:', error))
    }

    const fetchTransactions = () => {
        fetch('http://localhost:3001/transactions')
            .then(response => response.json())
            .then(data => {
                setTransactions(data)
                let balance = total
                data.forEach(transaction => {
                    if (transaction.type === 'received') {
                        balance += transaction.value
                    } else {
                        balance -= transaction.value
                    }
                })
                setCurrentBalance(balance)
            })
            .catch(error => console.error('Error fetching transactions:', error))
    }

    useEffect(() => {
        fetchTotal()
        fetchTransactions()
    }, [total, currentBalance])

    const totalBalanceUpdate = (event) => {
        const newValue = parseFloat(event.target.value)
        setTotal(newValue)
        fetch('http://localhost:3001/update-total', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ total: newValue }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error sending value to server')
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
                fetchTransactions()
            })
            .catch(error => {
                console.error('Error sending value to server:', error)
            })
    }

    const handleInputChangeReceived = (event) => {
        setInputValueReceived(event.target.value)
    }

    const handleInputChangeSpent = (event) => {
        setInputValueSpent(event.target.value)
    }

    const handleTypeChange = (event) => {
        setInputType(event.target.value)
    }

    const handleAddTransaction = () => {
        const inputValue = inputType === 'received' ? inputValueReceived : inputValueSpent
        fetch('http://localhost:3001/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: inputType,
                value: parseFloat(inputValue)
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error adding transaction')
                }
                setInputValueReceived('')
                setInputValueSpent('')
                fetchTransactions()
            })
            .catch(error => console.error('Error adding transaction:', error))
    }

    const handleDeleteTransaction = (id) => {
        fetch(`http://localhost:3001/transactions/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting transaction')
                }
                fetchTransactions()
            })
            .catch(error => console.error('Error deleting transaction:', error))
    }

    return (
        <div className="Finance-Viewer">
            <h2>Finance Viewer</h2>

            <label htmlFor="totalInput">Total:</label>
            <input
                type="number"
                id="totalInput"
                value={total}
                onChange={totalBalanceUpdate}
            />
            <p>Total: {total}</p>
            <p>Current Balance: {currentBalance}</p>

            <div>
                <select value={inputType} onChange={handleTypeChange}>
                    <option value="received">Received</option>
                    <option value="spent">Spent</option>
                </select>
                <input
                    type="number"
                    value={inputType === 'received' ? inputValueReceived : inputValueSpent}
                    onChange={inputType === 'received' ? handleInputChangeReceived : handleInputChangeSpent}
                />
                <button onClick={handleAddTransaction}>Add</button>
            </div>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        {transaction.type === 'received' ? 'Received' : 'Spent'}: {transaction.value}
                        <button onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default FinanceViewer
