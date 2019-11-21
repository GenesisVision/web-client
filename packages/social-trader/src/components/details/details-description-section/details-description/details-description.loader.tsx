import GVButton from "components/gv-button";
import SocialLinksBlockLoader from "components/social-links-block/social-links-block.loader";
import SvgLoader from "components/svg-loader/svg-loader";
import * as React from "react";
import { useTranslation } from "react-i18next";

import DetailsFavorite from "./controls/details-favorite";
import DetailsNotification from "./controls/details-notification";

const _DetailsDescriptionLoader: React.FC<{ assets?: boolean }> = ({
  assets
}) => {
  const [t] = useTranslation();
  return (
    <div className="asset-details-description__main">
      <div className="asset-details-description__avatar">
        <div style={{ width: 120 }}>
          <SvgLoader height={120} width={120}>
            <rect x="0" y="0" rx="8" ry="8" width="120" height="120" />
          </SvgLoader>
        </div>
      </div>
      <div className="asset-details-description__info">
        <h1 className="title-small-padding">
          <div style={{ width: 100 }}>
            <SvgLoader height={32} width={100}>
              <rect x="0" y="0" rx="10" ry="10" width="100" height="32" />
            </SvgLoader>
          </div>
        </h1>
        <GVButton
          variant="text"
          className="asset-details-description__author-btn"
        >
          <div style={{ width: 150 }}>
            <SvgLoader height={13} width={150}>
              <rect x="0" y="0" rx="5" ry="5" width="150" height="13" />
            </SvgLoader>
          </div>
        </GVButton>
        <SocialLinksBlockLoader />
        {assets && (
          <div className="details-description__info-block">
            <h4 className="details-description__subheading">
              {t("fund-details-page.description.assets")}
            </h4>
            <div style={{ width: 470 }}>
              <SvgLoader height={40} width={470}>
                <rect x="0" y="0" rx="8" ry="8" width="150" height="40" />
                <rect x="160" y="0" rx="8" ry="8" width="150" height="40" />
                <rect x="320" y="0" rx="8" ry="8" width="150" height="40" />
              </SvgLoader>
            </div>
          </div>
        )}
        <h4 className="asset-details-description__subheading">
          {t("fund-details-page.description.strategy")}
        </h4>
        <div className="asset-details-description__text" style={{ width: 250 }}>
          <SvgLoader height={65} width={250}>
            <rect x="0" y="0" rx="5" ry="5" width="80" height="13" />
            <rect x="90" y="0" rx="5" ry="5" width="100" height="13" />
            <rect x="200" y="0" rx="5" ry="5" width="50" height="13" />

            <rect x="0" y="26" rx="5" ry="5" width="50" height="13" />
            <rect x="60" y="26" rx="5" ry="5" width="80" height="13" />
            <rect x="150" y="26" rx="5" ry="5" width="100" height="13" />

            <rect x="0" y="52" rx="5" ry="5" width="100" height="13" />
            <rect x="110" y="52" rx="5" ry="5" width="50" height="13" />
            <rect x="170" y="52" rx="5" ry="5" width="80" height="13" />
          </SvgLoader>
        </div>
      </div>
      <div className="asset-details-description__settings">
        <DetailsFavorite id={""} isFavorite={false} />
        <DetailsNotification to={{ pathname: "" }} hasNotifications={false} />
      </div>
    </div>
  );
};

const DetailsDescriptionLoader = React.memo(_DetailsDescriptionLoader);
export default DetailsDescriptionLoader;
