// src/components/PaymentForm.jsx
import React, { useState } from 'react';

function PaymentForm() {
  const [paymentData, setPaymentData] = useState({
    homePrice: 500000,
    downPayment: 100000,
    loanTerm: 30,
    interestRate: 4.5
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = paymentData.homePrice - paymentData.downPayment;
    const monthlyRate = paymentData.interestRate / 100 / 12;
    const numberOfPayments = paymentData.loanTerm * 12;
    
    const monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return isNaN(monthlyPayment) ? 0 : monthlyPayment.toFixed(2);
  };

  return (
    <div className="payment-calculator">
      <h3>Mortgage Calculator</h3>
      
      <div className="form-group">
        <label htmlFor="homePrice">Home Price</label>
        <input
          type="number"
          id="homePrice"
          name="homePrice"
          value={paymentData.homePrice}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="downPayment">Down Payment</label>
        <input
          type="number"
          id="downPayment"
          name="downPayment"
          value={paymentData.downPayment}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="loanTerm">Loan Term (years)</label>
        <select
          id="loanTerm"
          name="loanTerm"
          value={paymentData.loanTerm}
          onChange={handleChange}
        >
          <option value="15">15 years</option>
          <option value="20">20 years</option>
          <option value="30">30 years</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="interestRate">Interest Rate (%)</label>
        <input
          type="number"
          step="0.1"
          id="interestRate"
          name="interestRate"
          value={paymentData.interestRate}
          onChange={handleChange}
        />
      </div>
      
      <div className="result">
        <h4>Estimated Monthly Payment</h4>
        <p className="monthly-payment">${calculateMonthlyPayment()}</p>
      </div>
    </div>
  );
}

export default PaymentForm;