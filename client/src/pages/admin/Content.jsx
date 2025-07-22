import { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, Form, Row, Col, Tab, Nav } from 'react-bootstrap';
import { adminAPI } from '../../services/api';

const Content = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
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
      case 'published': return 'success';
      case 'archived': return 'danger';
      default: return 'info';
    }
  };

  return (
    <div>
      <h2 className="mb-4">Content Management</h2>
      
      <Tab.Container defaultActiveKey="blogs">
        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-white">
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="blogs">Blogs</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="videos">Videos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="gallery">Gallery</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Tab.Content>
              <Tab.Pane eventKey="blogs">
                <Form onSubmit={handleFilterSubmit}>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select 
                          name="status" 
                          value={filter.status} 
                          onChange={handleFilterChange}
                        >
                          <option value="">All</option>
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Featured</Form.Label>
                        <Form.Select 
                          name="isFeatured" 
                          value={filter.isFeatured} 
                          onChange={handleFilterChange}
                        >
                          <option value="">All</option>
                          <option value="true">Featured</option>
                          <option value="false">Not Featured</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Search</Form.Label>
                        <Form.Control
                          type="text"
                          name="search"
                          value={filter.search}
                          onChange={handleFilterChange}
                          placeholder="Search by title or content"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-grid">
                    <Button type="submit" variant="primary">
                      Apply Filters
                    </Button>
                  </div>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="videos">
                <div className="text-center py-5">
                  <p>Video management coming soon</p>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="gallery">
                <div className="text-center py-5">
                  <p>Gallery management coming soon</p>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Card.Body>
        </Card>
        
        <Tab.Content>
          <Tab.Pane eventKey="blogs">
            <Card className="shadow-sm">
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
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              className="me-1"
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                            >
                              <i className="bi bi-eye"></i>
                            </Button>
                            {blog.status === 'draft' && (
                              <Button 
                                variant="outline-success" 
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
                                variant="outline-info" 
                                size="sm"
                                onClick={() => handleUpdateBlogStatus(blog._id, 'published')}
                              >
                                Restore
                              </Button>
                            )}
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
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default Content;