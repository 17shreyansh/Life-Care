import { Link } from 'react-router-dom';
import ConditionsSection from '../../components/home/ConditionsSection';
import HeroImage from '../../assets/woman-psychologist.jpg'; // Adjust the path as necessary

const Home = () => {
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
                {/* <img src="https://placehold.co/600x400?text=Mental+Health+Support" alt="Mental Health Support" className="img-fluid hero-image" /> */}
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
          <h2 className="text-center mb-5">Featured Counsellors</h2>
          <div className="row g-4">
            {[1, 2, 3].map((item) => (
              <div className="col-md-4" key={item}>
                <div className="card h-100">
                  <img src={`https://placehold.co/300x200?text=Counsellor+${item}`} className="card-img-top" alt={`Counsellor ${item}`} />
                  <div className="card-body">
                    <h5 className="card-title">Dr. Monish Khera</h5>
                    <p className="card-text">Counselling Psychologist</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-warning">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-half"></i>
                        <span className="ms-1 text-dark">4.5</span>
                      </div>
                      <Link to="/client/counsellors" className="btn btn-sm btn-outline-primary">View Profile</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/client/counsellors" className="btn btn-primary">View All Counsellors</Link>
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
              <div className="card testimonial-card h-100 border-0 shadow-sm">
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
              <div className="card testimonial-card h-100 border-0 shadow-sm">
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
              <div className="card testimonial-card h-100 border-0 shadow-sm">
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
              <div className="card care-option-card h-100 border-0 shadow-sm">
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
              <div className="card care-option-card h-100 border-0 shadow-sm">
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
              <div className="card care-option-card h-100 border-0 shadow-sm">
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
    </>
  );
};

export default Home;