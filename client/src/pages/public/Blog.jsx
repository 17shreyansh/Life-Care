import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock blog data
  const mockBlogs = [
    {
      id: 1,
      title: 'Understanding Anxiety in the Modern World',
      excerpt: 'Learn about the common triggers of anxiety and effective coping mechanisms.',
      image: 'https://placehold.co/600x400?text=Anxiety',
      category: 'Anxiety',
      author: 'Dr. Sarah Johnson',
      date: '2023-05-15',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'The Power of Mindfulness Meditation',
      excerpt: 'Discover how mindfulness practices can improve your mental well-being.',
      image: 'https://placehold.co/600x400?text=Mindfulness',
      category: 'Wellness',
      author: 'Dr. Michael Chen',
      date: '2023-05-10',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Building Resilience Through Difficult Times',
      excerpt: 'Strategies to develop emotional resilience when facing life challenges.',
      image: 'https://placehold.co/600x400?text=Resilience',
      category: 'Self-Help',
      author: 'Dr. Emily Rodriguez',
      date: '2023-05-05',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Navigating Relationships During Stress',
      excerpt: 'How to maintain healthy relationships during periods of high stress.',
      image: 'https://placehold.co/600x400?text=Relationships',
      category: 'Relationships',
      author: 'Dr. James Wilson',
      date: '2023-04-28',
      readTime: '8 min read'
    },
    {
      id: 5,
      title: 'Sleep and Mental Health: The Crucial Connection',
      excerpt: 'Understanding how sleep quality affects your mental well-being.',
      image: 'https://placehold.co/600x400?text=Sleep',
      category: 'Wellness',
      author: 'Dr. Lisa Thompson',
      date: '2023-04-20',
      readTime: '5 min read'
    },
    {
      id: 6,
      title: 'Recognizing Signs of Depression',
      excerpt: 'Learn to identify the early warning signs of depression.',
      image: 'https://placehold.co/600x400?text=Depression',
      category: 'Depression',
      author: 'Dr. Robert Kim',
      date: '2023-04-15',
      readTime: '6 min read'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBlogs(mockBlogs);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(mockBlogs.map(blog => blog.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    }, 1000);
  }, []);

  // Filter blogs by category
  const filteredBlogs = selectedCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4">Mental Health Blog</h1>
          <p className="lead text-muted">Insights, tips, and resources for your mental well-being journey</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <button 
              className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button 
                key={category} 
                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="row g-4">
        {loading ? (
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredBlogs.length > 0 ? (
          filteredBlogs.map(blog => (
            <div className="col-md-6 col-lg-4" key={blog.id}>
              <div className="card h-100">
                <img src={blog.image} className="card-img-top" alt={blog.title} />
                <div className="card-body">
                  <span className="badge bg-primary mb-2">{blog.category}</span>
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.excerpt}</p>
                </div>
                <div className="card-footer bg-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">By {blog.author} • {blog.date}</small>
                    <small className="text-muted">{blog.readTime}</small>
                  </div>
                  <Link to={`/blog/${blog.id}`} className="btn btn-outline-primary w-100 mt-2">Read More</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p>No blog posts found in this category.</p>
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <div className="row mt-5">
        <div className="col-lg-8 mx-auto">
          <div className="card bg-light">
            <div className="card-body p-4 text-center">
              <h3>Subscribe to Our Newsletter</h3>
              <p>Get the latest mental health insights delivered to your inbox.</p>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Your email address" />
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
              <small className="text-muted">We respect your privacy. Unsubscribe at any time.</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;