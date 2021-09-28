import { useLocation } from "hooks/location";
import { useEffect, useState } from "react";

const useDevelopmentFeature = (isAvailableProd?: boolean) => {
  const [isAvailableFeature, setIsAvailableFeature] = useState(
    !!isAvailableProd
  );
  const { location } = useLocation();

  useEffect(() => {
    if (location && !isAvailableProd) {
      setIsAvailableFeature(location.host !== "genesis.vision");
    }
  }, [location, isAvailableProd]);

  return { isAvailableFeature };
};

export default useDevelopmentFeature;
