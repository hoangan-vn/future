export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FOBIDDEN = 403,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIMEOUT = 408,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENT = 501,
  BAD_GATWAGE = 502,
  SERVICE_UNAVAILABLE = 503,
}

export enum OrderStatus {
  Pending = "pending",
  Delivering = "delivering",
  Completed = "completed",
}
