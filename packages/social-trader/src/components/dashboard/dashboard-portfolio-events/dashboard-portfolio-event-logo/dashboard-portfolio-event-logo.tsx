import "./dashboard-portfolio-event-logo.scss";

import classNames from "classnames";
import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import ImageBase from "components/avatar/image-base";
import Link from "components/link/link";
import { AssetDetails } from "gv-api-web";
import SocialLink from "media/social-link.svg";
import React from "react";
import {
  composeAssetDetailsFolderUrl,
  composeAssetDetailsUrl,
  composeFundsDetailsUrl,
  composeProgramDetailsUrl
} from "utils/compose-url";

const _PortfolioEventLogo: React.FC<Props> = ({
  withAsset = true,
  assetDetails,
  icon,
  from
}) => {
  const to = {
    pathname:
      assetDetails.assetType === "Program"
        ? composeProgramDetailsUrl(assetDetails.url || "")
        : composeFundsDetailsUrl(assetDetails.url || ""),
    state: from ? `/ ${from}` : ""
  };
  return (
    <div
      className={classNames("portfolio-event-logo", {
        "portfolio-event-logo--with-asset": withAsset
      })}
    >
      {withAsset &&
        ((assetDetails.url && (
          <Link to={to} className="portfolio-event-logo__photo">
            <AssetAvatar
              url={assetDetails.logo}
              alt={assetDetails.title}
              className="portfolio-event-logo__logo"
              color={assetDetails.color}
            />
          </Link>
        )) || (
          <div className="portfolio-event-logo__photo">
            <AssetAvatar
              url={assetDetails.logo}
              alt={assetDetails.title}
              className="portfolio-event-logo__logo"
              color={assetDetails.color}
            />
          </div>
        ))}
      {icon && (
        <div
          className={classNames("portfolio-event-logo__type", {
            "portfolio-event-logo__type--with-asset": withAsset
          })}
        >
          <ImageBase url={icon} alt="event logo" defaultImage={SocialLink} />
        </div>
      )}
    </div>
  );
};

interface Props {
  assetDetails: AssetDetails;
  icon: string;
  from?: string;
  withAsset?: boolean;
}

const PortfolioEventLogo = React.memo(_PortfolioEventLogo);
export default PortfolioEventLogo;
