import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import Button from '../Button/Button';
import { trash, settings } from '../../utils/Icons'; // Adjust imports as needed

function Income() {
    const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

    useEffect(() => {
        getIncomes();
    }, [getIncomes]);

    const handleDelete = async (id) => {
        await deleteIncome(id);
        await getIncomes();
    };

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Add Income</h1>
                <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="history-container">
                        <h3>Recent Incomes</h3>
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
                                    {incomes.length > 0 ? (
                                        incomes.map((income) => (
                                            <tr key={income._id}>
                                                <td>{income.title}</td>
                                                <td>${income.amount}</td>
                                                <td>{new Date(income.date).toLocaleDateString()}</td>
                                                <td>{income.category}</td>
                                                <td>{income.description}</td>
                                                <td>
                                                    <Button
                                                        name='Edit'
                                                        icon={settings}
                                                        onClick={() => {}}
                                                    />
                                                    <Button
                                                        name='Delete'
                                                        icon={trash}
                                                        onClick={() => handleDelete(income._id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">No incomes found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </TableContainer>
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
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

    .total-income {
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

    .income-content {
        display: flex;
        gap: 1.5rem;
        flex-direction: row;

        .form-container {
            flex: 0.5;
            background: #ffffff;
            padding: 1.5rem;
            border-radius: 10px;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
            border: 1px solid #d0d0d0;
            max-height: 56vh;
        }

        .history-container {
            flex: 1;
            background: #ffffff;
            padding: 1.5rem;
            border-radius: 10px;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
            border: 1px solid #d0d0d0;
            max-height: 56vh;

            h3 {
                margin-bottom: 1rem;
                font-size: 1.4rem;
                font-weight: 600;
                color: #333;
            }
        }
    }
`;

const TableContainer = styled.div`
    max-height: 40vh; /* Set fixed height for the table container */
    overflow-y: auto; /* Enable vertical scroll if needed */
    margin-top: 1rem;

    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed; /* Ensure the table width is consistent */
        overflow:scroll
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

    td {
        text-align: center;
    }

    tr:nth-child(even) {
        background: #f9f9f9;
    }

    tr:hover {
        background: #f1f1f1;
    }
`;

export default Income;