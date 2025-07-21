import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const Counsellors = () => {
  const [loading, setLoading] = useState(true);
  const [counsellors, setCounsellors] = useState([]);
  const [filteredCounsellors, setFilteredCounsellors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    gender: 'all',
    expertise: 'all',
    priceRange: 'all',
    availability: 'all'
  });

  // Mock data for demonstration
  const mockCounsellors = [
    {
      id: 101,
      name: 'Dr. Sarah Johnson',
      photo: 'https://placehold.co/300x300?text=SJ',
      gender: 'female',
      specialization: 'Clinical Psychologist',
      expertise: ['Depression', 'Anxiety', 'PTSD'],
      experience: 8,
      languages: ['English', 'Hindi'],
      rating: 4.8,
      reviewCount: 124,
      fee: 1500,
      nextAvailable: '2023-06-15',
      about: 'Dr. Sarah is a licensed clinical psychologist with 8 years of experience helping individuals overcome depression, anxiety, and trauma.'
    },
    {
      id: 102,
      name: 'Dr. Michael Chen',
      photo: 'https://placehold.co/300x300?text=MC',
      gender: 'male',
      specialization: 'Psychiatrist',
      expertise: ['Bipolar Disorder', 'Schizophrenia', 'Medication Management'],
      experience: 12,
      languages: ['English', 'Mandarin'],
      rating: 4.9,
      reviewCount: 98,
      fee: 1800,
      nextAvailable: '2023-06-14',
      about: 'Dr. Chen specializes in medication management for severe mental health conditions with a compassionate approach to treatment.'
    },
    {
      id: 103,
      name: 'Dr. Emily Rodriguez',
      photo: 'https://placehold.co/300x300?text=ER',
      gender: 'female',
      specialization: 'Therapist',
      expertise: ['Relationship Issues', 'Self-Esteem', 'Career Counselling'],
      experience: 5,
      languages: ['English', 'Spanish'],
      rating: 4.7,
      reviewCount: 87,
      fee: 1200,
      nextAvailable: '2023-06-13',
      about: 'Emily helps clients navigate relationship challenges and build self-confidence through evidence-based therapeutic approaches.'
    },
    {
      id: 104,
      name: 'Dr. Rajesh Kumar',
      photo: 'https://placehold.co/300x300?text=RK',
      gender: 'male',
      specialization: 'Clinical Psychologist',
      expertise: ['Stress Management', 'Anxiety', 'Depression'],
      experience: 10,
      languages: ['English', 'Hindi', 'Punjabi'],
      rating: 4.6,
      reviewCount: 112,
      fee: 1400,
      nextAvailable: '2023-06-16',
      about: 'Dr. Kumar combines traditional and modern therapeutic techniques to help clients manage stress and improve mental wellbeing.'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCounsellors(mockCounsellors);
      setFilteredCounsellors(mockCounsellors);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    applyFilters(e.target.value, filters);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    applyFilters(searchQuery, newFilters);
  };

  // Apply all filters
  const applyFilters = (query, currentFilters) => {
    let results = [...counsellors];
    
    // Apply search query
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(counsellor => 
        counsellor.name.toLowerCase().includes(searchTerm) ||
        counsellor.specialization.toLowerCase().includes(searchTerm) ||
        counsellor.expertise.some(exp => exp.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply gender filter
    if (currentFilters.gender !== 'all') {
      results = results.filter(counsellor => counsellor.gender === currentFilters.gender);
    }
    
    // Apply expertise filter
    if (currentFilters.expertise !== 'all') {
      results = results.filter(counsellor => 
        counsellor.expertise.some(exp => exp.toLowerCase() === currentFilters.expertise.toLowerCase())
      );
    }
    
    // Apply price range filter
    if (currentFilters.priceRange !== 'all') {
      switch (currentFilters.priceRange) {
        case 'under1000':
          results = results.filter(counsellor => counsellor.fee < 1000);
          break;
        case '1000to1500':
          results = results.filter(counsellor => counsellor.fee >= 1000 && counsellor.fee <= 1500);
          break;
        case 'over1500':
          results = results.filter(counsellor => counsellor.fee > 1500);
          break;
        default:
          break;
      }
    }
    
    setFilteredCounsellors(results);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="counsellors-page">
      <div className="counsellors-header">
        <h1>Find Your Perfect Match</h1>
        <p className="text-muted">Browse our network of qualified mental health professionals</p>
      </div>

      <div className="search-filter-section">
        <div className="search-bar">
          <i className="bi bi-search search-icon"></i>
          <input 
            type="text" 
            placeholder="Search by name, specialization, or expertise..." 
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        <div className="filters-container">
          <div className="filter-group">
            <label>Gender</label>
            <select 
              value={filters.gender} 
              onChange={(e) => handleFilterChange('gender', e.target.value)}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Expertise</label>
            <select 
              value={filters.expertise} 
              onChange={(e) => handleFilterChange('expertise', e.target.value)}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="Depression">Depression</option>
              <option value="Anxiety">Anxiety</option>
              <option value="PTSD">PTSD</option>
              <option value="Relationship Issues">Relationship Issues</option>
              <option value="Stress Management">Stress Management</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Price Range</label>
            <select 
              value={filters.priceRange} 
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="under1000">Under ₹1000</option>
              <option value="1000to1500">₹1000 - ₹1500</option>
              <option value="over1500">Over ₹1500</option>
            </select>
          </div>
        </div>
      </div>

      <div className="counsellors-results">
        <p className="results-count">{filteredCounsellors.length} professionals found</p>
        
        <div className="counsellors-grid">
          {filteredCounsellors.length > 0 ? (
            filteredCounsellors.map(counsellor => (
              <div key={counsellor.id} className="counsellor-profile-card">
                <div className="counsellor-profile-header">
                  <img 
                    src={counsellor.photo} 
                    alt={counsellor.name} 
                    className="counsellor-profile-photo"
                  />
                  <div className="counsellor-badges">
                    <span className="badge experience-badge">
                      {counsellor.experience}+ Years
                    </span>
                    <span className="badge rating-badge">
                      <i className="bi bi-star-fill me-1"></i>
                      {counsellor.rating}
                    </span>
                  </div>
                </div>
                
                <div className="counsellor-profile-body">
                  <h3 className="counsellor-name">{counsellor.name}</h3>
                  <p className="counsellor-specialization">{counsellor.specialization}</p>
                  
                  <div className="counsellor-languages">
                    {counsellor.languages.map((lang, index) => (
                      <span key={index} className="language-tag">{lang}</span>
                    ))}
                  </div>
                  
                  <div className="counsellor-expertise">
                    {counsellor.expertise.slice(0, 3).map((exp, index) => (
                      <span key={index} className="expertise-tag">{exp}</span>
                    ))}
                  </div>
                  
                  <p className="counsellor-about">{counsellor.about.substring(0, 100)}...</p>
                  
                  <div className="counsellor-fee-section">
                    <div className="counsellor-fee">
                      <span className="fee-amount">₹{counsellor.fee}</span>
                      <span className="fee-label">per session</span>
                    </div>
                    <div className="counsellor-availability">
                      <i className="bi bi-calendar-check me-1"></i>
                      Next available: {new Date(counsellor.nextAvailable).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="counsellor-profile-footer">
                  <Link 
                    to={`/client/counsellors/${counsellor.id}`} 
                    className="btn btn-outline-primary"
                  >
                    View Profile
                  </Link>
                  <Link 
                    to={`/client/book-appointment/${counsellor.id}`} 
                    className="btn btn-primary"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <i className="bi bi-search"></i>
              <h3>No counsellors found</h3>
              <p>Try adjusting your filters or search query</p>
              <button 
                className="btn btn-primary mt-3"
                onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    gender: 'all',
                    expertise: 'all',
                    priceRange: 'all',
                    availability: 'all'
                  });
                  setFilteredCounsellors(counsellors);
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Counsellors;