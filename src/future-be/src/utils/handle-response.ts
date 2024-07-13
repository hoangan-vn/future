import HttpException from "./http-exception";
export function handlerResSuccess<T>(message: string, data: T) {
  return {
    message,
    data,
  };
}

export function handleResFailure(error: string, statusCode: number) {
  throw new HttpException(statusCode, error);
}
