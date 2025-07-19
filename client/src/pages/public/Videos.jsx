import { useState, useEffect } from 'react';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Mock video data
  const mockVideos = [
    {
      id: 1,
      title: 'Understanding Anxiety Disorders',
      description: 'Learn about the different types of anxiety disorders and their symptoms.',
      thumbnail: 'https://placehold.co/600x400?text=Anxiety+Video',
      category: 'educational',
      duration: '12:45',
      views: 1245
    },
    {
      id: 2,
      title: '5-Minute Mindfulness Meditation',
      description: 'A quick guided meditation to help you center yourself during a busy day.',
      thumbnail: 'https://placehold.co/600x400?text=Meditation+Video',
      category: 'exercises',
      duration: '5:20',
      views: 3567
    },
    {
      id: 3,
      title: 'Signs of Depression: When to Seek Help',
      description: 'Important warning signs that indicate you should consult a mental health professional.',
      thumbnail: 'https://placehold.co/600x400?text=Depression+Video',
      category: 'educational',
      duration: '15:30',
      views: 2189
    },
    {
      id: 4,
      title: 'Progressive Muscle Relaxation Technique',
      description: 'Learn this effective technique to reduce physical tension and stress.',
      thumbnail: 'https://placehold.co/600x400?text=Relaxation+Video',
      category: 'exercises',
      duration: '8:15',
      views: 1876
    },
    {
      id: 5,
      title: 'Cognitive Behavioral Therapy Explained',
      description: 'An overview of CBT and how it helps in managing various mental health conditions.',
      thumbnail: 'https://placehold.co/600x400?text=CBT+Video',
      category: 'educational',
      duration: '18:50',
      views: 2345
    },
    {
      id: 6,
      title: 'Deep Breathing Exercises for Stress Relief',
      description: 'Simple breathing techniques you can practice anywhere to reduce anxiety.',
      thumbnail: 'https://placehold.co/600x400?text=Breathing+Video',
      category: 'exercises',
      duration: '7:30',
      views: 4231
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVideos(mockVideos);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter videos by category
  const filteredVideos = filter === 'all' 
    ? videos 
    : videos.filter(video => video.category === filter);

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4">Educational Videos</h1>
          <p className="lead text-muted">Learn about mental health topics and practice helpful exercises</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <button 
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('all')}
            >
              All Videos
            </button>
            <button 
              className={`btn ${filter === 'educational' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('educational')}
            >
              Educational
            </button>
            <button 
              className={`btn ${filter === 'exercises' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('exercises')}
            >
              Exercises & Techniques
            </button>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="row g-4">
        {loading ? (
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredVideos.length > 0 ? (
          filteredVideos.map(video => (
            <div className="col-md-6 col-lg-4" key={video.id}>
              <div className="card h-100">
                <div className="position-relative">
                  <img 
                    src={video.thumbnail} 
                    className="card-img-top" 
                    alt={video.title}
                  />
                  <div className="position-absolute bottom-0 end-0 bg-dark text-white px-2 py-1 m-2 rounded">
                    {video.duration}
                  </div>
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
                    <button className="btn btn-light rounded-circle" style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-play-fill fs-2"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{video.title}</h5>
                  <p className="card-text">{video.description}</p>
                </div>
                <div className="card-footer bg-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-secondary">{video.category}</span>
                    <small className="text-muted">{video.views.toLocaleString()} views</small>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p>No videos found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;