import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus, trash, settings } from '../../utils/Icons';
import { InnerLayout } from '../../styles/Layouts';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    }, [getExpenses]);

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
            await updateExpense(history[editIndex]._id, inputState);
        } else {
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
        await deleteExpense(history[index]._id);
        await getExpenses();
    };

    const totalExpense = () => {
        return history.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0).toFixed(2);
    };

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expense Tracker</h1>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseFormContainer onSubmit={handleSubmit}>
                            {error && <p className='error'>{error}</p>}
                            <div className="input-control">
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
                                <input
                                    value={amount}
                                    type="number"
                                    name={'amount'}
                                    id="amount"
                                    placeholder={'Expense Amount'}
                                    onChange={handleInput('amount')}
                                />
                            </div>
                            <div className='cont'>
                                <div className="input-control">
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
                                <div className="selects input-control">
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
                            </div>
                            <div className="input-control">
                                <textarea
                                    name="description"
                                    value={description}
                                    id="description"
                                    placeholder='Add description'
                                    cols="50"
                                    rows="2"
                                    onChange={handleInput('description')}
                                ></textarea>
                            </div>
                            <div className="submit-btn">
                                <Button
                                    name={editIndex !== null ? 'Update Expense' : 'Add Expense'}
                                    icon={plus}
                                    bPad=".8rem 1.3rem"
                                    bRad="30px"
                                    bg="var(--color-accent)"
                                    color="#fff"
                                />
                            </div>
                        </ExpenseFormContainer>
                    </div>

                    <div className="history-container">
                        <h3>Recent Expenses</h3>
                        <TableContainer>
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
                                                    <Tooltip title="Edit Expense">
                                                        <IconButton onClick={() => handleEdit(index)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete Expense">
                                                        <IconButton onClick={() => handleDelete(index)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
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
                        </TableContainer>
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    flex-direction: column;
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

    .expense-content {
        display: flex;
        flex-direction: row;
        gap: 1.5rem;
        justify-content: space-between;

        .form-container {
            flex: 0.5;
            background: #ffffff;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;
        }

        .history-container {
            flex: 1;
            background: #ffffff;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;

            h3 {
                margin-bottom: 1rem;
                font-size: 1.6rem;
                font-weight: 600;
                color: #333;
            }
        }
    }
`;

const ExpenseFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .input-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .4rem 1rem;
        border-radius: 10px;
        border: 2px solid #cccccc;
        background: #f9f9f9;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);
        color: #222;
        transition: all 0.3s ease;

        &:hover, &:focus {
            border-color: #3498db;
            background-color: #f4faff;
        }

        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }

    .submit-btn {
        display: flex;
        justify-content: flex-start;
        margin-top: 0.3rem;

        button {
            box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);
            &:hover {
                background: var(--color-green) !important;
            }
        }
    }

    .cont {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
    }

    .error {
        color: red;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
`;

const TableContainer = styled.div`
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;

        th, td {
            padding: 0.8rem;
            text-align: left;
        }

        th {
            background-color: #f0f2f5;
            color: #333;
            font-weight: 600;
        }

        td {
            background-color: #ffffff;
            border-bottom: 1px solid #ddd;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    }
`;

export default ExpenseForm;
