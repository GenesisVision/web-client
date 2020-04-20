import { merge, Observable } from "rxjs";
import { map } from "rxjs/operators";

export enum REQUEST_TYPE {
  SIMPLE = "SIMPLE",
  ARRAY = "ARRAY"
}

export const generateStream = (
  requests: Observable<any>[],
  requestType: REQUEST_TYPE = REQUEST_TYPE.SIMPLE
): Observable<any> =>
  merge(...requests).pipe(
    map(item => {
      switch (requestType) {
        case REQUEST_TYPE.ARRAY:
          if (Array.isArray(item)) return item;
          return [item];
        case REQUEST_TYPE.SIMPLE:
        default:
          return item;
      }
    })
  );
