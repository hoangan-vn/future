class HttpException extends Error {
  statusCode: number;
  error: string;

  constructor(statusCode = 500, error = "INTERNAL_SERVER") {
    super(error);
    this.statusCode = statusCode;
    this.error = error;
  }
}

export default HttpException;
