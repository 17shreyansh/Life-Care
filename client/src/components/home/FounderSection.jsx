import './FounderSection.css';
import founderImage from '../../assets/founder/founder.jpg';
import achievement1 from '../../assets/founder/1.jpg';
import achievement2 from '../../assets/founder/2.jpg';
import achievement3 from '../../assets/founder/3.jpg';
import achievement4 from '../../assets/founder/4.jpg';

const FounderSection = () => {
  const achievements = [
    { id: 1, icon: 'bi-award', title: 'MA (Clinical Psychology)', image: achievement1 },
    { id: 2, icon: 'bi-mortarboard', title: 'PG Diploma in Rehabilitation Psychology', image: achievement2 },
    { id: 3, icon: 'bi-patch-check', title: 'Diploma in Intellectual Disability', image: achievement3 },
    { id: 4, icon: 'bi-shield-check', title: 'RCI Registered Psychologist', image: achievement4 },
  ];

  return (
    <section className="founder-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h6 className="section-subtitle">LEADERSHIP</h6>
          <h2 className="section-title">Meet Our <span className="text-gradient">Founder</span></h2>
        </div>
        
        <div className="founder-content">
          <div className="founder-profile">
            <div className="founder-image-wrapper">
              <img 
                src={founderImage} 
                alt="Monish Khera" 
                className="founder-image"
              />
              <div className="founder-badge">
                <i className="bi bi-award-fill"></i>
              </div>
            </div>
            <div className="founder-info">
              <h3 className="founder-name">Monish Khera</h3>
              <p className="founder-title">Founder & Clinical Psychologist</p>
              <p className="founder-experience">20 Years of Counselling Experience</p>
            </div>
          </div>

          <div className="achievements-section">
            <h6 className="achievements-label">Achievements</h6>
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <div key={achievement.id} className={`achievement-card card-${index + 1}`}>
                  <img src={achievement.image} alt="Achievement" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
