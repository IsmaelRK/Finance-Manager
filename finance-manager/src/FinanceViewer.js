import React, { useState, useEffect } from 'react';
import './FinanceViewer.css';

function FinanceViewer() {
    const [total, setTotal] = useState(0);
    const [currentBalance, setCurrentBalance] = useState(0);

    const [transactions, setTransactions] = useState([]);
    const [inputType, setInputType] = useState('received');
    const [inputValueReceived, setInputValueReceived] = useState('');
    const [inputValueSpent, setInputValueSpent] = useState('');


    const fetchTotal = () => {
        fetch('http://localhost:3001/get-total')
            .then(response => response.json())
            .then(data => {
                setTotal(data.total);
                setInputValueReceived('');
                setInputValueSpent('');
                setCurrentBalance(data.total);
            })
            .catch(error => console.error('Erro ao buscar total:', error));
    };

    const fetchTransactions = () => {
        fetch('http://localhost:3001/transactions')
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(error => console.error('Erro ao buscar transações:', error));
    };

    useEffect(() => {
        fetchTotal();
        fetchTransactions();
    }, []);

    const totalBalanceUpdate = (event) => {
        const newValue = parseFloat(event.target.value);
        setTotal(newValue);
        setCurrentBalance(newValue);
        fetch('http://localhost:3001/update-total', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ total: newValue }),
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
    };

    const handleInputChangeReceived = (event) => {
        setInputValueReceived(event.target.value);
    };

    const handleInputChangeSpent = (event) => {
        setInputValueSpent(event.target.value);
    };

    const handleTypeChange = (event) => {
        setInputType(event.target.value);
    };

    const handleAddTransaction = () => {
        const inputValue = inputType === 'received' ? inputValueReceived : inputValueSpent;
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
                    throw new Error('Erro ao adicionar transação');
                }
                if (inputType === 'received') {
                    setInputValueReceived('');
                } else {
                    setInputValueSpent('');
                }
                fetchTransactions();
            })
            .catch(error => console.error('Erro ao adicionar transação:', error));
    };

    const handleDeleteTransaction = (id) => {
        fetch(`http://localhost:3001/transactions/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir transação');
                }
                fetchTransactions();
            })
            .catch(error => console.error('Erro ao excluir transação:', error));
    };

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
            <p id="currentBalance">{currentBalance}</p>

            <div>
                <select value={inputType} onChange={handleTypeChange}>
                    <option value="received">Recebido</option>
                    <option value="spent">Gasto</option>
                </select>
                <input
                    type="number"
                    value={inputType === 'received' ? inputValueReceived : inputValueSpent}
                    onChange={inputType === 'received' ? handleInputChangeReceived : handleInputChangeSpent}
                />
                <button onClick={handleAddTransaction}>Adicionar</button>
            </div>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        {transaction.type === 'received' ? 'Recebido' : 'Gasto'}: {transaction.value}
                        <button onClick={() => handleDeleteTransaction(transaction.id)}>Deletar</button>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default FinanceViewer;
