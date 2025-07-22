import { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, Row, Col, Form, Alert, Modal } from 'react-bootstrap';
import { counsellorAPI } from '../../services/api';

const Earnings = () => {
  const [earnings, setEarnings] = useState({
    total: 0,
    withdrawn: 0,
    pending: 0
  });
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalError, setWithdrawalError] = useState('');
  const [withdrawalSuccess, setWithdrawalSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const response = await counsellorAPI.getEarnings();
      setEarnings(response.data.data.earnings);
      setWithdrawalRequests(response.data.data.withdrawalRequests);
    } catch (error) {
      console.error('Error fetching earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    setWithdrawalError('');
    setWithdrawalSuccess('');
    setSubmitting(true);

    const amount = parseFloat(withdrawalAmount);

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      setWithdrawalError('Please enter a valid amount');
      setSubmitting(false);
      return;
    }

    if (amount < 100) {
      setWithdrawalError('Minimum withdrawal amount is ₹100');
      setSubmitting(false);
      return;
    }

    if (amount > earnings.pending) {
      setWithdrawalError('Withdrawal amount cannot exceed your pending balance');
      setSubmitting(false);
      return;
    }

    try {
      await counsellorAPI.requestWithdrawal({ amount });
      setWithdrawalSuccess('Withdrawal request submitted successfully');
      setWithdrawalAmount('');
      fetchEarnings(); // Refresh data
      setTimeout(() => {
        setShowWithdrawModal(false);
      }, 2000);
    } catch (error) {
      console.error('Error requesting withdrawal:', error);
      setWithdrawalError('Failed to submit withdrawal request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get badge color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'info';
      case 'processed': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div>
      <h2 className="mb-4">Earnings & Withdrawals</h2>
      
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-success-light me-3">
                  <i className="bi bi-wallet2 text-success"></i>
                </div>
                <h5 className="card-title mb-0">Total Earnings</h5>
              </div>
              <h2 className="mb-0">{formatCurrency(earnings.total)}</h2>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-primary-light me-3">
                  <i className="bi bi-cash-coin text-primary"></i>
                </div>
                <h5 className="card-title mb-0">Available Balance</h5>
              </div>
              <h2 className="mb-0">{formatCurrency(earnings.pending)}</h2>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-info-light me-3">
                  <i className="bi bi-bank text-info"></i>
                </div>
                <h5 className="card-title mb-0">Withdrawn</h5>
              </div>
              <h2 className="mb-0">{formatCurrency(earnings.withdrawn)}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Withdrawal Requests</h5>
          <Button 
            variant="primary" 
            onClick={() => setShowWithdrawModal(true)}
            disabled={earnings.pending < 100}
          >
            Request Withdrawal
          </Button>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading your earnings...</p>
            </div>
          ) : withdrawalRequests.length > 0 ? (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Request Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Processed Date</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {withdrawalRequests.map((request) => (
                  <tr key={request._id}>
                    <td>{formatDate(request.createdAt)}</td>
                    <td>{formatCurrency(request.amount)}</td>
                    <td>
                      <Badge bg={getStatusBadge(request.status)}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </td>
                    <td>{formatDate(request.processedAt)}</td>
                    <td>
                      {request.transactionId || 
                        (request.status === 'rejected' ? 
                          <span className="text-danger">Rejected: {request.rejectionReason}</span> : 
                          'N/A')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center py-5">
              <p className="mb-0">No withdrawal requests found</p>
            </div>
          )}
        </Card.Body>
      </Card>
      
      {/* Withdraw Modal */}
      <Modal show={showWithdrawModal} onHide={() => setShowWithdrawModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Request Withdrawal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {withdrawalSuccess && <Alert variant="success">{withdrawalSuccess}</Alert>}
          {withdrawalError && <Alert variant="danger">{withdrawalError}</Alert>}
          
          <Form onSubmit={handleWithdrawSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Available Balance</Form.Label>
              <Form.Control
                type="text"
                value={formatCurrency(earnings.pending)}
                disabled
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Withdrawal Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                required
                min="100"
                max={earnings.pending}
              />
              <Form.Text className="text-muted">
                Minimum withdrawal amount is ₹100
              </Form.Text>
            </Form.Group>
            
            <div className="d-grid">
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? 'Processing...' : 'Submit Request'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Earnings;