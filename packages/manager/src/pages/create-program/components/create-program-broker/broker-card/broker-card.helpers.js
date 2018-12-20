import GMLogo from "../../../media/gm.png";
import HuobiLogo from "../../../media/huobi.png";
import IDEXLogo from "../../../media/idex.png";
import Just2tradeLogo from "../../../media/j2t.png";
import OKExLogo from "../../../media/okex.png";
import RoboforexLogo from "../../../media/roboforex.png";

export const getBrokerCardImage = name => {
  const brokerName = slugBrokerName(name);
  switch (brokerName) {
    case "genesis-markets":
      return GMLogo;
    case "okex":
      return OKExLogo;
    case "huobi":
      return HuobiLogo;
    case "just2trade":
      return Just2tradeLogo;
    case "roboforex":
      return RoboforexLogo;
    case "idex":
      return IDEXLogo;
    default:
      return null;
  }
};

export const slugBrokerName = name => name.toLowerCase().replace(/\s+/g, "-");
