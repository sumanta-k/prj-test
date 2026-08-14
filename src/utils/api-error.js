class ApiError extends Error {
  constructor(
    statusCode,
    message = 'Something Went Wrong',
    stack = '',
    errors = []
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
