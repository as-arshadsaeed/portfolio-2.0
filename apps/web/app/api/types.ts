export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiFail = {
  success: false;
  error: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFail;
