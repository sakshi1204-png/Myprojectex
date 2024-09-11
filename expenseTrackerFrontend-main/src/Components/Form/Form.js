import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function Form() {
    const { addIncome, getIncomes, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        // Convert amount to number
        const parsedAmount = parseFloat(amount);
        
        // Ensure amount is a valid number
        if (isNaN(parsedAmount)) {
            setError('Invalid amount');
            return;
        }
        
        // Create a new state with amount as a number
        const updatedInputState = {
            ...inputState,
            amount: parsedAmount
        };

        addIncome(updatedInputState);
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        });
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name="title" 
                    placeholder="Salary Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input 
                    type="number"  // Changed to number
                    value={amount}
                    name="amount" 
                    placeholder="Salary Amount"
                    onChange={handleInput('amount')} 
                />
            </div>
           <div className='cont'>
           <div className="input-control">
                <DatePicker 
                    id="date"
                    placeholderText="Enter A Date"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={date => setInputState({ ...inputState, date })}
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
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">YouTube</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
           </div>
            <div className="input-control">
                <textarea 
                    name="description" 
                    value={description} 
                    placeholder="Add A Reference" 
                    id="description" 
                    cols="50" 
                    rows="2" 
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name="Add Income"
                    icon={plus}
                    bPad=".8rem 1.3rem"
                    bRad="30px"
                    bg="var(--color-accent)"
                    color="#fff"
                  
                />
            </div>
        </FormStyled>
    );
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .4rem 1rem;
        border-radius: 10px;
        border: 2px solid #cccccc;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control {
        input {
            width: 100%;
        }
    }

    .selects {
        display: flex;
        justify-content: flex-end;
        select {
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active {
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn {
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: var(--color-green) !important;
            }
        }
    }
    .cont{
    display:flex;
    justify-content:space-between;
    // padding-right: 10%
    }
`;

export default Form;
