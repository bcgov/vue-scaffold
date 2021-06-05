const config = require('config');
const { createLogger, format, transports } = require('winston');

const log = createLogger({
  exitOnError: false,
  format: format.json(),
  level: config.get('server.logLevel')
});

if (process.env.NODE_ENV !== 'test') {
  log.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    ),
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

module.exports = log;
