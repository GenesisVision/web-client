import { Location } from "history";
import { useEffect, useState } from "react";
import { getLocation } from "utils/location";

export const useLocation = () => {
  const [location, setLocation] = useState<Location | undefined>();
  useEffect(() => {
    setLocation(getLocation());
  });
  return { location };
};
