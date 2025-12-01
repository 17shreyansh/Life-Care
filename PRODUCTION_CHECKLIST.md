# Production Deployment Checklist - Token Refresh Fix

## Pre-Deployment

### Code Review
- [x] All changes reviewed and tested
- [x] No console.log statements in production code
- [x] Error handling implemented
- [x] Rate limiting configured
- [x] Security measures in place

### Testing Completed
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Performance testing done
- [ ] Security testing done
- [ ] Cross-browser testing done

### Environment Setup
- [ ] Production environment variables set
- [ ] Database backup completed
- [ ] SSL certificates valid
- [ ] CDN configured (if applicable)
- [ ] Monitoring tools ready

## Deployment Steps

### 1. Server Deployment

#### Stop Current Server
```bash
# If using PM2
pm2 stop all

# If using systemd
sudo systemctl stop your-app

# If using Docker
docker-compose down
```

#### Backup Current Version
```bash
# Backup code
cp -r /path/to/app /path/to/app.backup.$(date +%Y%m%d_%H%M%S)

# Backup database
mongodump --out=/path/to/backup/$(date +%Y%m%d_%H%M%S)
```

#### Deploy New Code
```bash
# Pull latest code
cd /path/to/app
git pull origin main

# Install dependencies
cd server
npm install --production

# Run database migrations (if any)
# npm run migrate
```

#### Environment Variables Check
```bash
# Verify all required variables are set
cat > check-env.sh << 'EOF'
#!/bin/bash
required_vars=(
  "JWT_SECRET"
  "JWT_REFRESH_SECRET"
  "MONGO_URI"
  "NODE_ENV"
  "CLIENT_URL"
  "PORT"
)

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌ Missing: $var"
  else
    echo "✅ Set: $var"
  fi
done
EOF

chmod +x check-env.sh
./check-env.sh
```

#### Start Server
```bash
# If using PM2
pm2 start ecosystem.config.js --env production
pm2 save

# If using systemd
sudo systemctl start your-app

# If using Docker
docker-compose up -d
```

### 2. Client Deployment

#### Build Production Bundle
```bash
cd client
npm install
npm run build
```

#### Deploy to Server
```bash
# If serving from Node.js
cp -r dist/* /path/to/server/public/

# If using Nginx
cp -r dist/* /var/www/html/

# If using CDN/S3
aws s3 sync dist/ s3://your-bucket/ --delete
```

#### Update Nginx Config (if applicable)
```nginx
# /etc/nginx/sites-available/your-app
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Client files
    root /var/www/html;
    index index.html;

    # API proxy
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
```

## Post-Deployment Verification

### 1. Health Checks

#### Server Health
```bash
# Check if server is running
curl http://localhost:5000/api
# Expected: "S S Psychologist Life Care API is running"

# Check process
pm2 status
# or
ps aux | grep node
```

#### Database Connection
```bash
# Check MongoDB connection
mongo --eval "db.adminCommand('ping')"
```

### 2. Functional Testing

#### Authentication Flow
- [ ] User can register
- [ ] User can login
- [ ] Token is set in cookies
- [ ] Protected routes work
- [ ] Token refresh works automatically
- [ ] User can logout

#### Token Refresh
- [ ] Open DevTools → Network tab
- [ ] Login to application
- [ ] Wait 5 minutes
- [ ] Verify no infinite refresh loops
- [ ] Make an API call
- [ ] Verify token refreshes if needed

#### Rate Limiting
- [ ] Try 25 refresh attempts quickly
- [ ] Verify rate limit kicks in after 20
- [ ] Wait 15 minutes
- [ ] Verify rate limit resets

### 3. Performance Checks

#### Client Performance
```bash
# Open browser DevTools
# 1. Network tab - verify minimal API calls
# 2. Performance tab - check CPU usage
# 3. Memory tab - check for leaks
# 4. Console - check for errors
```

#### Server Performance
```bash
# Check CPU usage
top -p $(pgrep -f "node")

# Check memory usage
free -h

# Check logs for errors
tail -f /var/log/your-app/error.log
pm2 logs
```

### 4. Security Checks

#### SSL/TLS
```bash
# Test SSL configuration
curl -I https://your-domain.com
# Should return 200 OK with HTTPS

# Check SSL grade
# Visit: https://www.ssllabs.com/ssltest/
```

#### Headers
```bash
# Check security headers
curl -I https://your-domain.com
# Should include:
# - Strict-Transport-Security
# - X-Content-Type-Options
# - X-Frame-Options
# - X-XSS-Protection
```

#### Cookies
```bash
# Check cookie settings in browser DevTools
# Should be:
# - httpOnly: true
# - secure: true (in production)
# - sameSite: strict
```

## Monitoring Setup

### 1. Application Monitoring

#### PM2 Monitoring (if using PM2)
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

#### Error Tracking
- [ ] Sentry/Rollbar configured
- [ ] Error alerts set up
- [ ] Slack/Email notifications enabled

### 2. Server Monitoring

#### System Metrics
```bash
# Install monitoring tools
sudo apt-get install htop iotop nethogs

# Set up monitoring dashboard
# - Grafana
# - Prometheus
# - New Relic
# - DataDog
```

#### Log Monitoring
```bash
# Set up log aggregation
# - ELK Stack (Elasticsearch, Logstash, Kibana)
# - Splunk
# - CloudWatch (AWS)
```

### 3. Alerts Configuration

#### Critical Alerts
- [ ] Server down
- [ ] High error rate (>5%)
- [ ] High response time (>2s)
- [ ] Rate limit exceeded frequently
- [ ] Database connection issues

#### Warning Alerts
- [ ] CPU usage >80%
- [ ] Memory usage >80%
- [ ] Disk space <20%
- [ ] Unusual traffic patterns

## Rollback Procedure

### If Issues Detected

#### Quick Rollback
```bash
# Stop current version
pm2 stop all

# Restore backup
rm -rf /path/to/app/server
cp -r /path/to/app.backup.YYYYMMDD_HHMMSS/server /path/to/app/

# Restore database (if needed)
mongorestore /path/to/backup/YYYYMMDD_HHMMSS

# Start backup version
cd /path/to/app/server
pm2 start ecosystem.config.js
```

#### Verify Rollback
- [ ] Server is running
- [ ] Users can login
- [ ] No errors in logs
- [ ] Performance is normal

## Communication

### User Notification

#### Before Deployment
```
Subject: Scheduled Maintenance - [Date] [Time]

We will be performing system maintenance on [Date] at [Time].
Expected downtime: 15-30 minutes
Services affected: Login, Authentication

We apologize for any inconvenience.
```

#### After Deployment
```
Subject: Maintenance Complete - System Updated

Our scheduled maintenance is complete.
All services are now operational.

New improvements:
- Enhanced security
- Improved performance
- Better reliability

Thank you for your patience.
```

#### If Issues Occur
```
Subject: Service Update - [Issue Description]

We are aware of [issue description].
Our team is working on a resolution.
ETA: [time]

We will keep you updated.
```

## Final Checklist

### Before Going Live
- [ ] All tests passed
- [ ] Backup completed
- [ ] Environment variables verified
- [ ] SSL certificates valid
- [ ] Monitoring configured
- [ ] Team notified
- [ ] Users notified (if downtime)

### After Going Live
- [ ] Health checks passed
- [ ] Functional tests passed
- [ ] Performance verified
- [ ] Security verified
- [ ] Monitoring active
- [ ] No errors in logs
- [ ] Users notified (success)

### 24 Hours After
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Review user feedback
- [ ] Verify no issues
- [ ] Document lessons learned

## Emergency Contacts

### Team
- **DevOps Lead**: [Name] - [Phone] - [Email]
- **Backend Lead**: [Name] - [Phone] - [Email]
- **Frontend Lead**: [Name] - [Phone] - [Email]
- **Database Admin**: [Name] - [Phone] - [Email]

### External
- **Hosting Provider**: [Support Number]
- **Domain Registrar**: [Support Number]
- **SSL Provider**: [Support Number]

## Documentation

### Update Documentation
- [ ] API documentation updated
- [ ] User guide updated
- [ ] Admin guide updated
- [ ] Changelog updated
- [ ] README updated

### Knowledge Base
- [ ] Deployment process documented
- [ ] Troubleshooting guide updated
- [ ] FAQ updated
- [ ] Known issues documented

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Verified By**: _______________
**Status**: ⬜ Pending / ⬜ In Progress / ⬜ Complete / ⬜ Rolled Back

**Notes**:
_____________________________________________
_____________________________________________
_____________________________________________
