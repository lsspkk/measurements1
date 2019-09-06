module.exports = function apierror(message, httpStatus) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.status = httpStatus;
};

require('util').inherits(module.exports, Error);