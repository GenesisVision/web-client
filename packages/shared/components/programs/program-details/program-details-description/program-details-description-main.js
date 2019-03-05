import "./program-details-description.scss";

import { GVButton } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import DetailsFavorite from "shared/components/details/details-description-section/details-description/details-favorite";
import DetailsNotification from "shared/components/details/details-description-section/details-description/details-notificaton";
import Popover from "shared/components/popover/popover";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import TagProgramItem from "shared/components/tag-program/tag-program-item";
import {
  composeManagerDetailsUrl,
  composeProgramNotificationsUrl
} from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

import InvestmentLimitsPopover from "./investment-limits-popover";

class ProgramDetailsDescriptionMain extends Component {
  state = {
    isOpenAboutLevels: false,
    anchor: null
  };

  handleOpenDropdown = event => this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: null });

  render() {
    const { anchor, isOpenAboutLevels } = this.state;
    const {
      t,
      programDescription,
      AboutLevelsContainerComponent,
      isFavorite,
      onFavoriteClick,
      hasNotifications,
      investmentsLimits
    } = this.props;

    return (
      <div className="program-details-description__main">
        <div className="program-details-description__avatar">
          <AssetAvatar
            url={programDescription.logo}
            level={programDescription.level}
            alt={programDescription.title}
            size="big"
            color={programDescription.color}
            onClickLevel={this.handleOpenDropdown}
          />
          <Popover
            horizontal="left"
            vertical="bottom"
            anchorEl={anchor}
            noPadding
            onClose={this.handleCloseDropdown}
          >
            <InvestmentLimitsPopover
              currency={programDescription.currency}
              level={programDescription.level}
              canLevelUp={programDescription.rating.canLevelUp}
              closePopover={this.handleCloseDropdown}
            />
          </Popover>
        </div>
        <div className="program-details-description__info">
          <h1 className="title-small-padding">{programDescription.title}</h1>
          <Link
            to={{
              pathname: composeManagerDetailsUrl(
                programDescription.manager.url
              ),
              state: `/ ${programDescription.title}`
            }}
          >
            <GVButton
              variant="text"
              className="program-details-description__author-btn"
            >
              {programDescription.manager.username}
            </GVButton>
          </Link>
          <div className="program-details-description__tag">
            {programDescription.tags.map((tag, idx) => (
              <TagProgramItem name={tag.name} color={tag.color} key={idx} />
            ))}
          </div>
          <h4 className="program-details-description__subheading">
            {t("program-details-page.description.strategy")}
          </h4>
          <div className="program-details-description__text">
            {programDescription.description}
          </div>
        </div>
        <div className="program-details-description__settings">
          <DetailsFavorite
            id={programDescription.id}
            isFavorite={isFavorite}
            toggleFavorite={onFavoriteClick}
          />
          <DetailsNotification
            title={programDescription.title}
            url={composeProgramNotificationsUrl(programDescription.url)}
            hasNotifications={hasNotifications}
          />
        </div>
      </div>
    );
  }
}

export default translate()(ProgramDetailsDescriptionMain);
