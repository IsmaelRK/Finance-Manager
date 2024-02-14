import React, { useState, useEffect } from 'react';
import './FinanceViewer.css';

function FinanceViewer() {
    const [total, setTotal] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [type, setType] = useState('received');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/transactions')
            .then(response => response.json())
            .then(data => {
                const total = data.reduce((acc, transaction) => {
                    return transaction.type === 'received' ? acc + transaction.amount : acc - transaction.amount;
                }, 0);
                setTransactions(data);
                setTotal(total);
            })
            .catch(error => console.error('Erro ao buscar transações:', error));
    }, []);

    const handleAddTransaction = () => {
        if (amount && (type === 'received' || type === 'spent')) {
            fetch('http://localhost:3001/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type, amount: parseFloat(amount) }),
            })
                .then(response => response.json())
                .then(data => {
                    setTransactions([...transactions, { id: data.id, type, amount: parseFloat(amount) }]);
                    setTotal(prevTotal => (type === 'received' ? prevTotal + parseFloat(amount) : prevTotal - parseFloat(amount)));
                    setAmount('');
                })
                .catch(error => console.error('Erro ao adicionar transação:', error));
        }
    };

    const handleDeleteTransaction = id => {
        fetch(`http://localhost:3001/transactions/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
                const total = updatedTransactions.reduce((acc, transaction) => {
                    return transaction.type === 'received' ? acc + transaction.amount : acc - transaction.amount;
                }, 0);
                setTransactions(updatedTransactions);
                setTotal(total);
            })
            .catch(error => console.error('Erro ao excluir transação:', error));
    };

    return (
        <div className="Finance-Viewer">
            <h2>Finance Viewer</h2>
            <div>
                <label htmlFor="total">Total:</label>
                <input type="number" id="total" value={total} disabled />
            </div>
            <div>
                <label htmlFor="type">Type:</label>
                <select id="type" value={type} onChange={e => setType(e.target.value)}>
                    <option value="received">Received</option>
                    <option value="spent">Spent</option>
                </select>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                <button onClick={handleAddTransaction}>Add Transaction</button>
            </div>
            <div>
                <h3>Transactions</h3>
                <ul>
                    {transactions.map(transaction => (
                        <li key={transaction.id}>
                            <span className={transaction.type}>{transaction.type}</span>
                            <span>{transaction.amount}</span>
                            <button onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FinanceViewer;