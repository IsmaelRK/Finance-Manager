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


    const fetchCurrentBalance = async () => {
        try {
            const response = await fetch('http://localhost:3001/get-subtotal');
            if (!response.ok) {
                throw new Error('Failed to fetch subtotal');
            }
            const data = await response.json();
            setCurrentBalance(data.subtotal);
        } catch (error) {
            console.error('Error fetching subtotal:', error);
        }
    }


    const fetchTransactions = () => {
        fetch('http://localhost:3001/transactions')
            .then(response => response.json())
            .then(data => {
                setTransactions(data)
            })
            .catch(error => console.error('Error fetching transactions:', error))
    }

    useEffect(() => {
        fetchCurrentBalance()
        fetchTotal()
        fetchTransactions()
    }, [currentBalance, total])

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
                fetchCurrentBalance()

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

    const handleTransactionChanges = (event, index, id) => {

        const updatedTransactions = [...transactions]
        const newValue = event.target.value
        let body

        if (event.target.id === "transaction-type") {

            updatedTransactions[index].type = newValue
            const transactionNotChangedValue = updatedTransactions[index].value

            body = JSON.stringify({
                type: newValue,
                value: transactionNotChangedValue
            })

        }
        else {
            updatedTransactions[index].value = newValue
            const transactionNotChangedValue = updatedTransactions[index].type

            body = JSON.stringify({
                type: transactionNotChangedValue,
                value: newValue
            })
        }

        setTransactions(updatedTransactions)

        fetch(`http://localhost:3001/transactions/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: body
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Transaction Update Failed")
                }
                console.log("Update Successful")
                fetchCurrentBalance()
                fetchTransactions()
            })
            .catch(error => console.error('Transaction Update Failed: ', error))
    };


    const handleAddTransaction = () => {
        const inputValue = inputType === 'received' ? inputValueReceived : inputValueSpent
        fetch('http://localhost:3001/transactions', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
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
                fetchCurrentBalance()
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
                fetchCurrentBalance()
                fetchTransactions()
            })
            .catch(error => console.error('Error deleting transaction:', error))
    }

    return (
        <div id="Finance-Viewer">
            <h1 className="white-font" id="main-title">Finance Viewer</h1>

            <label className="white-font" htmlFor="totalInput">Total Monthly Income</label>
            <br/>

            <div id="monthly-income">
                <span className="currency-symbol">$</span>
                <input
                    type="number"
                    id="totalInput"
                    className="white-font"
                    value={total}
                    onChange={totalBalanceUpdate}
                />
            </div>


            <div id="balance-div">
                <p className="white-font">Current Balance</p>
                <p id="current-balance-p" className={currentBalance > 0 ? 'green-color' : 'red-color'}>$  {currentBalance}</p>
            </div>

            <div id="transactions-div">
                <div id="transactions-adder">
                    <select className={`main-select-class ${inputType === 'received' ? 'green-color' : 'red-color'}`}
                            value={inputType} onChange={handleTypeChange}>
                        <option value="received">Received</option>
                        <option value="spent">Spent</option>
                    </select>
                    <input
                        type="number"
                        className="main-transaction-amount-class white-font"
                        value={inputType === 'received' ? inputValueReceived : inputValueSpent}
                        onChange={inputType === 'received' ? handleInputChangeReceived : handleInputChangeSpent}
                    />

                    <svg id="add-svg" onClick={handleAddTransaction} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                        <g fill="none" strokeMiterlimit="10" strokeWidth="0" transform="matrix(2.81 0 0 2.81 1.407 1.407)"><linearGradient id="SVGID_1" x1="45" x2="45" y1="84.788" y2="4.261" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#2161AC"></stop><stop offset="100%" stopColor="#2B7FE2"></stop></linearGradient><circle cx="45" cy="45" r="45" fill="url(#SVGID_1)" strokeWidth="1"></circle><path fill="#FFF" strokeWidth="1" d="M50.962 39.34h12.869v10.905H50.962V65H39.076V50.245H26.169V39.34h12.906V25h11.886v14.34z"></path></g>
                    </svg>

                    {/*<button onClick={handleAddTransaction}>Add</button>*/}
                </div>
                <ul>
                    {transactions.map((transaction, index) => (
                        <li key={index}>
                            <select id="transaction-type"
                                    className={`main-select-class ${transaction.type === 'received' ? 'green-color' : 'red-color'}`}
                                    value={transaction.type}
                                    onChange={(e) => handleTransactionChanges(e, index, transaction.id)}>
                                <option value="received">Received</option>
                                <option value="spent">Spent</option>
                            </select>

                            <input
                                className="main-transaction-amount-class white-font"
                                type="number"
                                value={transaction.value}
                                onChange={(e) => handleTransactionChanges(e, index, transaction.id)}

                            />

                            <svg id="trash-svg" onClick={() => handleDeleteTransaction(transaction.id)}
                                 xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                 viewBox="0 0 24 24" style={{fill: '#FA5252'}}>
                                <path
                                    d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path>
                            </svg>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default FinanceViewer