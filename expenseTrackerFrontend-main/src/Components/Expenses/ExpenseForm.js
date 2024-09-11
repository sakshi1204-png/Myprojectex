import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function ExpenseForm() {
    const { addExpense, error, setError, transactionHistory } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });
    const [history, setHistory] = useState([]);

    const { title, amount, date, category, description } = inputState;

    useEffect(() => {
        setHistory(transactionHistory()); // Fetch initial history
    }, [transactionHistory]);

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value});
        setError('');
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await addExpense(inputState);
        setHistory(transactionHistory()); // Update history after adding expense
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        });
    };

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            <h2>Expense</h2>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name={'title'} 
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input 
                    value={amount}  
                    type="text" 
                    name={'amount'} 
                    placeholder={'Expense Amount'}
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date});
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
            <div className="input-control">
                <textarea 
                    name="description" 
                    value={description} 
                    placeholder='Add A Reference' 
                    id="description" 
                    cols="30" 
                    rows="4" 
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Add Expense'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                />
            </div>
            <div className="history">
                <h3>Recent Expenses</h3>
                <ul>
                    {history.map((expense, index) => (
                        <li key={index}>
                            <p>{expense.title} - ${expense.amount} - {new Date(expense.date).toLocaleDateString()}</p>
                            <p>{expense.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </ExpenseFormStyled>
    );
}

const ExpenseFormStyled = styled.form`
    /* Your existing styles here */
`;

export default ExpenseForm;
