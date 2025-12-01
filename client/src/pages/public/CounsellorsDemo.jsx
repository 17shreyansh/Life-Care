import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CounsellorCard from '../../components/counsellor/CounsellorCard';
import { useAuth } from '../../contexts/AuthContext';

const CounsellorsDemo = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCounsellors();
  }, []);

  const fetchCounsellors = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/cms/counsellors`);
      const data = await res.json();
      if (data.success) {
        const formattedData = data.data.map(c => ({
          id: c._id,
          name: c.user?.name || 'Counsellor',
          photo: c.user?.avatar || 'https://placehold.co/300x300?text=Avatar',
          specialization: c.specializations?.[0] || 'Mental Health Professional',
          verified: c.isVerified || false,
          clientsHelped: Math.floor(Math.random() * 100) + 50,
          experience: c.experience || '5',
          rating: c.ratings?.average || 4.5
        }));
        setCounsellors(formattedData);
      }
    } catch (error) {
      console.error('Error fetching counsellors:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleBookClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/consilar' } });
      return;
    }
    navigate('/client/counsellors');
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Our Counsellors</h1>
      <div className="row g-4">
        {counsellors.length > 0 ? (
          counsellors.map(counsellor => (
            <div key={counsellor.id} className="col-md-6 col-lg-4">
              <CounsellorCard counsellor={counsellor} onBookClick={handleBookClick} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No counsellors available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounsellorsDemo;