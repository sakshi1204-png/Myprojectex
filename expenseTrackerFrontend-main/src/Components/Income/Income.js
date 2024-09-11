import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const {addIncome,incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()

    useEffect(() =>{
        getIncomes()
    }, [])
    return (
        <IncomeStyled>
            <InnerLayout>
                <h1> Add Income</h1>
                <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteIncome}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
    display: flex;
    flex-direction: column;
    padding: -1rem 4rem;
    background-color: #f8f9fa;
    min-height: 100vh;
    
    h1 {
        text-align: center;
        font-size: 2.5rem;
        color: #2c3e50;
        margin-bottom: 0rem;
        font-weight: 600;
        padding-top= 2px;
        letter-spacing: 1.5px;
    }

    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffffff;
        border: 1px solid #e0e0e0;
        box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.05);
        border-radius: 12px;
        padding: 1rem ;
        margin: 1rem 0rem;
        font-size: 2.1rem;
        gap: 1rem;
        span{
            font-size: 3rem;
            font-weight: 800;
            color: #27ae60;
        }
    }

    .income-content{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        .form-container{
            flex: 0.5;
            background: #ffffff;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.05);
            border: 1px solid #e0e0e0;
                        max-height: 65vh;

        }
        .incomes{
            flex: 1;
            background: #ffffff;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.05);
            border: 1px solid #e0e0e0;
            overflow-y: auto;
            max-height: 100vh;

            &::-webkit-scrollbar {
                width: 10px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: #27ae60;
                border-radius: 4px;
            }
        }
    }
`;


export default Income