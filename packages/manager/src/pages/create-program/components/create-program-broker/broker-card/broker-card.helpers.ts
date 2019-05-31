import GMLogo from "../../../media/gm.png";
import HuobiLogo from "../../../media/huobi.png";
import Just2tradeLogo from "../../../media/j2t.png";
import RoboforexLogo from "../../../media/roboforex.png";

export const getBrokerCardImage = (name: string): string | undefined => {
  const brokerName = slugBrokerName(name);
  switch (brokerName) {
    case "genesis-markets":
      return GMLogo;
    case "huobi":
      return HuobiLogo;
    case "just2trade":
      return Just2tradeLogo;
    case "roboforex":
      return RoboforexLogo;
    default:
      return undefined;
  }
};

export const slugBrokerName = (name: string): string =>
  name.toLowerCase().replace(/\s+/g, "-");
