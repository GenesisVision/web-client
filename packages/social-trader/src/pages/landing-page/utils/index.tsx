import { useParams } from "hooks/location";
import { NextPageContext } from "next";
import { UTM_SOURCE } from "pages/auth/signup/signup.constants";
import React, { useEffect } from "react";
import { getCookie, setCookie } from "utils/cookie";

export const getElementHeight = (ref: React.RefObject<HTMLDivElement>) => {
  return ref.current ? ref.current.getBoundingClientRect().height : 0;
};

export const useUtm = () => {
  const params = useParams();
  useEffect(() => {
    if (params) {
      setCookie(UTM_SOURCE, params);
    }
  }, [params]);
};

export const getUtm = (ctx?: NextPageContext) => getCookie(UTM_SOURCE, ctx);
