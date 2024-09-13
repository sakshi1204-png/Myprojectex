import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import { Typography, Card, CardContent, Grid, Box } from '@mui/material';

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
                    <Typography variant="h4" className="welcome-message">
                        Welcome, [User's Name]
                    </Typography>
                    <Typography variant="subtitle1" className="subtext">
                        Here's an overview of your financial activity.
                    </Typography>
                </div>

                <Grid container spacing={4} className="stats-section">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="card-stat">
                            <CardContent>
                                <Typography variant="h6" color="textSecondary">
                                    Total Income
                                </Typography>
                                <Typography variant="h4" color="primary" className="stat-value">
                                    {dollar} {totalIncome()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="card-stat">
                            <CardContent>
                                <Typography variant="h6" color="textSecondary">
                                    Total Expense
                                </Typography>
                                <Typography variant="h4" color="error" className="stat-value">
                                    {dollar} {totalExpenses()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="card-stat">
                            <CardContent>
                                <Typography variant="h6" color="textSecondary">
                                    Total Balance
                                </Typography>
                                <Typography variant="h4" color="success" className="stat-value">
                                    {dollar} {totalBalance()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Card className="chart-card">
                            <CardContent>
                                <Typography variant="h6">Financial Overview</Typography>
                                <Chart />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card className="history-card">
                            <CardContent>
                                <History />
                                <Box className="min-max-container">
                                    <Typography variant="h6" className="salary-title">
                                        Min <span>Income</span> Max
                                    </Typography>
                                    <div className="salary-item">
                                        <Typography>${Math.min(...incomes.map(item => item.amount))}</Typography>
                                        <Typography>${Math.max(...incomes.map(item => item.amount))}</Typography>
                                    </div>

                                    <Typography variant="h6" className="salary-title">
                                        Min <span>Expense</span> Max
                                    </Typography>
                                    <div className="salary-item">
                                        <Typography>${Math.min(...expenses.map(item => item.amount))}</Typography>
                                        <Typography>${Math.max(...expenses.map(item => item.amount))}</Typography>
                                    </div>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .header {
        text-align: center;
        margin-bottom: 2rem;
        
        .welcome-message {
            font-size: 2rem;
            font-weight: bold;
        }

        .subtext {
            font-size: 1.2rem;
            color: gray;
        }
    }

    .stats-section {
        margin-bottom: 2rem;

        .card-stat {
            background-color: #f9f9f9;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;

            &:hover {
                transform: scale(1.05);
            }

            .stat-value {
                margin-top: 0.5rem;
            }
        }
    }

    .chart-card {
        background-color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .history-card {
        background-color: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

        .salary-title {
            margin-top: 1rem;
            font-size: 1.2rem;
            display: flex;
            justify-content: space-between;

            span {
                color: #007BFF;
            }
        }

        .salary-item {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
            padding: 0.5rem;
            background-color: #f0f0f0;
            border-radius: 10px;
        }
    }
`;

export default Dashboard;
