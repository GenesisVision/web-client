import { Location } from "history";
import { useEffect, useState } from "react";
import { getLocation } from "utils/location";

export const useLocation = () => {
  const [location, setLocation] = useState<Location | undefined>();
  useEffect(() => {
    if (typeof window !== undefined) setLocation(getLocation());
  }, [window]);
  return { location };
};
