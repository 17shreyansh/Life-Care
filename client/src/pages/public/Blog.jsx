import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Mock blog data
  const blogPosts = [
    {
      id: 1,
      title: 'Understanding Anxiety: Causes, Symptoms, and Treatment',
      excerpt: 'Anxiety disorders are the most common mental health concern in many countries. Learn about the causes, symptoms, and effective treatment options.',
      image: 'https://placehold.co/600x400?text=Anxiety',
      category: 'anxiety',
      author: 'Dr. Sarah Johnson',
      date: '2023-06-10',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'The Connection Between Physical Exercise and Mental Health',
      excerpt: 'Regular physical activity can have a profound positive impact on depression, anxiety, and more. Discover how exercise benefits your mental health.',
      image: 'https://placehold.co/600x400?text=Exercise',
      category: 'wellness',
      author: 'Dr. Michael Chen',
      date: '2023-06-05',
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'Mindfulness Meditation: A Beginner\'s Guide',
      excerpt: 'Mindfulness meditation is a mental training practice that teaches you to slow down racing thoughts, let go of negativity, and calm your mind and body.',
      image: 'https://placehold.co/600x400?text=Mindfulness',
      category: 'mindfulness',
      author: 'Dr. Emily Rodriguez',
      date: '2023-05-28',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Recognizing the Signs of Depression',
      excerpt: 'Depression is more than just feeling sad. Learn to recognize the signs and symptoms of depression and when to seek professional help.',
      image: 'https://placehold.co/600x400?text=Depression',
      category: 'depression',
      author: 'Dr. Sarah Johnson',
      date: '2023-05-20',
      readTime: '7 min read'
    },
    {
      id: 5,
      title: 'Building Resilience: How to Bounce Back from Adversity',
      excerpt: 'Resilience is the ability to adapt and bounce back when things don\'t go as planned. Learn strategies to build your resilience in challenging times.',
      image: 'https://placehold.co/600x400?text=Resilience',
      category: 'wellness',
      author: 'Dr. Michael Chen',
      date: '2023-05-15',
      readTime: '5 min read'
    },
    {
      id: 6,
      title: 'The Importance of Setting Boundaries in Relationships',
      excerpt: 'Healthy boundaries are essential for maintaining balanced relationships. Discover how to set and maintain boundaries for better mental health.',
      image: 'https://placehold.co/600x400?text=Boundaries',
      category: 'relationships',
      author: 'Dr. Emily Rodriguez',
      date: '2023-05-08',
      readTime: '6 min read'
    }
  ];

  // Filter posts by search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];

  return (
    <div className="blog-page py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="mb-3">Our <span className="text-gradient">Blog</span></h1>
          <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Explore our collection of articles on mental health topics, written by our expert counsellors to help you understand and manage your mental wellbeing.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="row mb-5">
          <div className="col-lg-8">
            <div className="card search-card mb-4">
              <div className="card-body p-2">
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-0">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="d-flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        {filteredPosts.length > 0 ? (
          <div className="row g-4">
            {filteredPosts.map(post => (
              <div className="col-md-6 col-lg-4" key={post.id}>
                <div className="card blog-card h-100 border-0 shadow-sm">
                  <div className="blog-image-wrapper">
                    <img src={post.image} alt={post.title} className="card-img-top" />
                    <div className="blog-category">{post.category}</div>
                  </div>
                  <div className="card-body p-4">
                    <div className="blog-meta mb-2">
                      <span><i className="bi bi-person me-1"></i> {post.author}</span>
                      <span><i className="bi bi-clock me-1"></i> {post.readTime}</span>
                    </div>
                    <h5 className="card-title mb-3">{post.title}</h5>
                    <p className="card-text text-muted">{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} className="blog-link">
                      Read More <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                  </div>
                  <div className="card-footer bg-white border-0 p-4 pt-0">
                    <small className="text-muted">
                      <i className="bi bi-calendar3 me-1"></i> {new Date(post.date).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <i className="bi bi-search fs-1 text-muted d-block mb-3"></i>
            <h3>No Results Found</h3>
            <p className="text-muted">We couldn't find any posts matching your search criteria.</p>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="newsletter-section rounded-4 p-5 mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card newsletter-card border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div className="newsletter-icon mb-4">
                    <i className="bi bi-envelope-paper"></i>
                  </div>
                  <h3 className="mb-3">Subscribe to Our Newsletter</h3>
                  <p className="text-muted mb-4">
                    Stay updated with our latest articles, tips, and resources on mental health and wellbeing.
                  </p>
                  <form className="row g-3 justify-content-center">
                    <div className="col-md-8">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Your email address"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <button type="submit" className="btn btn-primary btn-lg w-100">
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;