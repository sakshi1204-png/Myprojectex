import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import { Typography } from '@mui/material';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <DashboardStyled>
           
            <InnerLayout>
            <div className="header">
                    <Typography variant="h4">Welcome, [User's Name]</Typography>
                    <Typography variant="subtitle1">Here's an overview of your financial activity.</Typography>
                </div>
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









// import React, { useEffect } from 'react';
// import styled from 'styled-components';
// import { useGlobalContext } from '../../context/globalContext';
// import History from '../../History/History';
// import { InnerLayout } from '../../styles/Layouts';
// import { dollar } from '../../utils/Icons';
// import Chart from '../Chart/Chart';
// import { Typography, Card, CardContent, Divider, Box, LinearProgress } from '@mui/material';

// function Dashboard() {
//     const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

//     useEffect(() => {
//         getIncomes();
//         getExpenses();
//     }, []);

//     const recentTransactions = [
//         { id: 1, description: 'Grocery Shopping', amount: 50.00, date: '2024-09-10' },
//         { id: 2, description: 'Salary', amount: 2000.00, date: '2024-09-01' },
//         { id: 3, description: 'Electricity Bill', amount: 75.00, date: '2024-09-05' },
//     ];

//     const savingsGoal = {
//         target: 5000,
//         current: 1500,
//     };

//     return (
//         <DashboardStyled>
//             <InnerLayout>
//                 <Box className="header">
//                     <Typography variant="h4">Welcome, [User's Name]</Typography>
//                     <Typography variant="subtitle1">Here's an overview of your financial activity.</Typography>
//                 </Box>
//                 <Box className="stats-con">
//                     <Box className="chart-con">
                    
//                                 <Chart />
                       
//                         <Box className="amount-con">
//                             <Card className="amount-card income-card">
//                                 <CardContent>
//                                     <Typography variant="h6">Total Income</Typography>
//                                     <Typography variant="h4">{dollar} {totalIncome()}</Typography>
//                                 </CardContent>
//                             </Card>
//                             <Card className="amount-card expense-card">
//                                 <CardContent>
//                                     <Typography variant="h6">Total Expense</Typography>
//                                     <Typography variant="h4">{dollar} {totalExpenses()}</Typography>
//                                 </CardContent>
//                             </Card>
//                             <Card className="amount-card balance-card">
//                                 <CardContent>
//                                     <Typography variant="h6">Total Balance</Typography>
//                                     <Typography variant="h4">{dollar} {totalBalance()}</Typography>
//                                 </CardContent>
//                             </Card>
//                         </Box>
//                     </Box>
//                     <Box className="history-con">
//                         <Card className="monthly-overview-card">
//                             <CardContent>
//                                 <Typography variant="h6">Monthly Overview</Typography>
//                                 <Divider sx={{ my: 2 }} />
//                                 <Box className="overview-item">
//                                     <Typography>Total Income: {dollar} {totalIncome()}</Typography>
//                                     <Typography>Total Expense: {dollar} {totalExpenses()}</Typography>
//                                 </Box>
//                             </CardContent>
//                         </Card>
//                         <Card className="savings-goal-card">
//                             <CardContent>
//                                 <Typography variant="h6">Savings Goal</Typography>
//                                 <Divider sx={{ my: 2 }} />
//                                 <Box className="savings-goal">
//                                     <Typography>Target: {dollar} {savingsGoal.target}</Typography>
//                                     <Typography>Current: {dollar} {savingsGoal.current}</Typography>
//                                     <Typography>Remaining: {dollar} {savingsGoal.target - savingsGoal.current}</Typography>
//                                     <LinearProgress
//                                         variant="determinate"
//                                         value={(savingsGoal.current / savingsGoal.target) * 100}
//                                         sx={{ mt: 1, height: 8, borderRadius: 5 }}
//                                     />
//                                 </Box>
//                             </CardContent>
//                         </Card>
//                         <Card className="recent-transactions-card">
//                             <CardContent>
//                                 <Typography variant="h6">Recent Transactions</Typography>
//                                 <Divider sx={{ my: 2 }} />
//                                 <Box className="transactions-list">
//                                     {recentTransactions.map(transaction => (
//                                         <Box key={transaction.id} className="transaction-item">
//                                             <Typography variant="body2">{transaction.description}</Typography>
//                                             <Typography variant="body2">{dollar} {transaction.amount}</Typography>
//                                             <Typography variant="caption">{transaction.date}</Typography>
//                                         </Box>
//                                     ))}
//                                 </Box>
//                             </CardContent>
//                         </Card>
//                     </Box>
//                 </Box>
//             </InnerLayout>
//         </DashboardStyled>
//     );
// }

// const DashboardStyled = styled.div`
//     .header {
//         text-align: center;
//         margin-bottom: 2rem;

//         h4 {
//             font-size: 2.5rem;
//             color: #333;
//             margin-bottom: 0.5rem;
//             font-weight: 700;
//         }

//         .MuiTypography-subtitle1 {
//             color: #666;
//             font-weight: 400;
//         }
//     }

//     .stats-con {
//         display: grid;
//         grid-template-columns: repeat(12, 1fr);
//         gap: 2rem;

//         .chart-con {
//             grid-column: span 8;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
          
//             .chart-card {
//                 width: 100%;
//                 margin-bottom: 1rem;
//                 border-radius: 15px;
//                 box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
//                 background: #ffffff;
//             }

//             .amount-con {
//                 display: grid;
//                 grid-template-columns: repeat(3, 1fr);
//                 gap: 1rem;
//                 margin-top: 1rem;
//                 width: 80%;
//                 height: 20%;

//                 .amount-card {
//                     display: flex;
//                     flex-direction: column;
//                     align-items: center;
//                     padding: 1.5rem;
//                     border-radius: 12px;
//                     text-align: center;
//                     background: #f9f9f9;
//                     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//                     transition: transform 0.3s, box-shadow 0.3s;
//                     &:hover {
//                         transform: scale(1.02);
//                         box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
//                     }

//                     h6 {
//                         font-size: 1rem;
//                         color: #555;
//                         margin-bottom: 0.5rem;
//                     }

//                     h4 {
//                         font-size: 2rem;
//                         font-weight: 700;
//                         margin: 0;
//                     }
//                 }

//                 .income-card {
//                     background: linear-gradient(135deg, #d1e7dd, #c9f4e4);
//                 }

//                 .expense-card {
//                     background: linear-gradient(135deg, #f8d7da, #f4c6c6);
//                 }

//                 .balance-card {
//                     background: linear-gradient(135deg, #e2e3e5, #d3d6d8);
//                     color: #495057;
//                 }
//             }
//         }

//         .history-con {
//             grid-column: span 4;

//             .monthly-overview-card, .savings-goal-card, .recent-transactions-card {
//                 margin-bottom: 1.5rem;
//                 border-radius: 15px;
//                 box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//                 background: #ffffff;

//                 .overview-item, .savings-goal, .transactions-list {
//                     margin-top: 1rem;

//                     .transaction-item {
//                         display: flex;
//                         justify-content: space-between;
//                         align-items: center;
//                         padding: 0.75rem;
//                         border-bottom: 1px solid #ddd;
//                         transition: background-color 0.3s;

//                         &:hover {
//                             background-color: #f1f1f1;
//                         }

//                         .MuiTypography-body2 {
//                             font-size: 1rem;
//                         }

//                         .MuiTypography-caption {
//                             font-size: 0.75rem;
//                             color: #777;
//                         }
//                     }
//                 }
//             }
//         }
//     }

//     @media (max-width: 768px) {
//         .stats-con {
//             grid-template-columns: 1fr;

//             .chart-con, .history-con {
//                 grid-column: span 1;
//             }

//             .amount-con {
//                 grid-template-columns: 1fr;
//             }
//         }
//     }
// `;

// export default Dashboard;
