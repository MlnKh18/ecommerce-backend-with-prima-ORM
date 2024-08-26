import HttpException, { ErrorCode } from "./root.mjs";

export class BadRequestException extends HttpException {
  constructor(message, errorCode = ErrorCode.BAD_REQUEST) {
    super(400, message, errorCode); // Status code 400 untuk Bad Request
  }
}
