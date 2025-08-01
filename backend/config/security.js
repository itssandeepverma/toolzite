// security.js
import rateLimit from 'express-rate-limit';
import path from 'path';

// Patterns and paths to block malicious requests
export const BAD_PATHS = [
  /\.php$/, /\.php\./i, /\.phtml$/i, /\.php3$/i, /\.php4$/i, /\.php5$/i, /\.php7$/i,
  /^\/wp-/, /^\/wordpress/, /^\/wp-content/, /^\/wp-includes/, /^\/wp-admin/, /xmlrpc\.php$/,
  /^\/admin/, /^\/administrator/, /^\/joomla/, /^\/drupal/, /^\/magento/, /^\/shop/, /^\/cart/, /^\/checkout/,
  /^\/feed/, /^\/rss/, /^\/atom/, /\.xml$/,
  /^\/shell/, /^\/cmd/, /^\/cgi-bin/, /^\/tmp/, /^\/temp/,
  /\.env$/, /\.ini$/, /\.conf$/, /\.config$/,
  /\.bak$/, /\.backup$/, /\.cache$/, /\.tmp$/,
  /union.*select/i, /select.*from/i, /insert.*into/i, /update.*set/i, /delete.*from/i, /drop.*table/i,
  /<script/i, /javascript:/i, /vbscript:/i, /onload=/i, /onerror=/i,
  /\.\./, /\/\.\.\//
];

// Centralized security configuration
export const SECURITY_CONFIG = {
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      error: 'Too many requests',
      message: 'Too many requests from this IP, please try again later.',
      retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    skipFailedRequests: false,
    keyGenerator: (req) => {
      return req.ip || req.connection.remoteAddress || 'unknown';
    },
    handler: (req, res) => {
      console.log(`🚨 Rate limit exceeded for IP: ${req.ip}`);
      res.status(429).json({
        error: 'Too many requests',
        message: 'Too many requests from this IP, please try again later.',
        retryAfter: '15 minutes',
        timestamp: new Date().toISOString()
      });
    }
  },
  strictRateLimit: {
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: {
      error: 'Suspicious activity detected',
      message: 'Too many requests to sensitive endpoints.',
      retryAfter: '5 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    skipFailedRequests: false,
    keyGenerator: (req) => {
      return req.ip || req.connection.remoteAddress || 'unknown';
    },
    handler: (req, res) => {
      console.log(`🚨 Strict rate limit exceeded for IP: ${req.ip} on path: ${req.path}`);
      res.status(429).json({
        error: 'Suspicious activity detected',
        message: 'Too many requests to sensitive endpoints.',
        retryAfter: '5 minutes',
        timestamp: new Date().toISOString()
      });
    }
  },

  blockedUserAgents: [
    /bot/i, /crawler/i, /spider/i, /scraper/i,
    /curl/i, /wget/i, /python/i, /java/i, /perl/i, /ruby/i,
    /scanner/i, /probe/i, /nmap/i, /nikto/i, /sqlmap/i,
    /burp/i, /zap/i, /acunetix/i, /nessus/i, /openvas/i
  ],

  // File extensions we allow through without blocking
  allowedExtensions: [
    '.html', '.htm', '.css', '.js', '.json',
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
    '.woff', '.woff2', '.ttf', '.eot'
  ],

  suspiciousPaths: [
    /\.php$/, /^\/admin/, /^\/wp-/, /^\/shell/,
    /^\/cmd/, /^\/tmp/, /^\/logs/, /\.env$/, /\.ini$/, /\.conf$/
  ]
};

// Middleware to block bots and malicious requests
export const botBlockingMiddleware = (req, res, next) => {
  // Allow static assets by extension
  const ext = path.extname(req.path).toLowerCase();
  if (SECURITY_CONFIG.allowedExtensions.includes(ext)) {
    return next();
  }

  // Block known bad paths
  if (BAD_PATHS.some(pattern => pattern.test(req.path))) {
    console.log(`🚨 Blocked malicious request: ${req.method} ${req.path} from ${req.ip}`);
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Access denied',
      timestamp: new Date().toISOString(),
      blockedPath: req.path
    });
  }

  // Block unwanted user agents
  const userAgent = req.get('User-Agent') || '';
  if (SECURITY_CONFIG.blockedUserAgents.some(pattern => pattern.test(userAgent))) {
    console.log(`🚨 Blocked bot user agent: ${userAgent} from ${req.ip}`);
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Bot access denied',
      timestamp: new Date().toISOString(),
      userAgent
    });
  }

  next();
};

// Middleware for detailed logging
export const securityLoggingMiddleware = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent') || 'Unknown',
      referer: req.get('Referer') || 'Direct'
    };

    if ([403, 404, 429].includes(res.statusCode)) {
      console.log('🚨 Suspicious Request:', JSON.stringify(log, null, 2));
    }
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
      console.log(`📊 Request: ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
};

// Middleware to apply stricter rate limiting on sensitive paths
export const strictRateLimitMiddleware = (req, res, next) => {
  if (SECURITY_CONFIG.suspiciousPaths.some(pattern => pattern.test(req.path))) {
    const limiter = rateLimit(SECURITY_CONFIG.strictRateLimit);
    return limiter(req, res, next);
  }
  next();
};
