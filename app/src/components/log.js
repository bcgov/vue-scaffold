const config = require('config');
const { createLogger, format, transports } = require('winston');
const { logger } = require('express-winston');

const log = createLogger({
  exitOnError: false,
  format: format.combine(
    format.timestamp(), // Add ISO timestamp to each entry
    format.json(), // Force output to be in JSON format
  ),
  level: config.get('server.logLevel')
});

if (process.env.NODE_ENV !== 'test') {
  log.add(new transports.Console({
    handleExceptions: true
  }));
}

if (config.has('server.logFile')) {
  log.add(new transports.File({
    defaultMeta: { service: 'scaffold' },
    filename: config.get('server.logFile'),
    handleExceptions: true
  }));
}

const httpLogger = logger({
  colorize: false,
  dynamicMeta: (req, res) => ({
    contentLength: res.get('content-length'),
    httpVersion: req.httpVersion,
    ip: req.ip,
    method: req.method,
    path: req.path,
    query: Object.keys(req.query).length ? req.query : undefined,
    responseTime: res.responseTime,
    statusCode: res.statusCode,
    userAgent: req.get('user-agent')
  }),
  expressFormat: true,
  level: 'http',
  meta: true,
  metaField: null, // Set to null for all attributes to be at top level object
  requestWhitelist: [], // Suppress default value output
  responseWhitelist: [], // Suppress default value output
  // Skip logging kube-probe requests
  skip: (req) => req.headers['user-agent'] && req.headers['user-agent'].includes('kube-probe'),
  winstonInstance: log,
});

module.exports = log;
module.exports.httpLogger = httpLogger;
