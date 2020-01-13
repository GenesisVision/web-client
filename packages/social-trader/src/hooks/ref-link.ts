import { REFERRAL_CODE } from "components/auth/signup/signup.constants";
import { useLocation } from "hooks/location";
import * as qs from "qs";
import { useEffect } from "react";
import { setCookie } from "utils/cookie";

export const useRefLink = () => {
  const { location } = useLocation();
  useEffect(() => {
    if (location) {
      const { ref } = qs.parse(location.search.slice(1));
      if (ref) setCookie(REFERRAL_CODE, ref);
    }
  }, [window, location]);
};
