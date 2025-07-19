import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold">Your Mental Health Matters</h1>
              <p className="lead">Connect with qualified mental health professionals from the comfort of your home.</p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link to="/register" className="btn btn-light btn-lg px-4 me-md-2">Get Started</Link>
                <Link to="/about" className="btn btn-outline-light btn-lg px-4">Learn More</Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img src="https://placehold.co/600x400?text=Mental+Health+Support" alt="Mental Health Support" className="img-fluid rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">How We Can Help</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-camera-video fs-1 text-primary"></i>
                  </div>
                  <h5 className="card-title">Secure Video Sessions</h5>
                  <p className="card-text">Connect with therapists through encrypted video calls for confidential sessions.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-calendar-check fs-1 text-primary"></i>
                  </div>
                  <h5 className="card-title">Flexible Scheduling</h5>
                  <p className="card-text">Book appointments at your convenience with our easy-to-use scheduling system.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-shield-check fs-1 text-primary"></i>
                  </div>
                  <h5 className="card-title">Verified Professionals</h5>
                  <p className="card-text">All our counsellors are certified and verified for your peace of mind.</p>
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
                    <h5 className="card-title">Dr. Counsellor Name</h5>
                    <p className="card-text">Specialization in Anxiety, Depression</p>
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
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">What Our Clients Say</h2>
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="card">
                      <div className="card-body text-center">
                        <p className="lead">"The platform made it so easy to find the right therapist for me. The video sessions are convenient and secure."</p>
                        <div className="d-flex justify-content-center">
                          <div className="text-warning">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </div>
                        </div>
                        <p className="mt-2 mb-0">- Sarah J.</p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="card">
                      <div className="card-body text-center">
                        <p className="lead">"I was hesitant about online therapy, but it's been a game-changer for me. Highly recommend this service!"</p>
                        <div className="d-flex justify-content-center">
                          <div className="text-warning">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star"></i>
                          </div>
                        </div>
                        <p className="mt-2 mb-0">- Michael T.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h2>Ready to Take the First Step?</h2>
          <p className="lead">Join thousands who have improved their mental well-being with our platform.</p>
          <Link to="/register" className="btn btn-light btn-lg mt-3">Get Started Today</Link>
        </div>
      </section>
    </>
  );
};

export default Home;