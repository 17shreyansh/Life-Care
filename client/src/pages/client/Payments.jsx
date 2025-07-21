import React from 'react';

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

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Paid': return 'bg-success';
      case 'Pending': return 'bg-warning';
      case 'Failed': return 'bg-danger';
      case 'Refunded': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h5 className="mb-0">Payment History</h5>
      </div>
      <div className="dashboard-card-body">
        <div className="table-responsive">
          <table className="table table-hover">
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
                    <span className={`badge ${getStatusBadgeClass(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-download me-1"></i> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4">
          <h6>Payment Summary</h6>
          <div className="row">
            <div className="col-md-4">
              <div className="card bg-light mb-3">
                <div className="card-body">
                  <h6 className="card-title text-muted">Total Spent</h6>
                  <h3 className="mb-0 text-gradient">₹4,500</h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-light mb-3">
                <div className="card-body">
                  <h6 className="card-title text-muted">Sessions Attended</h6>
                  <h3 className="mb-0 text-gradient">3</h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-light mb-3">
                <div className="card-body">
                  <h6 className="card-title text-muted">Average Cost</h6>
                  <h3 className="mb-0 text-gradient">₹1,500</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;