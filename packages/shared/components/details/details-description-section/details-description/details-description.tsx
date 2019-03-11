import { GVButton } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import DetailsFavorite from "shared/components/details/details-description-section/details-description/controls/details-favorite";
import DetailsNotification from "shared/components/details/details-description-section/details-description/controls/details-notification";
import { composeManagerDetailsUrl } from "shared/utils/compose-url";

type AssetDescription = {
  id: string;
  title: string;
  description: string;
  logo: string;
  notificationsUrl: string;
  isFavorite: boolean;
  hasNotifications: boolean;
  managerUrl: string;
  managerName: string;
};

interface IDetailsDescriptionOwnProps {
  AssetDetailsAvatar: React.ComponentType<any>;
  AssetDetailsExtraBlock: React.ComponentType<any>;
  assetDescription: AssetDescription;
}

interface IDetailsDescriptionProps
  extends IDetailsDescriptionOwnProps,
    InjectedTranslateProps {}

interface IDetailsDescriptionState {}

class DetailsDescription extends React.Component<
  IDetailsDescriptionProps,
  IDetailsDescriptionState
> {
  render() {
    const {
      t,
      assetDescription,
      AssetDetailsAvatar,
      AssetDetailsExtraBlock
    } = this.props;

    return (
      <div className="program-details-description__main">
        <div className="program-details-description__avatar">
          <AssetDetailsAvatar />
        </div>
        <div className="program-details-description__info">
          <h1 className="title-small-padding">{assetDescription.title}</h1>
          <Link
            to={{
              pathname: composeManagerDetailsUrl(assetDescription.managerUrl),
              state: `/ ${assetDescription.title}`
            }}
          >
            <GVButton
              variant="text"
              className="program-details-description__author-btn"
            >
              {assetDescription.managerName}
            </GVButton>
          </Link>
          <AssetDetailsExtraBlock />
          <h4 className="program-details-description__subheading">
            {t("program-details-page.description.strategy")}
          </h4>
          <div className="program-details-description__text">
            {assetDescription.description}
          </div>
        </div>
        <div className="program-details-description__settings">
          <DetailsFavorite
            id={assetDescription.id}
            isFavorite={assetDescription.isFavorite}
          />
          <DetailsNotification
            title={assetDescription.title}
            url={assetDescription.notificationsUrl}
            hasNotifications={assetDescription.hasNotifications}
          />
        </div>
      </div>
    );
  }
}

export default translate()(DetailsDescription);
