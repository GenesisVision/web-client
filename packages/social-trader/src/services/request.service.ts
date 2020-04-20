import fetch from "isomorphic-unfetch";
import { from, Observable } from "rxjs";
import { AnyObjectType } from "utils/types";

export interface RequestOptions {
  publicKey?: string;
  url: string;
  params?: OrderRequest;
  type?: REQUEST_TYPE[];
  method?: HTTP_METHODS;
}

export enum REQUEST_TYPE {
  AUTHORIZED,
  SIGNED
}

export interface OrderRequest extends AnyObjectType {
  symbol?: string;
  price?: string;
  quantity?: string;
  timeInForce?: TimeInForce;
  side?: string;
  type?: string;
  timestamp?: string;
  limit?: string;
}

export enum TimeInForce {
  GTC = "GTC",
  IOC = "IOC",
  FOK = "FOK"
}

export enum HTTP_METHODS {
  POST = "POST",
  GET = "GET"
}

export const BINANCE_API_KEY_HEADER = "x-mbx-apikey";

export const sendRequest = ({
  publicKey,
  method = HTTP_METHODS.GET,
  params,
  type,
  url
}: RequestOptions): Observable<any> => {
  const headers: AnyObjectType = {};
  const body: AnyObjectType = {};

  if (params)
    for (const param in params) if (params[param]) body[param] = params[param];

  if (type && type.includes(REQUEST_TYPE.AUTHORIZED)) {
    headers[BINANCE_API_KEY_HEADER] = publicKey;
    headers["content-type"] = "application/x-www-form-urlencoded";
  }
  if (type && type.includes(REQUEST_TYPE.SIGNED)) {
    body["timestamp"] = String(Date.now());
  }
  return from(
    fetch(url, {
      method,
      headers,
      body: JSON.stringify(body)
    })
  );
};

const get = (options: RequestOptions): Observable<any> =>
  sendRequest({ ...options, method: HTTP_METHODS.GET });

const post = (options: RequestOptions): Observable<any> =>
  sendRequest({ ...options, method: HTTP_METHODS.POST });

export const requestService = { get, post };
