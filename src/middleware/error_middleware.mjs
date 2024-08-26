import HttpException from "../exections/root.mjs";

export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof HttpException) {
    // If the error is an instance of HttpException, use its status code and message
    res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode,
    });
  } else {
    // If the error is not an instance of HttpException, handle it as a generic server error
    res.status(500).json({
      message: "Internal Server Error",
      errorCode: "INTERNAL_SERVER_ERROR",
    });
  }
};

export default errorMiddleware;
