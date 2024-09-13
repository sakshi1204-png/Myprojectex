import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Add an income
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income);
            await getIncomes(); // Refresh incomes after adding
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    // Get incomes
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            setIncomes(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    // Delete an income
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            await getIncomes(); // Refresh incomes after deleting
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    // Add an expense
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense);
            await getExpenses(); // Refresh expenses after adding
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    // Update an expense
    const updateExpense = async (id, updatedExpense) => {
        try {
            await axios.put(`${BASE_URL}update-expense/${id}`, updatedExpense);
            await getExpenses(); // Refresh expenses after updating
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    // Get expenses
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            setExpenses(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    // Delete an expense
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            await getExpenses(); // Refresh expenses after deleting
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    // Calculate total income
    const totalIncome = () => incomes.reduce((total, income) => total + income.amount, 0);

    // Calculate total expenses
    const totalExpenses = () => expenses.reduce((total, expense) => total + expense.amount, 0);

    // Calculate total balance
    const totalBalance = () => totalIncome() - totalExpenses();

    // Get transaction history
    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3); // Return the most recent 3 transactions
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            addExpense,
            updateExpense,
            getExpenses,
            deleteExpense,
            expenses,
            totalIncome,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
