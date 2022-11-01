import { HttpStatusCode } from "azure-functions-ts-essentials";
export function responseFactory(body: any = null, httpCode = 200) {
  return {
    statusCode:
      httpCode === HttpStatusCode.OK && (!body || Object.keys(body).length == 0)
        ? HttpStatusCode.NoContent
        : httpCode,
    body: body,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  };
}
