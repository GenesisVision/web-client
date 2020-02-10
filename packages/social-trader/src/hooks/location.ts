import { Location } from "history";
import { useEffect, useState } from "react";
import { getLocation } from "utils/location";

export const useLocation = () => {
  const [location, setLocation] = useState<Location | undefined>();
  useEffect(() => {
    if (typeof window !== "undefined") setLocation(getLocation());
  }, [typeof window !== "undefined"]);
  return { location };
};

export const useParams = () => {
  const [params, setParams] = useState<string | null>(null);
  const { location } = useLocation();
  useEffect(() => {
    if (location) setParams(location.search.slice(1));
  }, [location]);
  return params;
};

export const useReferrer = () => {
  const [referrer, setReferrer] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== undefined) setReferrer(window.document.referrer);
  }, [window]);
  return referrer;
};
