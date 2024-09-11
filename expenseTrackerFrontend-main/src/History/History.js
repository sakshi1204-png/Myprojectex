import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';

function History() {
    const { transactionHistory } = useGlobalContext();

    // Filter to show only expenses
    const expenseHistory = transactionHistory().filter(item => item.type === 'expense');

    return (
        <HistoryStyled>
            <h2>Recent Expense History</h2>
            {expenseHistory.map((item) => {
                const { _id, title, amount } = item;
                return (
                    <div key={_id} className="history-item">
                        <p style={{ color: 'red' }}>
                            {title}
                        </p>
                        <p style={{ color: 'red' }}>
                            {`-${amount <= 0 ? 0 : amount}`}
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default History;
