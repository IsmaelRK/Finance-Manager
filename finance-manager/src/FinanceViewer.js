import React, { useState, useEffect } from 'react'
import FinanceViewerContent from "./FinanceViewerContent"

function FinanceViewer() {
    const [total, setTotal] = useState(0)
    const [currentBalance, setCurrentBalance] = useState(0)

    const [transactions, setTransactions] = useState([])
    const [inputType, setInputType] = useState('received')
    const [inputValueReceived, setInputValueReceived] = useState('')
    const [inputValueSpent, setInputValueSpent] = useState('')


    const fetchTotal = () => {
        fetch('http://localhost:3001/get-total')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch total')
                }
                return response.json()
            })
            .then(data => {
                setTotal(data.total)
                setInputValueReceived('')
                setInputValueSpent('')
            })
            .catch(error => {
                console.error(error)
            })
    }

    const fetchCurrentBalance = () => {
        fetch('http://localhost:3001/get-subtotal')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch subtotal')
                }
                return response.json()
            })
            .then(data => {
                setCurrentBalance(data.subtotal)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const fetchTransactions = () => {
        fetch('http://localhost:3001/transactions')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch transactions')
                }
                return response.json()
            })
            .then(data => {
                setTransactions(data)
            })
            .catch(error => {
                console.error(error)
            })
    }



    useEffect(() => {
        fetchCurrentBalance()
        fetchTotal()
        fetchTransactions()
    }, [currentBalance, total])

    const totalBalanceUpdate = (event) => {

        const newValue = parseFloat(event.target.value)
        setTotal(newValue)
        fetch(`http://localhost:3001/update-total/${newValue}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
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
    }


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
        <FinanceViewerContent
            total={total}
            currentBalance={currentBalance}
            transactions={transactions}
            inputType={inputType}
            inputValueReceived={inputValueReceived}
            inputValueSpent={inputValueSpent}
            totalBalanceUpdate={totalBalanceUpdate}
            handleInputChangeReceived={handleInputChangeReceived}
            handleInputChangeSpent={handleInputChangeSpent}
            handleTypeChange={handleTypeChange}
            handleTransactionChanges={handleTransactionChanges}
            handleAddTransaction={handleAddTransaction}
            handleDeleteTransaction={handleDeleteTransaction}
        />
    )
}

export default FinanceViewer