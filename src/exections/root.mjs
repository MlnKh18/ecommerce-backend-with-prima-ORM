// root.mjs

export const ErrorCode = {
  BAD_REQUEST: 'BAD_REQUEST',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
};

export default class HttpException extends Error {
  constructor(statusCode, message, errorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor); // Menangkap jejak tumpukan kesalahan untuk debugging
  }
}
