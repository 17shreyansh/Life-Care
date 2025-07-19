const About = () => {
  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4">About S S Psychologist Life Care</h1>
          <p className="lead text-muted">A modern, secure, and user-centric platform designed to bridge the gap between individuals seeking mental health support and qualified professionals.</p>
        </div>
      </div>
      
      <div className="row mb-5">
        <div className="col-md-6">
          <img src="https://placehold.co/600x400?text=Our+Mission" alt="Our Mission" className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h2>Our Mission</h2>
          <p>At S S Psychologist Life Care, we believe that mental health care should be accessible to everyone. Our mission is to break down barriers to mental health support by providing a secure, convenient platform that connects individuals with qualified mental health professionals.</p>
          <p>We strive to create a stigma-free environment where seeking help is normalized and celebrated as a step toward better well-being.</p>
        </div>
      </div>
      
      <div className="row mb-5">
        <div className="col-md-6 order-md-2">
          <img src="https://placehold.co/600x400?text=Our+Vision" alt="Our Vision" className="img-fluid rounded" />
        </div>
        <div className="col-md-6 order-md-1">
          <h2>Our Vision</h2>
          <p>We envision a world where mental health care is as routine and accessible as physical health care. Through our platform, we aim to:</p>
          <ul>
            <li>Make mental health support available to everyone, regardless of location</li>
            <li>Reduce the stigma associated with seeking mental health support</li>
            <li>Empower individuals to take control of their mental well-being</li>
            <li>Support mental health professionals in expanding their practice</li>
          </ul>
        </div>
      </div>
      
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto">
          <h2 className="text-center mb-4">Core Values</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-shield-lock fs-1 text-primary"></i>
                  </div>
                  <h5 className="card-title">Privacy & Security</h5>
                  <p className="card-text">We prioritize the confidentiality and security of all user data and interactions.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-people fs-1 text-primary"></i>
                  </div>
                  <h5 className="card-title">Inclusivity</h5>
                  <p className="card-text">We welcome individuals from all backgrounds and walks of life.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-award fs-1 text-primary"></i>
                  </div>
                  <h5 className="card-title">Quality Care</h5>
                  <p className="card-text">We ensure all professionals on our platform are qualified and verified.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h2 className="mb-4">Our Team</h2>
          <p className="lead">S S Psychologist Life Care is powered by a dedicated team of professionals who are passionate about mental health and technology.</p>
          <div className="row g-4 mt-4">
            {[1, 2, 3, 4].map((item) => (
              <div className="col-md-3" key={item}>
                <div className="card h-100">
                  <img src={`https://placehold.co/150x150?text=Team+Member+${item}`} className="card-img-top rounded-circle mx-auto mt-3" style={{ width: '150px', height: '150px' }} alt={`Team Member ${item}`} />
                  <div className="card-body text-center">
                    <h5 className="card-title">Team Member Name</h5>
                    <p className="card-text text-muted">Position</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;