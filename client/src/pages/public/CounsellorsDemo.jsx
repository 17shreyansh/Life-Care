import React from 'react';
import CounsellorCard from '../../components/counsellor/CounsellorCard';

const CounsellorsDemo = () => {
  // Sample counsellor data
  const counsellors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3',
      specialization: 'Clinical Psychologist',
      verified: true,
      clientsHelped: 120,
      experience: '8',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      specialization: 'Psychiatrist',
      verified: true,
      clientsHelped: 98,
      experience: '12',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      specialization: 'Therapist',
      verified: false,
      clientsHelped: 75,
      experience: '5',
      rating: 4.7
    }
  ];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Our Counsellors</h1>
      <div className="row g-4">
        {counsellors.map(counsellor => (
          <div key={counsellor.id} className="col-md-6 col-lg-4">
            <CounsellorCard counsellor={counsellor} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounsellorsDemo;