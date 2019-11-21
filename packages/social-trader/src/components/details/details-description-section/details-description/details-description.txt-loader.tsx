import GVButton from "components/gv-button";
import SocialLinksBlockLoader from "components/social-links-block/social-links-block.loader";
import SvgLoader from "components/svg-loader/svg-loader";
import faker from "faker";
import * as React from "react";
import { useTranslation } from "react-i18next";

import DetailsFavorite from "./controls/details-favorite";
import DetailsNotification from "./controls/details-notification";

const _DetailsDescriptionTextLoader: React.FC<{ assets?: boolean }> = ({
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
        <h1 className="title-small-padding">{faker.lorem.word()}</h1>
        <GVButton
          variant="text"
          className="asset-details-description__author-btn"
        >
          {`${faker.name.firstName()} ${faker.name.lastName()}`}
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
        <div className="asset-details-description__text">
          {faker.lorem.paragraph()}
        </div>
      </div>
      <div className="asset-details-description__settings">
        <DetailsFavorite id={""} isFavorite={false} />
        <DetailsNotification to={{ pathname: "" }} hasNotifications={false} />
      </div>
    </div>
  );
};

const DetailsDescriptionTextLoader = React.memo(_DetailsDescriptionTextLoader);
export default DetailsDescriptionTextLoader;
