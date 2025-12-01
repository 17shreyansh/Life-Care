# Token Refresh Testing Guide

## Overview
This guide explains how to test the token refresh fixes to ensure they work correctly in your environment.

## Test Script

### Prerequisites
```bash
# Ensure server is running
cd server
npm run dev

# Ensure test user exists
# Email: client@example.com
# Password: password123
```

### Running the Test Script

#### Basic Usage
```bash
# From the Life-Care directory
node test-token-refresh.js
```

#### With Custom API URL
```bash
# For production testing
API_URL=https://your-api.com/api node test-token-refresh.js

# For different local port
API_URL=http://localhost:3000/api node test-token-refresh.js
```

### Expected Output
```
🧪 Starting Token Refresh Tests

==================================================
Base URL: http://localhost:5000/api
Test User: client@example.com
==================================================

📝 Test 1: Login
✅ Login Test: Successfully logged in and received tokens

📝 Test 2: Token Refresh
✅ Token Refresh Test: Token refresh successful

📝 Test 3: Protected Route Access
✅ Protected Route Test: Successfully accessed protected route

📝 Test 4: Invalid Token Handling
✅ Invalid Token Test: Invalid token correctly rejected

📝 Test 5: Infinite Loop Detection
🔄 Testing for infinite loops (10 seconds)...
✅ Infinite Loop Test: Only 45 requests in 10000ms (no loop detected)

📝 Test 6: Rate Limiting
🔄 Testing rate limiting (this may take a minute)...
✅ Rate Limiting Test: Rate limit hit at attempt 20 (expected ~20)

==================================================
📊 Test Summary
==================================================
Total Tests: 6
✅ Passed: 6
❌ Failed: 0
Success Rate: 100.0%
==================================================
```

## Manual Testing

### Test 1: Basic Token Refresh

#### Steps
1. Open the application in browser
2. Open DevTools (F12) → Network tab
3. Login with credentials
4. Clear the Network tab
5. Wait 5 minutes
6. Click around the application
7. Check Network tab

#### Expected Result
- Should see minimal API calls
- No infinite refresh loops
- Token refreshes automatically when needed

#### Red Flags
- 🚨 Multiple `/auth/refresh-token` calls per second
- 🚨 Hundreds of API calls
- 🚨 Browser tab freezing

### Test 2: Token Expiration

#### Steps
1. Login to the application
2. Open DevTools → Application → Cookies
3. Delete the `token` cookie (keep `refreshToken`)
4. Make an API call (navigate to a page)
5. Check Network tab

#### Expected Result
- Application automatically refreshes token
- User stays logged in
- No errors in console

#### Red Flags
- 🚨 User gets logged out
- 🚨 Multiple refresh attempts
- 🚨 Errors in console

### Test 3: Rate Limiting

#### Steps
1. Open browser console
2. Run this code:
```javascript
// Attempt 25 token refreshes
for (let i = 0; i < 25; i++) {
  fetch('/api/auth/refresh-token', {
    method: 'POST',
    credentials: 'include'
  })
  .then(r => console.log(`Attempt ${i+1}:`, r.status))
  .catch(e => console.error(`Attempt ${i+1}:`, e));
}
```

#### Expected Result
- First ~20 attempts succeed (200)
- Remaining attempts fail with 429 (Too Many Requests)
- Rate limit message displayed

#### Red Flags
- 🚨 All 25 attempts succeed
- 🚨 No rate limiting
- 🚨 Server crashes

### Test 4: Multiple Tabs

#### Steps
1. Login in Tab 1
2. Open Tab 2 with same application
3. Open Tab 3 with same application
4. In Tab 1, delete the `token` cookie
5. Navigate in Tab 1
6. Check all tabs

#### Expected Result
- Tab 1 refreshes token automatically
- Tabs 2 and 3 continue working
- No infinite loops
- All tabs stay in sync

#### Red Flags
- 🚨 Multiple tabs trigger multiple refreshes
- 🚨 Tabs get out of sync
- 🚨 Performance degradation

### Test 5: Network Interruption

#### Steps
1. Login to application
2. Open DevTools → Network tab
3. Set throttling to "Offline"
4. Try to navigate
5. Set throttling back to "Online"
6. Try to navigate again

#### Expected Result
- Shows appropriate error when offline
- Recovers gracefully when online
- Token refresh works after reconnection

#### Red Flags
- 🚨 Application crashes
- 🚨 Infinite retry loops
- 🚨 User gets logged out

### Test 6: Session Expiration

#### Steps
1. Login to application
2. Wait 24+ hours (or manually expire tokens)
3. Try to use the application

#### Expected Result
- User is redirected to login
- No errors in console
- Clean logout

#### Red Flags
- 🚨 Application crashes
- 🚨 Infinite refresh loops
- 🚨 Errors in console

## Performance Testing

### Browser Performance

#### Steps
1. Open DevTools → Performance tab
2. Start recording
3. Login and use application for 5 minutes
4. Stop recording
5. Analyze results

#### Expected Metrics
- CPU usage: < 20% average
- Memory: Stable (no leaks)
- Network: < 10 requests per minute
- FPS: 60 (smooth)

#### Red Flags
- 🚨 CPU usage > 50%
- 🚨 Memory continuously growing
- 🚨 Network: 100+ requests per minute
- 🚨 FPS drops

### Server Performance

#### Steps
```bash
# Monitor server during testing
# Terminal 1: Watch logs
tail -f logs/app.log

# Terminal 2: Monitor CPU/Memory
watch -n 1 'ps aux | grep node'

# Terminal 3: Monitor requests
watch -n 1 'netstat -an | grep :5000 | wc -l'
```

#### Expected Metrics
- CPU: < 30%
- Memory: Stable
- Active connections: < 100
- Response time: < 200ms

#### Red Flags
- 🚨 CPU > 80%
- 🚨 Memory growing
- 🚨 Connections > 1000
- 🚨 Response time > 2s

## Load Testing

### Using Apache Bench

```bash
# Test login endpoint
ab -n 100 -c 10 -p login.json -T application/json \
  http://localhost:5000/api/auth/login

# Test refresh endpoint (with cookies)
ab -n 100 -c 10 -C "refreshToken=YOUR_TOKEN" \
  http://localhost:5000/api/auth/refresh-token
```

### Using Artillery

```bash
# Install Artillery
npm install -g artillery

# Create test config
cat > artillery-test.yml << 'EOF'
config:
  target: 'http://localhost:5000'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "Token Refresh Test"
    flow:
      - post:
          url: "/api/auth/login"
          json:
            email: "client@example.com"
            password: "password123"
          capture:
            - json: "$.user.id"
              as: "userId"
      - post:
          url: "/api/auth/refresh-token"
      - get:
          url: "/api/auth/me"
EOF

# Run test
artillery run artillery-test.yml
```

### Expected Results
- Success rate: > 95%
- Response time p95: < 500ms
- No errors
- No rate limit hits (under normal load)

## Troubleshooting

### Issue: Tests Fail to Connect

#### Solution
```bash
# Check if server is running
curl http://localhost:5000/api
# Should return: "S S Psychologist Life Care API is running"

# Check if MongoDB is running
mongo --eval "db.adminCommand('ping')"

# Check server logs
tail -f logs/app.log
```

### Issue: Login Test Fails

#### Solution
```bash
# Verify test user exists
mongo your_database
db.users.findOne({ email: "client@example.com" })

# If not exists, run seed script
cd server
node seed.js
```

### Issue: Rate Limit Test Fails

#### Solution
```bash
# Check rate limit configuration in server.js
# Should be: max: 20, windowMs: 15 * 60 * 1000

# Wait 15 minutes for rate limit to reset
# Or restart server to reset immediately
```

### Issue: Infinite Loop Detected

#### Solution
```bash
# Check api.js for request queue implementation
# Verify isRefreshing flag is working
# Check for circular dependencies

# Enable debug logging
# In api.js, add console.log statements
```

## Continuous Integration

### GitHub Actions Example

```yaml
# .github/workflows/test-token-refresh.yml
name: Token Refresh Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:4.4
        ports:
          - 27017:27017
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      
      - name: Install dependencies
        run: |
          cd server && npm install
          cd ../client && npm install
      
      - name: Start server
        run: |
          cd server
          npm run dev &
          sleep 10
      
      - name: Run tests
        run: node test-token-refresh.js
      
      - name: Upload results
        if: always()
        uses: actions/upload-artifact@v2
        with:
          name: test-results
          path: test-results.json
```

## Best Practices

### Before Deployment
1. ✅ Run all tests locally
2. ✅ Test in staging environment
3. ✅ Perform load testing
4. ✅ Review logs for errors
5. ✅ Test with real users (beta)

### After Deployment
1. ✅ Monitor error rates
2. ✅ Check performance metrics
3. ✅ Review user feedback
4. ✅ Run smoke tests
5. ✅ Keep monitoring for 24 hours

### Regular Testing
1. ✅ Run tests before each release
2. ✅ Include in CI/CD pipeline
3. ✅ Test after dependency updates
4. ✅ Quarterly load testing
5. ✅ Annual security audit

## Support

### Getting Help
1. Check this documentation
2. Review `TOKEN_REFRESH_FIX.md`
3. Check server logs
4. Review browser console
5. Contact development team

### Reporting Issues
Include:
- Test results
- Server logs
- Browser console logs
- Steps to reproduce
- Expected vs actual behavior

---

**Last Updated**: 2024
**Maintained By**: Development Team
**Status**: ✅ Active
