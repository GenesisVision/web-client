import * as qs from "qs";
import { useEffect, useState } from "react";
import { getLocation } from "utils/location";
import { AnyObjectType } from "utils/types";

export const useLocation = () => {
  const [location, setLocation] = useState<Location | undefined>();
  useEffect(() => {
    setLocation(getLocation());
  }, []);
  return { location };
};

export const useParams = () => {
  const [params, setParams] = useState<string | null>(null);
  const [parsedParams, setParsedParams] = useState<AnyObjectType | null>(null);
  const { location } = useLocation();
  useEffect(() => {
    if (location) {
      setParams(location.search.slice(1));
      setParsedParams(qs.parse(location.search.slice(1)));
    }
  }, [location]);
  return { params, parsedParams };
};

export const useReferrer = () => {
  const [referrer, setReferrer] = useState<string | null>(null);
  useEffect(() => {
    setReferrer(window.document.referrer);
  }, []);
  return referrer;
};
