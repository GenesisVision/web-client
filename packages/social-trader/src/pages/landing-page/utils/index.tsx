import { useParams, useReferrer } from "hooks/location";
import { NextPageContext } from "next";
import { REFERRER, UTM_SOURCE } from "pages/auth/signup/signup.constants";
import React, { useEffect } from "react";
import { getCookie, setCookie } from "utils/cookie";

export const getElementHeight = (ref: React.RefObject<HTMLDivElement>) => {
  return ref.current ? ref.current.getBoundingClientRect().height : 0;
};

export const useUtm = () => {
  const referer = useReferrer();
  const params = useParams();
  useEffect(() => {
    if (params) {
      setCookie(UTM_SOURCE, params);
    }
  }, [params]);
  useEffect(() => {
    if (referer) {
      setCookie(REFERRER, referer);
    }
  }, [referer]);
};

export const getUtm = (ctx?: NextPageContext) => getCookie(UTM_SOURCE, ctx);
export const getReferrer = (ctx?: NextPageContext) => getCookie(REFERRER, ctx);
