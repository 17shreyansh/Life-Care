import { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert, Tab, Nav } from 'react-bootstrap';
import { counsellorAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const [basicInfo, setBasicInfo] = useState({
    bio: '',
    specializations: [],
    experience: '',
    languages: []
  });
  
  const [fees, setFees] = useState({
    video: '',
    chat: '',
    inPerson: ''
  });
  
  const [qualifications, setQualifications] = useState([
    { degree: '', institution: '', year: '' }
  ]);
  
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: ''
  });
  
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await counsellorAPI.getProfile();
      const profileData = response.data.data;
      setProfile(profileData);
      
      // Set form data
      setBasicInfo({
        bio: profileData.bio || '',
        specializations: profileData.specializations || [],
        experience: profileData.experience || '',
        languages: profileData.languages || []
      });
      
      setFees({
        video: profileData.fees?.video || '',
        chat: profileData.fees?.chat || '',
        inPerson: profileData.fees?.inPerson || ''
      });
      
      setQualifications(
        profileData.qualifications?.length > 0 
          ? profileData.qualifications 
          : [{ degree: '', institution: '', year: '' }]
      );
      
      setBankDetails({
        accountName: profileData.bankDetails?.accountName || '',
        accountNumber: profileData.bankDetails?.accountNumber || '',
        bankName: profileData.bankDetails?.bankName || '',
        ifscCode: profileData.bankDetails?.ifscCode || ''
      });
      
      setDocuments(profileData.verificationDocuments || []);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo({
      ...basicInfo,
      [name]: value
    });
  };

  const handleSpecializationsChange = (e) => {
    const value = e.target.value;
    setBasicInfo({
      ...basicInfo,
      specializations: value.split(',').map(item => item.trim())
    });
  };

  const handleLanguagesChange = (e) => {
    const value = e.target.value;
    setBasicInfo({
      ...basicInfo,
      languages: value.split(',').map(item => item.trim())
    });
  };

  const handleFeesChange = (e) => {
    const { name, value } = e.target;
    setFees({
      ...fees,
      [name]: value
    });
  };

  const handleQualificationChange = (index, field, value) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications[index][field] = value;
    setQualifications(updatedQualifications);
  };

  const addQualification = () => {
    setQualifications([...qualifications, { degree: '', institution: '', year: '' }]);
  };

  const removeQualification = (index) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications.splice(index, 1);
    setQualifications(updatedQualifications);
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails({
      ...bankDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setSaving(true);

    try {
      // Combine all profile data
      const profileData = {
        bio: basicInfo.bio,
        specializations: basicInfo.specializations,
        experience: parseInt(basicInfo.experience) || 0,
        languages: basicInfo.languages,
        fees: {
          video: parseInt(fees.video) || 0,
          chat: parseInt(fees.chat) || 0,
          inPerson: parseInt(fees.inPerson) || 0
        },
        qualifications: qualifications.filter(q => q.degree && q.institution && q.year),
        bankDetails
      };

      await counsellorAPI.updateProfile(profileData);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDocumentSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setSaving(true);

    try {
      // In a real implementation, this would handle file uploads
      // For now, we'll just simulate document URLs
      const documentUrls = [
        'https://example.com/document1.pdf',
        'https://example.com/document2.pdf'
      ];

      await counsellorAPI.uploadVerificationDocuments(documentUrls);
      setSuccess('Documents uploaded successfully!');
      setDocuments(documentUrls);
    } catch (error) {
      console.error('Error uploading documents:', error);
      setError('Failed to upload documents. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Counsellor Profile</h2>
      
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your profile...</p>
        </div>
      ) : (
        <Tab.Container defaultActiveKey="basic">
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="basic">Basic Information</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="qualifications">Qualifications</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fees">Fees</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="bank">Bank Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="verification">Verification</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              {success && <Alert variant="success">{success}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Tab.Content>
                <Tab.Pane eventKey="basic">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="bio"
                        value={basicInfo.bio}
                        onChange={handleBasicInfoChange}
                        placeholder="Write a brief description about yourself and your practice"
                        required
                      />
                      <Form.Text className="text-muted">
                        Maximum 500 characters
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Specializations</Form.Label>
                      <Form.Control
                        type="text"
                        name="specializations"
                        value={basicInfo.specializations.join(', ')}
                        onChange={handleSpecializationsChange}
                        placeholder="E.g. Anxiety, Depression, CBT (comma separated)"
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Years of Experience</Form.Label>
                      <Form.Control
                        type="number"
                        name="experience"
                        value={basicInfo.experience}
                        onChange={handleBasicInfoChange}
                        placeholder="Enter years of experience"
                        required
                        min="0"
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Languages</Form.Label>
                      <Form.Control
                        type="text"
                        name="languages"
                        value={basicInfo.languages.join(', ')}
                        onChange={handleLanguagesChange}
                        placeholder="E.g. English, Hindi (comma separated)"
                      />
                    </Form.Group>
                    
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button variant="primary" type="submit" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Basic Information'}
                      </Button>
                    </div>
                  </Form>
                </Tab.Pane>
                
                <Tab.Pane eventKey="qualifications">
                  <Form onSubmit={handleSubmit}>
                    {qualifications.map((qualification, index) => (
                      <Card key={index} className="mb-3">
                        <Card.Body>
                          <Row>
                            <Col md={5}>
                              <Form.Group className="mb-3">
                                <Form.Label>Degree/Certification</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={qualification.degree}
                                  onChange={(e) => handleQualificationChange(index, 'degree', e.target.value)}
                                  placeholder="E.g. Ph.D. in Psychology"
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group className="mb-3">
                                <Form.Label>Institution</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={qualification.institution}
                                  onChange={(e) => handleQualificationChange(index, 'institution', e.target.value)}
                                  placeholder="E.g. University of Delhi"
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col md={2}>
                              <Form.Group className="mb-3">
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                  type="number"
                                  value={qualification.year}
                                  onChange={(e) => handleQualificationChange(index, 'year', e.target.value)}
                                  placeholder="Year"
                                  required
                                  min="1950"
                                  max={new Date().getFullYear()}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={1} className="d-flex align-items-center">
                              {qualifications.length > 1 && (
                                <Button 
                                  variant="outline-danger" 
                                  size="sm"
                                  onClick={() => removeQualification(index)}
                                  className="mt-3"
                                >
                                  <i className="bi bi-trash"></i>
                                </Button>
                              )}
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                    
                    <div className="mb-3">
                      <Button variant="outline-secondary" onClick={addQualification}>
                        <i className="bi bi-plus-circle me-2"></i>Add Another Qualification
                      </Button>
                    </div>
                    
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button variant="primary" type="submit" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Qualifications'}
                      </Button>
                    </div>
                  </Form>
                </Tab.Pane>
                
                <Tab.Pane eventKey="fees">
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Video Session Fee (₹)</Form.Label>
                          <Form.Control
                            type="number"
                            name="video"
                            value={fees.video}
                            onChange={handleFeesChange}
                            placeholder="Enter fee amount"
                            required
                            min="0"
                          />
                          <Form.Text className="text-muted">
                            Per hour rate
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Chat Session Fee (₹)</Form.Label>
                          <Form.Control
                            type="number"
                            name="chat"
                            value={fees.chat}
                            onChange={handleFeesChange}
                            placeholder="Enter fee amount"
                            required
                            min="0"
                          />
                          <Form.Text className="text-muted">
                            Per hour rate
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>In-Person Session Fee (₹)</Form.Label>
                          <Form.Control
                            type="number"
                            name="inPerson"
                            value={fees.inPerson}
                            onChange={handleFeesChange}
                            placeholder="Enter fee amount (optional)"
                            min="0"
                          />
                          <Form.Text className="text-muted">
                            Per hour rate (if applicable)
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button variant="primary" type="submit" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Fees'}
                      </Button>
                    </div>
                  </Form>
                </Tab.Pane>
                
                <Tab.Pane eventKey="bank">
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Account Holder Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="accountName"
                            value={bankDetails.accountName}
                            onChange={handleBankDetailsChange}
                            placeholder="Enter account holder name"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Account Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="accountNumber"
                            value={bankDetails.accountNumber}
                            onChange={handleBankDetailsChange}
                            placeholder="Enter account number"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Bank Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="bankName"
                            value={bankDetails.bankName}
                            onChange={handleBankDetailsChange}
                            placeholder="Enter bank name"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>IFSC Code</Form.Label>
                          <Form.Control
                            type="text"
                            name="ifscCode"
                            value={bankDetails.ifscCode}
                            onChange={handleBankDetailsChange}
                            placeholder="Enter IFSC code"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button variant="primary" type="submit" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Bank Details'}
                      </Button>
                    </div>
                  </Form>
                </Tab.Pane>
                
                <Tab.Pane eventKey="verification">
                  <div className="mb-4">
                    <h5>Verification Status</h5>
                    {profile?.isVerified ? (
                      <Alert variant="success">
                        <i className="bi bi-check-circle me-2"></i>
                        Your profile is verified
                      </Alert>
                    ) : (
                      <Alert variant="warning">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        Your profile is pending verification. Please upload your documents.
                      </Alert>
                    )}
                  </div>
                  
                  <Form onSubmit={handleDocumentSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Upload Verification Documents</Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        disabled={profile?.isVerified}
                      />
                      <Form.Text className="text-muted">
                        Please upload your degree certificates, professional licenses, and ID proof.
                      </Form.Text>
                    </Form.Group>
                    
                    {documents.length > 0 && (
                      <div className="mb-3">
                        <h6>Uploaded Documents</h6>
                        <ul className="list-group">
                          {documents.map((doc, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                              <span>Document {index + 1}</span>
                              <a href={doc} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                                View
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={saving || profile?.isVerified}
                      >
                        {saving ? 'Uploading...' : 'Upload Documents'}
                      </Button>
                    </div>
                  </Form>
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      )}
    </div>
  );
};

export default Profile;