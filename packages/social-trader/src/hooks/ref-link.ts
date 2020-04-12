import { useParams } from "hooks/location";
import * as qs from "qs";
import { useEffect } from "react";
import { setRef } from "utils/ref";

export const useRefLink = () => {
  const params = useParams();
  useEffect(() => {
    if (params) {
      const { ref } = qs.parse(params);
      if (ref) setRef(ref);
    }
  }, [params]);
};
