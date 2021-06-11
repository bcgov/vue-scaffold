const config = require('config');
const jwt = require('jsonwebtoken');
const { createLogger, format, transports } = require('winston');
const { logger } = require('express-winston');

const log = createLogger({
  // defaultMeta: { service: 'scaffold' }, // Add default annotation attribute to log output
  exitOnError: false,
  format: format.combine(
    format.errors({ stack: true }), // Force errors to show stacktrace
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
    filename: config.get('server.logFile'),
    handleExceptions: true
  }));
}

const httpLogger = logger({
  colorize: false,
  dynamicMeta: (req, res) => {
    const token = jwt.decode((req.get('authorization') || '').slice(7));
    return {
      azp: token && token.azp || undefined,
      contentLength: res.get('content-length'),
      httpVersion: req.httpVersion,
      ip: req.ip,
      method: req.method,
      path: req.path,
      query: Object.keys(req.query).length ? req.query : undefined,
      responseTime: res.responseTime,
      statusCode: res.statusCode,
      userAgent: req.get('user-agent')
    };
  },
  expressFormat: true,
  level: 'http',
  meta: true,
  metaField: null, // Set to null for all attributes to be at top level object
  requestWhitelist: [], // Suppress default value output
  responseWhitelist: [], // Suppress default value output
  // Skip logging kube-probe requests
  skip: (req) => req.get('user-agent') && req.get('user-agent').includes('kube-probe'),
  winstonInstance: log,
});

module.exports = log;
module.exports.httpLogger = httpLogger;
