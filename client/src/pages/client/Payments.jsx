import React from 'react';
import './Payments.css';

const Payments = () => {
  // Mock payment data
  const payments = [
    {
      id: 'INV-001',
      date: '2023-06-10',
      counsellor: 'Dr. Sarah Johnson',
      amount: 1500,
      status: 'Paid',
      sessionType: 'Video Call'
    },
    {
      id: 'INV-002',
      date: '2023-05-25',
      counsellor: 'Dr. Michael Chen',
      amount: 1800,
      status: 'Paid',
      sessionType: 'Video Call'
    },
    {
      id: 'INV-003',
      date: '2023-05-15',
      counsellor: 'Dr. Emily Rodriguez',
      amount: 1200,
      status: 'Refunded',
      sessionType: 'Chat Session'
    }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid': return 'status-paid';
      case 'Pending': return 'status-pending';
      case 'Failed': return 'status-failed';
      case 'Refunded': return 'status-refunded';
      default: return '';
    }
  };
  
  // Calculate totals
  const totalSpent = payments.reduce((sum, payment) => 
    payment.status !== 'Refunded' ? sum + payment.amount : sum, 0
  );
  
  const sessionsAttended = payments.filter(payment => 
    payment.status === 'Paid'
  ).length;
  
  const averageCost = sessionsAttended > 0 ? 
    Math.round(totalSpent / sessionsAttended) : 0;

  return (
    <div className="payments-page">
      <div className="payments-header">
        <h1>Payment History</h1>
        <p>View and manage your payment transactions</p>
      </div>
      
      <div className="payment-cards">
        <div className="stat-card">
          <div className="stat-title">
            <div className="stat-icon-pay">
              <i className="bi bi-wallet2"></i>
            </div>
            <span>Total Spent</span>
          </div>
          <div className="stat-value">₹{totalSpent}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title">
            <div className="stat-icon-pay">
              <i className="bi bi-calendar-check"></i>
            </div>
            <span>Sessions Attended</span>
          </div>
          <div className="stat-value">{sessionsAttended}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title">
            <div className="stat-icon-pay">
              <i className="bi bi-graph-up"></i>
            </div>
            <span>Average Cost</span>
          </div>
          <div className="stat-value">₹{averageCost}</div>
        </div>
      </div>
      
      <div className="payments-table-container">
        <div className="payments-table-header">
          <h5 className="payments-table-title">
            <div className="table-icon-pay">
              <i className="bi bi-receipt"></i>
            </div>
            <span>Transaction History</span>
          </h5>
        </div>
        
        <div className="table-responsive">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Counsellor</th>
                <th>Session Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                  <td>{payment.counsellor}</td>
                  <td>{payment.sessionType}</td>
                  <td>₹{payment.amount}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(payment.status)}`}>
                      <i className={`bi ${
                        payment.status === 'Paid' ? 'bi-check-circle' : 
                        payment.status === 'Pending' ? 'bi-clock' :
                        payment.status === 'Failed' ? 'bi-x-circle' : 'bi-arrow-repeat'
                      }`}></i>
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    <button className="download-button">
                      <i className="bi bi-download"></i> Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;