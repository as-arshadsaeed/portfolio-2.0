export type HandlerCtx<T> = {
  body: T;
  req: Request;
};

export type MiddlewareCtx = {
  req: Request;
  startTime: number;
};
