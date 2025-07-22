import { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, Form, Row, Col } from 'react-bootstrap';
import { adminAPI } from '../../services/api';

const Counsellors = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    isVerified: '',
    active: '',
    search: ''
  });

  useEffect(() => {
    fetchCounsellors();
  }, []);

  const fetchCounsellors = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (filter.isVerified !== '') params.isVerified = filter.isVerified === 'true';
      if (filter.active !== '') params.active = filter.active === 'true';
      if (filter.search) params.search = filter.search;
      
      const response = await adminAPI.getCounsellors(params);
      setCounsellors(response.data.data);
    } catch (error) {
      console.error('Error fetching counsellors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchCounsellors();
  };

  const handleVerifyCounsellor = async (id, isVerified) => {
    try {
      await adminAPI.verifyCounsellor(id, isVerified);
      // Update the counsellor in the list
      setCounsellors(counsellors.map(counsellor => 
        counsellor._id === id ? { ...counsellor, isVerified } : counsellor
      ));
    } catch (error) {
      console.error('Error updating counsellor verification:', error);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Counsellor Management</h2>
      
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Form onSubmit={handleFilterSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Verification Status</Form.Label>
                  <Form.Select 
                    name="isVerified" 
                    value={filter.isVerified} 
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="true">Verified</option>
                    <option value="false">Pending Verification</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select 
                    name="active" 
                    value={filter.active} 
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="text"
                    name="search"
                    value={filter.search}
                    onChange={handleFilterChange}
                    placeholder="Search by name or specialization"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-grid">
              <Button type="submit" variant="primary">
                Apply Filters
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      
      <Card className="shadow-sm">
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading counsellors...</p>
            </div>
          ) : counsellors.length > 0 ? (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specializations</th>
                  <th>Experience</th>
                  <th>Verification</th>
                  <th>Status</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {counsellors.map((counsellor) => (
                  <tr key={counsellor._id}>
                    <td>{counsellor.user?.name || counsellor.name}</td>
                    <td>{counsellor.specializations?.join(', ') || 'N/A'}</td>
                    <td>{counsellor.experience} years</td>
                    <td>
                      <Badge bg={counsellor.isVerified ? 'success' : 'warning'}>
                        {counsellor.isVerified ? 'Verified' : 'Pending'}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={counsellor.active ? 'success' : 'danger'}>
                        {counsellor.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td>
                      {counsellor.ratings?.average ? (
                        <span>
                          <i className="bi bi-star-fill text-warning me-1"></i>
                          {counsellor.ratings.average} ({counsellor.ratings.count})
                        </span>
                      ) : (
                        'No ratings'
                      )}
                    </td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-1"
                        href={`/admin/counsellors/${counsellor._id}`}
                      >
                        <i className="bi bi-eye"></i>
                      </Button>
                      {!counsellor.isVerified ? (
                        <Button 
                          variant="outline-success" 
                          size="sm"
                          onClick={() => handleVerifyCounsellor(counsellor._id, true)}
                        >
                          <i className="bi bi-check-lg"></i> Verify
                        </Button>
                      ) : (
                        <Button 
                          variant="outline-warning" 
                          size="sm"
                          onClick={() => handleVerifyCounsellor(counsellor._id, false)}
                        >
                          <i className="bi bi-x-lg"></i> Unverify
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center py-5">
              <p className="mb-0">No counsellors found</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Counsellors;