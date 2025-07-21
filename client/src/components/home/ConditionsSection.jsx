import { Link } from 'react-router-dom';

const ConditionsSection = () => {
  const conditions = [
    {
      id: 1,
      icon: 'bi-cloud-rain',
      title: 'Depression',
      description: 'Do you feel like your sadness just won\'t go away, and it is hard to find a way ahead? We can help.',
      link: '/conditions/depression'
    },
    {
      id: 2,
      icon: 'bi-exclamation-diamond',
      title: 'Generalised Anxiety Disorder (GAD)',
      description: 'Do you often feel restless, worried or on-edge? Let us help you on how to cope better.',
      link: '/conditions/anxiety'
    },
    {
      id: 3,
      icon: 'bi-arrow-repeat',
      title: 'Obsessive Compulsive Disorder (OCD)',
      description: 'Are unwanted thoughts making you anxious and engage in unhelpful behaviours? You can find ways to cope.',
      link: '/conditions/ocd'
    },
    {
      id: 4,
      icon: 'bi-arrow-down-up',
      title: 'Bipolar Disorder',
      description: 'Do you struggle with periods of intense happiness, followed by intense sadness? You can find the care you need with us.',
      link: '/conditions/bipolar'
    },
    {
      id: 5,
      icon: 'bi-lightning',
      title: 'Adult ADHD',
      description: 'Have you always struggled with difficulty focussing, being restless, or impulsivity? There are ways to manage it better.',
      link: '/conditions/adhd'
    },
    {
      id: 6,
      icon: 'bi-people',
      title: 'Social Anxiety',
      description: 'Do social settings make you anxious and fearful? We can help you cope with social situations better.',
      link: '/conditions/social-anxiety'
    }
  ];

  return (
    <section className="conditions-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="mb-3">What are you struggling with?</h2>
          <p className="lead text-muted">S S Psychologist Life Care is here to support you with all your mental health needs.</p>
        </div>

        <div className="row g-4">
          {conditions.map(condition => (
            <div className="col-md-6 col-lg-4" key={condition.id}>
              <div className="card condition-card h-100">
                <div className="card-body p-4">
                  <div className="condition-icon-wrapper mb-3">
                    <i className={`bi ${condition.icon}`}></i>
                  </div>
                  <h5 className="card-title mb-3">{condition.title}</h5>
                  <p className="card-text text-muted">{condition.description}</p>
                  <Link to={condition.link} className="btn btn-link condition-link p-0">
                    LEARN MORE <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="connect-section mt-5">
          <div className="card connect-card">
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-lg-8 mb-3 mb-lg-0">
                  <h3 className="mb-2">Not sure what kind of care you need?</h3>
                  <p className="mb-0 lead">Talk to one of S S Psychologist Life Care's mental health coaches to understand how we can help.</p>
                </div>
                <div className="col-lg-4 text-lg-end">
                  <Link to="/contact" className="btn btn-primary btn-lg">CONNECT WITH US</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConditionsSection;