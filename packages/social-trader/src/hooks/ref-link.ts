import { useParams } from "hooks/location";
import { REFERRAL_CODE } from "pages/auth/signup/signup.constants";
import * as qs from "qs";
import { useEffect } from "react";
import { setCookie } from "utils/cookie";

export const useRefLink = () => {
  const params = useParams();
  useEffect(() => {
    if (params) {
      const { ref } = qs.parse(params);
      if (ref) setCookie(REFERRAL_CODE, ref);
    }
  }, [params]);
};
