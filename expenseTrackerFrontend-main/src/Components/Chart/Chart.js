// import React from 'react';
// import { Chart as ChartJs, 
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import styled from 'styled-components';
// import { useGlobalContext } from '../../context/globalContext';
// import { dateFormat } from '../../utils/dateFormat';

// ChartJs.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
// );

// function Chart() {
//     const { incomes, expenses } = useGlobalContext();

//     // Combine incomes and expenses into a single data structure
//     const allEntries = [...incomes, ...expenses];
    
//     // Sort entries by date
//     allEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
    
//     // Map to labels and data
//     const labels = allEntries.map(entry => dateFormat(entry.date));
//     const incomeData = allEntries.map(entry => entry.type === 'income' ? entry.amount : null).filter(amount => amount !== null);
//     const expenseData = allEntries.map(entry => entry.type === 'expense' ? entry.amount : null).filter(amount => amount !== null);

//     const data = {
//         labels,
//         datasets: [
//             {
//                 label: 'Income',
//                 data: incomeData,
//                 borderColor: 'green',
//                 backgroundColor: 'rgba(0, 255, 0, 0.1)', // Light green background for the area under the line
//                 fill: true, // Filling area under the line
//                 tension: 0.2
//             },
//             {
//                 label: 'Expenses',
//                 data: expenseData,
//                 borderColor: 'red',
//                 backgroundColor: 'rgba(255, 0, 0, 0.1)', // Light red background for the area under the line
//                 fill: true, // Filling area under the line
//                 tension: 0.2
//             }
//         ]
//     };

//     // Options to customize the appearance and interaction
//     const options = {
//         plugins: {
//             legend: {
//                 position: 'top',
//                 labels: {
//                     color: '#333' // Legend text color
//                 }
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function(tooltipItem) {
//                         return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
//                     }
//                 }
//             },
//             title: {
//                 display: true,
//                 text: 'Income vs Expenses',
//                 color: '#333', // Title text color
//                 font: {
//                     size: 16
//                 }
//             }
//         },
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Date',
//                     color: '#333' // X-axis title color
//                 },
//                 grid: {
//                     color: '#ddd' // Grid line color
//                 }
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Amount',
//                     color: '#333' // Y-axis title color
//                 },
//                 grid: {
//                     color: '#ddd' // Grid line color
//                 }
//             }
//         }
//     };

//     return (
//         <ChartStyled>
//             <Line data={data} options={options} />
//         </ChartStyled>
//     );
// }

// const ChartStyled = styled.div`
//     background: #FCF6F9;
//     border: 2px solid #FFFFFF;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     padding: 1.5rem; /* Added a bit more padding for visual balance */
//     border-radius: 15px; /* Slightly reduced border-radius for a modern look */
//     height: 400px; /* Set a fixed height to control the chart's size */
//     width: 100%;  /* Ensure it takes full width of parent container */
//     max-width: 800px; /* Set a max-width for larger screens */
//     margin: 0 auto; /* Center align the chart within its container */
    
//     /* Responsive Design */
//     @media (max-width: 768px) {
//         height: 300px; /* Adjust height for smaller screens */
//     }

//     canvas {
//         display: block; /* Ensures the canvas behaves properly within the container */
//     }
// `;

// export default Chart;

// import React from 'react';
// import { Chart as ChartJs, 
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import styled from 'styled-components';
// import { useGlobalContext } from '../../context/globalContext';
// import { dateFormat } from '../../utils/dateFormat';

// ChartJs.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
// );

// function Chart() {
//     const { incomes, expenses } = useGlobalContext();

//     // Combine incomes and expenses into a single data structure
//     const allEntries = [...incomes, ...expenses];
    
//     // Sort entries by date
//     allEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
    
//     // Map to labels and data
//     const labels = allEntries.map(entry => dateFormat(entry.date));
//     const incomeData = allEntries.map(entry => entry.type === 'income' ? entry.amount : null).filter(amount => amount !== null);
//     const expenseData = allEntries.map(entry => entry.type === 'expense' ? entry.amount : null).filter(amount => amount !== null);

//     const data = {
//         labels,
//         datasets: [
//             {
//                 label: 'Income',
//                 data: incomeData,
//                 borderColor: 'green',
//                 backgroundColor: 'rgba(0, 255, 0, 0.1)', // Light green background for the area under the line
//                 fill: true, // Filling area under the line
//                 tension: 0.2
//             },
//             {
//                 label: 'Expenses',
//                 data: expenseData,
//                 borderColor: 'red',
//                 backgroundColor: 'rgba(255, 0, 0, 0.1)', // Light red background for the area under the line
//                 fill: true, // Filling area under the line
//                 tension: 0.2
//             }
//         ]
//     };

//     // Options to customize the appearance and interaction
//     const options = {
//         plugins: {
//             legend: {
//                 position: 'top',
//                 labels: {
//                     color: '#333' // Legend text color
//                 }
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function(tooltipItem) {
//                         return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
//                     }
//                 }
//             },
//             title: {
//                 display: true,
//                 text: 'Income vs Expenses',
//                 color: '#333', // Title text color
//                 font: {
//                     size: 16
//                 }
//             }
//         },
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Date',
//                     color: '#333' // X-axis title color
//                 },
//                 grid: {
//                     color: '#ddd' // Grid line color
//                 }
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Amount',
//                     color: '#333' // Y-axis title color
//                 },
//                 grid: {
//                     color: '#ddd' // Grid line color
//                 }
//             }
//         }
//     };

//     return (
//         <ChartStyled>
//             <Line data={data} options={options} />
//         </ChartStyled>
//     );
// }

// const ChartStyled = styled.div`
//     background: #FCF6F9;
//     border: 2px solid #FFFFFF;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     padding: 1.5rem; /* Added a bit more padding for visual balance */
//     border-radius: 15px; /* Slightly reduced border-radius for a modern look */
//     height: 400px; /* Set a fixed height to control the chart's size */
//     width: 100%;  /* Ensure it takes full width of parent container */
//     max-width: 800px; /* Set a max-width for larger screens */
//     margin: 0 auto; /* Center align the chart within its container */
    
//     /* Responsive Design */
//     @media (max-width: 768px) {
//         height: 300px; /* Adjust height for smaller screens */
//     }

//     canvas {
//         display: block; /* Ensures the canvas behaves properly within the container */
//     }
// `;

// export default Chart;

import React from 'react';
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

function BarChart() {
    const { incomes, expenses } = useGlobalContext();

    // Combine incomes and expenses into a single data structure
    const allEntries = [...incomes, ...expenses];
    
    // Sort entries by date
    allEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Map to labels and data
    const labels = allEntries.map(entry => dateFormat(entry.date));
    const incomeData = allEntries.map(entry => entry.type === 'income' ? entry.amount : 0);
    const expenseData = allEntries.map(entry => entry.type === 'expense' ? entry.amount : 0);

    const data = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(0, 255, 0, 0.6)', // Semi-transparent green
                borderColor: 'green',
                borderWidth: 1,
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: 'rgba(255, 0, 0, 0.6)', // Semi-transparent red
                borderColor: 'red',
                borderWidth: 1,
            }
        ]
    };

    // Options to customize the appearance and interaction
    const options = {
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#333' // Legend text color
                }
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    }
                }
            },
            title: {
                display: true,
                text: 'Income vs Expenses',
                color: '#333', // Title text color
                font: {
                    size: 16
                }
            }
        },
        scales: {
            x: {
                stacked: true, // Stack bars on the x-axis
                title: {
                    display: true,
                    text: 'Date',
                    color: '#333' // X-axis title color
                },
                grid: {
                    color: '#ddd' // Grid line color
                }
            },
            y: {
                stacked: true, // Stack bars on the y-axis
                title: {
                    display: true,
                    text: 'Amount',
                    color: '#333' // Y-axis title color
                },
                grid: {
                    color: '#ddd' // Grid line color
                }
            }
        }
    };

    return (
        <ChartStyled>
            <Bar data={data} options={options} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1.5rem; /* Added a bit more padding for visual balance */
    border-radius: 15px; /* Slightly reduced border-radius for a modern look */
    height: 400px; /* Set a fixed height to control the chart's size */
    width: 100%;  /* Ensure it takes full width of parent container */
    max-width: 800px; /* Set a max-width for larger screens */
    margin: 0 auto; /* Center align the chart within its container */
    
    /* Responsive Design */
    @media (max-width: 768px) {
        height: 300px; /* Adjust height for smaller screens */
    }

    canvas {
        display: block; /* Ensures the canvas behaves properly within the container */
    }
`;

export default BarChart;

