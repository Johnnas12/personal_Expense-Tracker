import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { format, startOfDay, subDays, endOfDay } from 'date-fns';

const ReportTable = () => {
  const [expenses, setExpenses] = useState([]);
  const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'];

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/expenses/get', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses', error);
      }
    };
    fetchExpenses();
  }, []);

  // Calculate totals for a given period
  const calculateTotals = (startDate, endDate) => {
    const totals = {};
    expenses.forEach(expense => {
      const expenseDate = new Date(expense.createdAt);
      if (expenseDate >= startDate && expenseDate <= endDate) {
        totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
      }
    });

    // Ensure all categories are included in the totals
    categories.forEach(category => {
      if (!(category in totals)) {
        totals[category] = 0;
      }
    });

    return totals;
  };

  // Get date ranges using date-fns
  const today = startOfDay(new Date());
  const yesterday = subDays(today, 1);
  const sevenDaysAgo = subDays(today, 7);

  const data = [
    {
      period: 'Today',
      ...categories.reduce((acc, category) => ({
        ...acc,
        [category]: calculateTotals(today, endOfDay(today))[category] || 0,
      }), {})
    },
    {
      period: 'Yesterday',
      ...categories.reduce((acc, category) => ({
        ...acc,
        [category]: calculateTotals(yesterday, endOfDay(yesterday))[category] || 0,
      }), {})
    },
    {
      period: 'Last 7 Days',
      ...categories.reduce((acc, category) => ({
        ...acc,
        [category]: calculateTotals(sevenDaysAgo, endOfDay(today))[category] || 0,
      }), {})
    },
  ];

  const columns = [
    {
      name: 'Period',
      selector: row => row.period,
      sortable: true,
    },
    ...categories.map(category => ({
      name: category,
      selector: row => row[category],
      sortable: true,
    }))
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Expense Report</h3>
      <DataTable
        columns={columns}
        data={data}
        pagination
      />
    </div>
  );
};

export default ReportTable;
