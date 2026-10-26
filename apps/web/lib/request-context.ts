import { randomUUID } from "crypto";

export function getRequestId(req: Request) {
  const headerId = req.headers.get("x-request-id");
  return headerId ?? randomUUID();
}
