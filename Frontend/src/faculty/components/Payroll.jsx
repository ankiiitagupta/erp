import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import '../stylesheets/Payroll.css';

const Payroll = ({ salaryData, deductions, allowances, unpaidLeave = 0 }) => {
  const { basicSalary, bonus } = salaryData;

  // Sum up dynamic allowances and deductions
  const totalAllowances = allowances.reduce((acc, curr) => acc + curr.amount, 0);
  const totalDeductions = deductions.reduce((acc, curr) => acc + curr.amount, 0) + unpaidLeave;

  // Calculate gross and net salary
  const grossSalary = basicSalary + totalAllowances + bonus;
  const netSalary = grossSalary - totalDeductions;

  // Data for Pie Chart
  const data = [
    { name: 'Basic Salary', value: basicSalary },
    ...allowances.map(item => ({ name: item.name, value: item.amount })),
    { name: 'Bonus', value: bonus },
    ...deductions.map(item => ({ name: item.name, value: -item.amount })),
    { name: 'Unpaid Leave', value: -unpaidLeave },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#D0ED57', '#A0E4FE', '#FFA07A', '#FFC0CB', '#B0C4DE'];

  // Utility function for currency formatting
  const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  return (
    <div className="payroll-container">
      <h2>Faculty Payroll</h2>

      <div className="payroll-content">
        <div className="chart-container" style={{ float: 'left', marginRight: '20px' }}>
          <PieChart width={200} height={200}>
            <Pie 
              data={data} 
              cx="50%" 
              cy="50%" 
              outerRadius={100} 
         
           
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="salary-details-container" style={{ marginLeft: '220px' }}>
          <div className="salary-section">
            <h6>Salary Breakdown</h6>
            <div className="salary-details">
              <div><strong>Basic Salary:</strong> {formatCurrency(basicSalary)}</div>
              {allowances.map((allowance, index) => (
                <div key={index}><strong>{allowance.name}:</strong> {formatCurrency(allowance.amount)}</div>
              ))}
              <div><strong>Bonus:</strong> {formatCurrency(bonus)}</div>
              <hr />
              <div><strong>Gross Salary:</strong> {formatCurrency(grossSalary)}</div>
            </div>
          </div>

          <div className="deductions-section">
            <h6>Deductions</h6>
            <div className="deductions-details">
              {deductions.map((deduction, index) => (
                <div key={index}><strong>{deduction.name}:</strong> {formatCurrency(deduction.amount)}</div>
              ))}
              <div><strong>Unpaid Leave:</strong> {formatCurrency(unpaidLeave)}</div>
              <hr />
              <div><strong>Total Deductions:</strong> {formatCurrency(totalDeductions)}</div>
            </div>
          </div>

          <div className="net-salary-section">
            <h6>Net Salary</h6>
            <div className="net-salary">
            Net Salary: {formatCurrency(netSalary)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
