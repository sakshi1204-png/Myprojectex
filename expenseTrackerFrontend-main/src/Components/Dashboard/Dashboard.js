import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>Dashboard</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>{dollar} {totalIncome()}</p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>{dollar} {totalExpenses()}</p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>{dollar} {totalBalance()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Income</span> Max</h2>
                        <div className="salary-item">
                            <p>${Math.min(...incomes.map(item => item.amount))}</p>
                            <p>${Math.max(...incomes.map(item => item.amount))}</p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span> Max</h2>
                        <div className="salary-item">
                            <p>${Math.min(...expenses.map(item => item.amount))}</p>
                            <p>${Math.max(...expenses.map(item => item.amount))}</p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}
const DashboardStyled = styled.div`
    h1 {
        margin-bottom: 1%;
        font-size: 35px;
        padding-left: 1%;
    }

    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 3rem;

        .chart-con {
            grid-column: 1/ 4;
            height: 400px; /* Increased height for the chart */
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;


            .amount-con {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 2rem;
                // width: 400%
                margin-top: 2rem;

                .income, .expense, .balance {
                    background: #FFFFFF;
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
                    border-radius: 12px;
                    padding: 1rem;
                    text-align: center;
                    flex: 2
                                            // font-size: 1.5rem;
                                            // font-weight: 300px;


                    h2 {
                        font-size: 1.5rem;
                        color: #333333;
                    }

                    p {
                        font-size: 3rem;
                        font-weight: 570;
                        margin: 0.5rem 0 0 0;
                    }
                }

                .balance {
                    grid-column: span 1;
                    p {
                        color: var(--color-green);
                        font-size: 3rem;
                        opacity: 0.8;
                    }
                }
            }
        }

        .history-con {
            grid-column: 4 / -1;

            h2 {
                font-size: 1.5rem;
                color: #333333;
            }

            .salary-title {
                font-size: 1.4rem;
                margin: 1.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                span {
                    font-size: 1.6rem;
                    color: #007BFF;
                }
            }

            .salary-item {
                background: #FFFFFF;
                box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
                padding: 1rem;
                border-radius: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                p {
                    font-weight: 600;
                    font-size: 1.4rem;
                    color: #333333;
                }
            }
        }
    }
`;

export default Dashboard;
