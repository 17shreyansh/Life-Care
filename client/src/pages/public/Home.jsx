import { Link } from 'react-router-dom';
import ConditionsSection from '../../components/home/ConditionsSection';
import HeroImage from '../../assets/woman-psychologist.jpg';
import doc1 from '../../assets/doc1.png';
import doc2 from '../../assets/doc2.jpg';
import doc3 from '../../assets/doc3.png';
import { useState } from 'react';

const Home = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingStep, setBookingStep] = useState(1); // 1: Select date/time, 2: Check availability, 3: Confirm
  const [isAvailable, setIsAvailable] = useState(false);
  
  const counsellors = [
    {
      id: 1,
      name: 'Dr. Monish Khera',
      title: 'Counselling Psychologist',
      description: 'Specializes in anxiety disorders and depression with over 10 years of experience.'
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      title: 'Clinical Psychologist',
      description: 'Expert in mood disorders and cognitive behavioral therapy with 15 years of practice.'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      title: 'Psychiatrist',
      description: 'Specializes in relationship counseling and stress management techniques.'
    }
  ];
  
  const handleBookSession = (counsellorId) => {
    const counsellor = counsellors.find(c => c.id === counsellorId);
    setSelectedCounsellor(counsellor);
    setBookingStep(1);
    setBookingDate('');
    setBookingTime('');
    setIsAvailable(false);
    setShowBookingModal(true);
  };
  
  const handleCloseModal = () => {
    setShowBookingModal(false);
  };
  
  const handleCheckAvailability = () => {
    // In a real app, this would make an API call to check availability
    // For demo purposes, we'll simulate a check with a timeout
    setBookingStep(2);
    setTimeout(() => {
      setIsAvailable(true);
      setBookingStep(3);
    }, 1000);
  };
  
  const handleConfirmBooking = () => {
    // In a real app, this would make an API call to confirm the booking
    alert(`Booking confirmed with ${selectedCounsellor.name} on ${bookingDate} at ${bookingTime}`);
    setShowBookingModal(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Trust <span className="text-gradient">S S Psychologist Life Care</span> with your mental health </h1>
              <p className="lead mb-4">Our mission is simple: to help you feel better, get better and stay better.</p>
              <p className="lead mb-4">We bring together self-care, support from qualified therapists and psychiatrists, as well as community access to deliver the best quality mental healthcare for your needs.</p>
              <div className="d-grid gap-3 d-md-flex justify-content-md-start mb-4">
                <Link to="/register" className="btn btn-primary btn-lg px-4">Get Started</Link>
                <Link to="/about" className="btn btn-success btn-lg px-4">Learn More</Link>
              </div>
              <div className="hero-features d-flex flex-wrap gap-4 mt-4">
                <div className="feature-item d-flex align-items-center">
                  <div className="feature-icon me-2">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <span>Verified Professionals</span>
                </div>
                <div className="feature-item d-flex align-items-center">
                  <div className="feature-icon me-2">
                    <i className="bi bi-camera-video"></i>
                  </div>
                  <span>Secure Video Sessions</span>
                </div>
                <div className="feature-item d-flex align-items-center">
                  <div className="feature-icon me-2">
                    <i className="bi bi-calendar-check"></i>
                  </div>
                  <span>Flexible Scheduling</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="hero-image-container">
                <img src={HeroImage} alt="Mental Health Support" className="img-fluid hero-image" />
                <div className="hero-shape-1"></div>
                <div className="hero-shape-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why S S Psychologist Life Care Section */}
      <section className="py-5 why-section">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-primary fw-bold mb-2">WHY CHOOSE US</h6>
            <h2 className="mb-4">Why <span className="text-gradient">S S Psychologist Life Care</span></h2>
            <div className="mx-auto" style={{ maxWidth: '700px' }}>
              <p className="text-muted">We're committed to providing comprehensive mental health support with a focus on quality, accessibility, and personalized care.</p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card why-card h-100">
                <div className="card-body text-center p-4">
                  <div className="why-icon-wrapper mb-4">
                    <i className="bi bi-grid-3x3-gap feature-icon-lg"></i>
                  </div>
                  <h5 className="card-title mb-3">Integrated Care</h5>
                  <p className="card-text text-muted">From self-care & therapy, to peer support & medication management, we can help with it all.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card why-card h-100">
                <div className="card-body text-center p-4">
                  <div className="why-icon-wrapper mb-4">
                    <i className="bi bi-graph-up feature-icon-lg"></i>
                  </div>
                  <h5 className="card-title mb-3">Grounded in Science</h5>
                  <p className="card-text text-muted">Our care options are based on scientifically proven treatments & clinically validated approaches.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card why-card h-100">
                <div className="card-body text-center p-4">
                  <div className="why-icon-wrapper mb-4">
                    <i className="bi bi-person-check feature-icon-lg"></i>
                  </div>
                  <h5 className="card-title mb-3">Personalised Support</h5>
                  <p className="card-text text-muted">Our treatment plans are tailored to your unique needs, so you can get the right care at the right time.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card why-card h-100">
                <div className="card-body text-center p-4">
                  <div className="why-icon-wrapper mb-4">
                    <i className="bi bi-clock-history feature-icon-lg"></i>
                  </div>
                  <h5 className="card-title mb-3">Round the Clock Support</h5>
                  <p className="card-text text-muted">Our treatment options can be accessed from wherever you might be, all 7 days a week.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* What are you struggling with Section */}
      <ConditionsSection />
      
      {/* Features Section */}
      <section className="py-5 features-section">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-primary fw-bold mb-2">OUR SERVICES</h6>
            <h2 className="mb-4">How We Can <span className="text-gradient">Help You</span></h2>
            <div className="mx-auto" style={{ maxWidth: '700px' }}>
              <p className="text-muted">Our platform offers comprehensive mental health support through various services designed to meet your unique needs.</p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card feature-card h-100">
                <div className="card-body text-center p-4">
                  <div className="feature-icon-wrapper mb-4">
                    <i className="bi bi-camera-video feature-icon-lg"></i>
                  </div>
                  <h5 className="card-title mb-3">Secure Video Sessions</h5>
                  <p className="card-text text-muted">Connect with therapists through encrypted video calls for completely confidential and secure therapy sessions.</p>
                  <Link to="/about" className="feature-link mt-3">Learn More <i className="bi bi-arrow-right ms-1"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card feature-card h-100">
                <div className="card-body text-center p-4">
                  <div className="feature-icon-wrapper mb-4">
                    <i className="bi bi-calendar-check feature-icon-lg"></i>
                  </div>
                  <h5 className="card-title mb-3">Flexible Scheduling</h5>
                  <p className="card-text text-muted">Book appointments at your convenience with our intuitive and easy-to-use scheduling system.</p>
                  <Link to="/about" className="feature-link mt-3">Learn More <i className="bi bi-arrow-right ms-1"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card feature-card h-100">
                <div className="card-body text-center p-4">
                  <div className="feature-icon-wrapper mb-4">
                    <i className="bi bi-shield-check feature-icon-lg"></i>
                  </div>
                  <h5 className="card-title mb-3">Verified Professionals</h5>
                  <p className="card-text text-muted">All our counsellors are certified and thoroughly verified for your peace of mind and quality care.</p>
                  <Link to="/about" className="feature-link mt-3">Learn More <i className="bi bi-arrow-right ms-1"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Counsellors */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-primary fw-bold mb-2">OUR EXPERTS</h6>
            <h2 className="mb-4">Featured Counsellors</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Our team consists of qualified and experienced mental health professionals dedicated to providing the best care.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="card team-card card-gradient-blue border-0 shadow-sm">
                <div className="team-image-wrapper">
                  <img 
                    // src="https://placehold.co/400x400?text=Dr.+Monish" 
                    src={doc1}
                    alt="Dr. Monish Khera" 
                    className="card-img-top"
                    style={{ 
                      objectPosition: 'top center' /* Adjust as needed */
                    }}
                  />
                </div>
                <div className="card-body text-center p-4">
                  <h5 className="card-title mb-1">Dr. Monish Khera</h5>
                  <p className="text-primary mb-3">Counselling Psychologist</p>
                  <p className="card-text text-muted mb-3">Specializes in anxiety disorders and depression with over 10 years of experience.</p>
                  <div className="team-social mb-3">
                    <a href="#" className="team-social-icon"><i className="bi bi-linkedin"></i></a>
                    <a href="#" className="team-social-icon"><i className="bi bi-twitter"></i></a>
                    <a href="#" className="team-social-icon"><i className="bi bi-envelope"></i></a>
                  </div>
                  <button className="btn btn-primary w-100" onClick={() => handleBookSession(1)}>Book Session</button>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card team-card card-gradient-green border-0 shadow-sm">
                <div className="team-image-wrapper">
                  <img 
                    // src="https://placehold.co/400x400?text=Dr.+Sarah" 
                    src={doc2}
                    alt="Dr. Sarah Johnson" 
                    className="card-img-top"
                    style={{ 
                      objectPosition: 'top center' /* Adjust as needed */
                    }}
                  />
                </div>
                <div className="card-body text-center p-4">
                  <h5 className="card-title mb-1">Dr. Sarah Johnson</h5>
                  <p className="text-primary mb-3">Clinical Psychologist</p>
                  <p className="card-text text-muted mb-3">Expert in mood disorders and cognitive behavioral therapy with 15 years of practice.</p>
                  <div className="team-social mb-3">
                    <a href="#" className="team-social-icon"><i className="bi bi-linkedin"></i></a>
                    <a href="#" className="team-social-icon"><i className="bi bi-twitter"></i></a>
                    <a href="#" className="team-social-icon"><i className="bi bi-envelope"></i></a>
                  </div>
                  <button className="btn btn-primary w-100" onClick={() => handleBookSession(2)}>Book Session</button>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card team-card card-gradient-purple border-0 shadow-sm">
                <div className="team-image-wrapper">
                  <img 
                    // src="https://placehold.co/400x400?text=Dr.+Emily" 
                    src={doc3}
                    alt="Dr. Emily Rodriguez" 
                    className="card-img-top"
                    style={{ 
                      objectPosition: 'top center' /* Adjust as needed */
                    }}
                  />
                </div>
                <div className="card-body text-center p-4">
                  <h5 className="card-title mb-1">Dr. Emily Rodriguez</h5>
                  <p className="text-primary mb-3">Psychiatrist</p>
                  <p className="card-text text-muted mb-3">Specializes in relationship counseling and stress management techniques.</p>
                  <div className="team-social mb-3">
                    <a href="#" className="team-social-icon"><i className="bi bi-linkedin"></i></a>
                    <a href="#" className="team-social-icon"><i className="bi bi-twitter"></i></a>
                    <a href="#" className="team-social-icon"><i className="bi bi-envelope"></i></a>
                  </div>
                  <button className="btn btn-primary w-100" onClick={() => handleBookSession(3)}>Book Session</button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/client/counsellors" className="btn btn-primary">
              <i className="bi bi-people me-2"></i>View All Counsellors
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 testimonials-section">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-primary fw-bold mb-2">TESTIMONIALS</h6>
            <h2 className="mb-4">What Our <span className="text-gradient">Clients Say</span></h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Don't just take our word for it. Here's what people who have used our platform have to say about their experience.
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="card testimonial-card card-gradient-blue h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between mb-4">
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <i className="bi bi-quote fs-1 text-primary opacity-25"></i>
                  </div>
                  <p className="mb-4">"The platform made it so easy to find the right therapist for me. The video sessions are convenient and secure. I've made significant progress with my anxiety issues."</p>
                  <div className="d-flex align-items-center">
                    <img src="https://placehold.co/50x50?text=SJ" className="rounded-circle me-3" alt="Client" />
                    <div>
                      <h6 className="mb-0">Sarah Johnson</h6>
                      <small className="text-muted">Client since 2022</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card testimonial-card card-gradient-green h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between mb-4">
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                    </div>
                    <i className="bi bi-quote fs-1 text-primary opacity-25"></i>
                  </div>
                  <p className="mb-4">"I was hesitant about online therapy, but it's been a game-changer for me. The counsellors are professional and genuinely care about your progress. Highly recommend!"</p>
                  <div className="d-flex align-items-center">
                    <img src="https://placehold.co/50x50?text=MT" className="rounded-circle me-3" alt="Client" />
                    <div>
                      <h6 className="mb-0">Michael Thomas</h6>
                      <small className="text-muted">Client since 2021</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card testimonial-card card-gradient-purple h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between mb-4">
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <i className="bi bi-quote fs-1 text-primary opacity-25"></i>
                  </div>
                  <p className="mb-4">"The flexibility of scheduling sessions around my busy work life has been incredible. My counsellor is amazing and I've seen real improvement in my mental health."</p>
                  <div className="d-flex align-items-center">
                    <img src="https://placehold.co/50x50?text=AP" className="rounded-circle me-3" alt="Client" />
                    <div>
                      <h6 className="mb-0">Anita Patel</h6>
                      <small className="text-muted">Client since 2023</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <a href="#" className="btn btn-outline-primary">
              <i className="bi bi-chat-quote me-2"></i>Read More Testimonials
            </a>
          </div>
        </div>
      </section>

      {/* Not sure what kind of care you need? Section */}
      <section className="py-5 care-options-section bg-light rounded-4">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-primary fw-bold mb-2">FIND YOUR PATH</h6>
            <h2 className="mb-4">Not Sure What Kind of <span className="text-gradient">Care You Need?</span></h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
              We offer different types of mental health support to meet your specific needs. Explore your options below.
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card care-option-card card-gradient-blue h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="care-icon-wrapper mb-4">
                    <i className="bi bi-person-video3 fs-1"></i>
                  </div>
                  <h4 className="card-title mb-3">One-on-One Therapy</h4>
                  <p className="card-text text-muted mb-4">Individual sessions with a licensed therapist tailored to your specific needs and concerns.</p>
                  <div className="d-grid">
                    <Link to="/client/counsellors" className="btn btn-outline-primary">
                      <i className="bi bi-calendar-plus me-2"></i>Book a Session
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card care-option-card card-gradient-green h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="care-icon-wrapper mb-4">
                    <i className="bi bi-people-fill fs-1"></i>
                  </div>
                  <h4 className="card-title mb-3">Couples Counseling</h4>
                  <p className="card-text text-muted mb-4">Work through relationship challenges with your partner under the guidance of a relationship expert.</p>
                  <div className="d-grid">
                    <Link to="/client/counsellors" className="btn btn-outline-primary">
                      <i className="bi bi-calendar-plus me-2"></i>Find a Counselor
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card care-option-card card-gradient-purple h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="care-icon-wrapper mb-4">
                    <i className="bi bi-journal-text fs-1"></i>
                  </div>
                  <h4 className="card-title mb-3">Self-Help Resources</h4>
                  <p className="card-text text-muted mb-4">Access our library of articles, videos, and tools to support your mental health journey at your own pace.</p>
                  <div className="d-grid">
                    <Link to="/blog" className="btn btn-outline-primary">
                      <i className="bi bi-book me-2"></i>Explore Resources
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-5">
            <Link to="/contact" className="btn btn-primary btn-lg">
              <i className="bi bi-question-circle me-2"></i>Still Not Sure? Contact Us for Guidance
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-5 cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="row align-items-center">
              <div className="col-lg-8 mb-4 mb-lg-0">
                <h2 className="mb-3">Ready to Take the First Step?</h2>
                <p className="lead mb-0">Join thousands who have improved their mental well-being with our platform.</p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <Link to="/register" className="btn btn-light btn-lg px-4 py-3">Get Started Today</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h4>Book a Session with {selectedCounsellor?.name}</h4>
              <button className="close-btn" onClick={handleCloseModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            
            <div className="modal-body p-4">
              {bookingStep === 1 && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Select Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Select Time</label>
                    <select 
                      className="form-control"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      required
                    >
                      <option value="">Choose a time slot</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                    </select>
                  </div>
                  
                  <button 
                    className="btn btn-primary w-100" 
                    onClick={handleCheckAvailability}
                    disabled={!bookingDate || !bookingTime}
                  >
                    Check Availability
                  </button>
                </>
              )}
              
              {bookingStep === 2 && (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Checking availability...</p>
                </div>
              )}
              
              {bookingStep === 3 && (
                <>
                  {isAvailable ? (
                    <div className="text-center py-3">
                      <i className="bi bi-check-circle text-success" style={{ fontSize: '3rem' }}></i>
                      <h5 className="mt-3">Time Slot Available!</h5>
                      <p className="mb-4">The selected time slot is available for booking.</p>
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-outline-secondary" onClick={() => setBookingStep(1)}>
                          Change Time
                        </button>
                        <button className="btn btn-success" onClick={handleConfirmBooking}>
                          Confirm Booking
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-3">
                      <i className="bi bi-x-circle text-danger" style={{ fontSize: '3rem' }}></i>
                      <h5 className="mt-3">Time Slot Unavailable</h5>
                      <p className="mb-4">Please select a different time or date.</p>
                      <button className="btn btn-primary" onClick={() => setBookingStep(1)}>
                        Try Another Time
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;