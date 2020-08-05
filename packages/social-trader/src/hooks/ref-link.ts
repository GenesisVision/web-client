import { useParams } from "hooks/location";
import { useEffect } from "react";
import { setRef } from "utils/ref";

export const useRefLink = () => {
  const { parsedParams } = useParams();
  useEffect(() => {
    if (parsedParams) {
      const { ref } = parsedParams;
      if (ref) setRef(ref);
    }
  }, [parsedParams]);
};
