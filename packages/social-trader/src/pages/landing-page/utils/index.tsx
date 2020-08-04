import { useParams, useReferrer } from "hooks/location";
import { NextPageContext } from "next";
import { REFERRER, UTM_SOURCE } from "pages/auth/signup/signup.constants";
import React, { useEffect } from "react";
import { cookieServiceCreator } from "utils/cookie-service.creator";
import { getRef } from "utils/ref";

export const getElementHeight = (ref: React.RefObject<HTMLDivElement>) => {
  return ref.current ? ref.current.getBoundingClientRect().height : 0;
};

export const useUtm = () => {
  const referer = useReferrer();
  const { params } = useParams();
  useEffect(() => {
    if (params) {
      setUtm(params);
    }
  }, [params]);
  useEffect(() => {
    if (referer) {
      setReferrer(referer);
    }
  }, [referer]);
};

export const { get: getUtm, set: setUtm } = cookieServiceCreator<string>({
  key: UTM_SOURCE,
  initialState: undefined
});
export const { get: getReferrer, set: setReferrer } = cookieServiceCreator<
  string
>({
  key: REFERRER,
  initialState: undefined
});
export const getRefCode = (ctx?: NextPageContext) => getRef(ctx);
