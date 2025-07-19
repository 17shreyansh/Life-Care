const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
const PORT = 8080;

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Create proxy middleware
const apiProxy = createProxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy': '' // remove /proxy path
  },
  onProxyRes: (proxyRes, req, res) => {
    // Log proxy response
    console.log(`${new Date().toISOString()} - Proxy response: ${proxyRes.statusCode}`);
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error', message: err.message });
  }
});

// Use the proxy for all /proxy routes
app.use('/proxy', apiProxy);

// Root route
app.get('/', (req, res) => {
  res.send(`
    <h1>API Proxy Server</h1>
    <p>This server proxies requests to the API server at http://localhost:5000</p>
    <p>Use <code>/proxy/api/...</code> to access the API through this proxy</p>
    <p>Example: <a href="/proxy/api/counsellors">/proxy/api/counsellors</a></p>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});