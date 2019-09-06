import { FundDetailsFull } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { Link } from "react-router-dom";
import DetailsFavorite from "shared/components/details/details-description-section/details-description/controls/details-favorite";
import DetailsNotification from "shared/components/details/details-description-section/details-description/controls/details-notification";
import DetailsSettingControl from "shared/components/details/details-description-section/details-description/controls/details-setting-control";
import GVButton from "shared/components/gv-button";
import SocialLinksBlock from "shared/components/social-links-block/social-links-block";
import {
  composeFundNotificationsUrl,
  composeFundSettingsUrl,
  composeManagerDetailsUrl
} from "shared/utils/compose-url";

const _FundDetailsDescription: React.FC<Props> = ({
  t,
  description,
  AssetDetailsAvatar,
  AssetDetailsExtraBlock
}) => (
  <div className="program-details-description__main">
    <div className="program-details-description__avatar">
      <AssetDetailsAvatar />
    </div>
    <div className="program-details-description__info">
      <h1 className="title-small-padding">{description.title}</h1>
      <Link
        to={{
          pathname: composeManagerDetailsUrl(description.manager.url),
          state: `/ ${description.title}`
        }}
      >
        <GVButton
          variant="text"
          className="program-details-description__author-btn"
        >
          {description.manager.username}
        </GVButton>
      </Link>
      <SocialLinksBlock socialLinks={description.manager.socialLinks} />
      <AssetDetailsExtraBlock />
      <h4 className="program-details-description__subheading">
        {t("program-details-page.description.strategy")}
      </h4>
      <div className="program-details-description__text">
        {description.description}
      </div>
    </div>
    <div className="program-details-description__settings">
      <DetailsFavorite
        id={description.id}
        isFavorite={
          description.personalFundDetails
            ? description.personalFundDetails.isFavorite
            : false
        }
      />
      <DetailsNotification
        title={description.title}
        url={composeFundNotificationsUrl(description.url)}
        hasNotifications={
          description.personalFundDetails
            ? description.personalFundDetails.hasNotifications
            : false
        }
      />
      {description.personalFundDetails &&
        description.personalFundDetails.isOwnProgram &&
        description.personalFundDetails.canCloseProgram && (
          <DetailsSettingControl
            title={description.title}
            url={composeFundSettingsUrl(description.url)}
            text={t("fund-details-page.description.fund-settings")}
          />
        )}
    </div>
  </div>
);

const FundDetailsDescription = translate()(React.memo(_FundDetailsDescription));
export default FundDetailsDescription;

interface OwnProps {
  AssetDetailsAvatar: React.ComponentType<any>;
  AssetDetailsExtraBlock: React.ComponentType<any>;
  description: FundDetailsFull;
}

interface Props extends OwnProps, WithTranslation {}
