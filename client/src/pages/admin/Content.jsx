import { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, Form, Row, Col, Tab, Nav } from 'react-bootstrap';
import { adminAPI } from '../../services/api';
import '../client/Dashboard.css';
import './AdminStyles.css';

const Content = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('blogs');
  const [filter, setFilter] = useState({
    status: '',
    isFeatured: '',
    search: ''
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (filter.status) params.status = filter.status;
      if (filter.isFeatured) params.isFeatured = filter.isFeatured === 'true';
      if (filter.search) params.search = filter.search;
      
      const response = await adminAPI.getBlogs(params);
      setBlogs(response.data.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchBlogs();
  };

  const handleUpdateBlogStatus = async (id, status) => {
    try {
      await adminAPI.updateBlog(id, { status });
      
      // Update blog in the list
      setBlogs(blogs.map(blog => 
        blog._id === id ? { ...blog, status } : blog
      ));
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
  };

  const handleToggleFeatured = async (id, isFeatured) => {
    try {
      await adminAPI.updateBlog(id, { isFeatured });
      
      // Update blog in the list
      setBlogs(blogs.map(blog => 
        blog._id === id ? { ...blog, isFeatured } : blog
      ));
    } catch (error) {
      console.error('Error updating featured status:', error);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString();
  };

  // Get badge color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'draft': return 'secondary';
      case 'published': return 'primary';
      case 'archived': return 'danger';
      default: return 'info';
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <div className="stat-icon me-3">
          <i className="bi bi-file-earmark-text"></i>
        </div>
        <h2 className="text-gradient mb-0">Content Management</h2>
      </div>
      
      <div>
        <Card className="dashboard-card mb-4">
          <Card.Header className="pb-0 border-bottom-0">
            <div className="content-tabs-wrapper">
              <div className={`content-tabs ${activeTab === 'videos' ? 'videos-active' : activeTab === 'gallery' ? 'gallery-active' : ''}`}>
                <button 
                  className={`content-tab ${activeTab === 'blogs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('blogs')}
                >
                  <i className="bi bi-journal-text"></i>Blogs
                </button>
                <button 
                  className={`content-tab ${activeTab === 'videos' ? 'active' : ''}`}
                  onClick={() => setActiveTab('videos')}
                >
                  <i className="bi bi-camera-video"></i>Videos
                </button>
                <button 
                  className={`content-tab ${activeTab === 'gallery' ? 'active' : ''}`}
                  onClick={() => setActiveTab('gallery')}
                >
                  <i className="bi bi-images"></i>Gallery
                </button>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            {activeTab === 'blogs' && (
                <Form onSubmit={handleFilterSubmit}>
                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small">Status</Form.Label>
                        <Form.Select 
                          name="status" 
                          value={filter.status} 
                          onChange={handleFilterChange}
                          size="sm"
                        >
                          <option value="">All</option>
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small">Featured</Form.Label>
                        <Form.Select 
                          name="isFeatured" 
                          value={filter.isFeatured} 
                          onChange={handleFilterChange}
                          size="sm"
                        >
                          <option value="">All</option>
                          <option value="true">Featured</option>
                          <option value="false">Not Featured</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small">Search</Form.Label>
                        <Form.Control
                          type="text"
                          name="search"
                          value={filter.search}
                          onChange={handleFilterChange}
                          placeholder="Search by title or content"
                          size="sm"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small">&nbsp;</Form.Label>
                        <Button type="submit" variant="primary" size="sm" className="w-100">
                          <i className="bi bi-funnel-fill me-1"></i>Apply
                        </Button>
                      </Form.Group>
                    </Col>
                  </Row>

                </Form>
            )}
            {activeTab === 'videos' && (
              <div className="text-center py-5">
                <p>Video management coming soon</p>
              </div>
            )}
            {activeTab === 'gallery' && (
              <div className="text-center py-5">
                <p>Gallery management coming soon</p>
              </div>
            )}
          </Card.Body>
        </Card>
        
        {activeTab === 'blogs' && (
            <Card className="dashboard-card">
              <Card.Header>
                <div className="d-flex align-items-center">
                  <div className="card-icon">
                    <i className="bi bi-journal-text"></i>
                  </div>
                  <h5 className="mb-0">Blog Posts</h5>
                </div>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading blogs...</p>
                  </div>
                ) : blogs.length > 0 ? (
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Categories</th>
                        <th>Status</th>
                        <th>Featured</th>
                        <th>Published</th>
                        <th>Views</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((blog) => (
                        <tr key={blog._id}>
                          <td>{blog.title}</td>
                          <td>{blog.author?.name || 'Unknown'}</td>
                          <td>{blog.categories?.join(', ')}</td>
                          <td>
                            <Badge bg={getStatusBadge(blog.status)}>
                              {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                            </Badge>
                          </td>
                          <td>
                            <Form.Check
                              type="switch"
                              checked={blog.isFeatured}
                              onChange={() => handleToggleFeatured(blog._id, !blog.isFeatured)}
                            />
                          </td>
                          <td>{formatDate(blog.publishedAt)}</td>
                          <td>{blog.viewCount}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button 
                                variant="outline-primary" 
                                size="sm" 
                                href={`/blog/${blog.slug}`}
                                target="_blank"
                              >
                                <i className="bi bi-eye"></i>
                              </Button>
                              {blog.status === 'draft' && (
                                <Button 
                                  variant="outline-primary" 
                                  size="sm"
                                  onClick={() => handleUpdateBlogStatus(blog._id, 'published')}
                                >
                                  Publish
                                </Button>
                              )}
                              {blog.status === 'published' && (
                                <Button 
                                  variant="outline-secondary" 
                                  size="sm"
                                  onClick={() => handleUpdateBlogStatus(blog._id, 'archived')}
                                >
                                  Archive
                                </Button>
                              )}
                              {blog.status === 'archived' && (
                                <Button 
                                  variant="outline-primary" 
                                  size="sm"
                                  onClick={() => handleUpdateBlogStatus(blog._id, 'published')}
                                >
                                  Restore
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <div className="text-center py-5">
                    <p className="mb-0">No blogs found</p>
                  </div>
                )}
              </Card.Body>
            </Card>
        )}
      </div>
    </div>
  );
};

export default Content;