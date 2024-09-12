import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus, trash, settings } from '../../utils/Icons';  // Adjust imports as needed
import { Box } from '@mui/material';
import { InnerLayout } from '../../styles/Layouts';


function ExpenseForm() {
    const { addExpense, updateExpense, deleteExpense, error, setError, getExpenses, expenses } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });

    const [history, setHistory] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const { title, amount, date, category, description } = inputState;

    useEffect(() => {
        async function fetchExpenses() {
            const exp = await getExpenses();
            console.log(exp);
        }
        fetchExpenses();
    }, []);

    useEffect(() => {
        setHistory(expenses);
    }, [expenses]);

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (editIndex !== null) {
            // Update expense
            await updateExpense(history[editIndex]._id, inputState); // Use the correct ID for update
        } else {
            // Add expense
            await addExpense(inputState);
        }
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        });
        setEditIndex(null);
        await getExpenses();
    };

    const handleEdit = (index) => {
        const expenseToEdit = history[index];
        setInputState(expenseToEdit);
        setEditIndex(index);
    };

    const handleDelete = async (index) => {
        await deleteExpense(history[index]._id); // Use the correct ID for delete
        await getExpenses();
    };

    // Function to calculate the total expense
    const totalExpense = () => {
        return history.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0).toFixed(2);
    };

    return (
        <ExpenseFormStyled>
            <InnerLayout>
                <Box sx={{ textAlign: 'center' }}>
                    <h1>{editIndex !== null ? 'Edit Expense' : 'Add Expense'}</h1>
                    <h2 className="total-expense">Total Expense: <span>${totalExpense()}</span></h2>
                </Box>

                <Box sx={{ display: 'flex', gap: '1.5rem', flexDirection: 'row' }}>
                    <ExpenseFormContainer onSubmit={handleSubmit}>
                        {error && <p className='error'>{error}</p>}
                        <div className="input-control">
                            {/* <label htmlFor="title">Title</label> */}
                            <input
                                type="text"
                                value={title}
                                name={'title'}
                                id="title"
                                placeholder="Expense Title"
                                onChange={handleInput('title')}
                            />
                        </div>
                        <div className="input-control">
                            {/* <label htmlFor="amount">Amount</label> */}
                            <input
                                value={amount}
                                type="text"
                                name={'amount'}
                                id="amount"
                                placeholder={'Expense Amount'}
                                onChange={handleInput('amount')}
                            />
                        </div>
                        <div className="input-control">
                            {/* <label htmlFor="date">Date</label> */}
                            <DatePicker
                                id='date'
                                placeholderText='Select a Date'
                                selected={date}
                                dateFormat="dd/MM/yyyy"
                                onChange={(date) => {
                                    setInputState({ ...inputState, date: date });
                                }}
                            />
                        </div>
                        <div className="input-control">
                            {/* <label htmlFor="category">Category</label> */}
                            <select
                                required
                                value={category}
                                name="category"
                                id="category"
                                onChange={handleInput('category')}
                            >
                                <option value="" disabled>Select Option</option>
                                <option value="education">Education</option>
                                <option value="groceries">Groceries</option>
                                <option value="health">Health</option>
                                <option value="subscriptions">Subscriptions</option>
                                <option value="takeaways">Takeaways</option>
                                <option value="clothing">Clothing</option>
                                <option value="travelling">Travelling</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="input-control">
                            {/* <label htmlFor="description">Description</label> */}
                            <textarea
                                name="description"
                                value={description}
                                id="description"
                                placeholder='Add a description'
                                cols="30"
                                rows="4"
                                onChange={handleInput('description')}
                            ></textarea>
                        </div>
                        <div className="submit-btn">
                            <Button
                                name={editIndex !== null ? 'Update Expense' : 'Add Expense'}
                                icon={plus}
                                bPad={'.8rem 1.6rem'}
                                bRad={'30px'}
                                bg={'#007BFF'}
                                color={'#fff'}
                            />
                        </div>
                    </ExpenseFormContainer>

                    <HistoryStyled>
                        <h3>Recent Expenses</h3>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Category</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.length > 0 ? (
                                        history.map((expense, index) => (
                                            <tr key={expense._id}>
                                                <td>{expense.title}</td>
                                                <td>${expense.amount}</td>
                                                <td>{new Date(expense.date).toLocaleDateString()}</td>
                                                <td>{expense.category}</td>
                                                <td>{expense.description}</td>
                                                <td>
                                                    <Button
                                                        name='Edit'
                                                        icon={settings}
                                                        onClick={() => handleEdit(index)}
                                                    />
                                                    <Button
                                                        name='Delete'
                                                        icon={trash}
                                                        onClick={() => handleDelete(index)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">No expenses found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </HistoryStyled>
                </Box>
            </InnerLayout>
        </ExpenseFormStyled>
    );
}

const ExpenseFormStyled = styled.div`
    padding: 2rem;
    background-color: #f5f6f7;
    min-height: 100vh;

    h1 {
        text-align: center;
        font-size: 2.5rem;
        color: #34495e;
        margin-bottom: 1rem;
        font-weight: 600;
    }

    .total-expense {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffffff;
        border: 1px solid #d0d0d0;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 1.8rem;
        gap: 1rem;

        span {
            font-size: 2.5rem;
            font-weight: 700;
            color: #2ecc71;
        }
    }
`;

const ExpenseFormContainer = styled.form`
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #d0d0d0;
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .input-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    label {
        font-weight: 500;
        color: #333;
    }

    input, textarea, select {
        padding: 0.7rem;
        border: 1px solid #ddd;
        border-radius: 10px;
        font-size: 1rem;
        width: 100%;
        box-sizing: border-box;
    }

    textarea {
        resize: vertical;
    }

    .submit-btn {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
    }

    .error {
        color: red;
        margin: 0.5rem 0;
    }
`;

const HistoryStyled = styled.div`
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #d0d0d0;
    max-width: 900px;
    width: 100%;
    height: 60vh;
    display: flex;
    flex-direction: column;

    h3 {
        margin-bottom: 1rem;
        font-size: 1.4rem;
        font-weight: 600;
        color: #333;
    }

    .table-container {
        overflow-y: auto;
        flex: 1;

        table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }

        thead {
            background: #f4f4f4;
            color: #333;
            font-weight: bold;
        }

        th, td {
            padding: 1rem;
            border: 1px solid #ddd;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        th {
            background: #e0e0e0;
            color: #333;
        }

        tr:nth-child(even) {
            background: #f9f9f9;
        }

        tr:hover {
            background: #f1f1f1;
        }
    }
`;

export default ExpenseForm;
