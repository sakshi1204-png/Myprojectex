import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';


function History() {
    const { transactionHistory } = useGlobalContext();

    // Filter to show only expenses
    const expenseHistory = transactionHistory().filter(item => item.type === 'expense');
    
    // Sort expenses by date (most recent first)
    const sortedExpenses = expenseHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Limit to the most recent 3 expenses
    const recentExpenses = sortedExpenses.slice(0, 3);

    return (
        <HistoryStyled>
            <h2>Recent Expense History</h2>
            {recentExpenses.map((item) => {
                const { _id, title, amount } = item;
                return (
                    <div key={_id} className="history-item">
                        <p className="title">{title}</p>
                        <p className="amount">{`-${amount <= 0 ? 0 : amount}`}</p>
                    </div>
                );
            })}
        </HistoryStyled>
    );
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 1rem;
    }

    .history-item {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            color: red;
            font-weight: 500;
        }

        .amount {
            color: red;
            font-weight: 700;
        }
    }
`;

export default History;
