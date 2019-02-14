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
import {
  composeManagerDetailsUrl,
  composeProgramNotificationsUrl
} from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

class ProgramDetailsDescriptionTop extends Component {
  state = {
    isOpenAboutLevels: false,
    anchor: null
  };
  handleOpenAboutLevels = () => {
    this.setState({ isOpenAboutLevels: true });
    this.handleCloseDropdown();
  };
  handleCloseAboutLevels = () => this.setState({ isOpenAboutLevels: false });
  handleOpenDropdown = event => this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: null });
  getCurrentLimit(currentLevel) {
    return this.props.investmentsLimits.find(
      LevelInfo => LevelInfo.level === currentLevel
    ).investmentLimit;
  }

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
      <div className="program-details-description__top">
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
            <div className="popover-levels">
              <div className="popover-levels__block">
                <h4 className="popover-levels__title">
                  {t("program-details-page.popover.genesis-level")}{" "}
                  {programDescription.level}
                </h4>
                {programDescription.rating.canLevelUp && (
                  <StatisticItem accent label={t("level-tooltip.level-up")}>
                    {t("level-tooltip.top10")}
                  </StatisticItem>
                )}

                {investmentsLimits.length && (
                  <StatisticItem
                    accent
                    label={t("program-details-page.popover.invest-limit")}
                  >
                    <NumberFormat
                      value={formatValue(
                        this.getCurrentLimit(programDescription.level)
                      )}
                      thousandSeparator={" "}
                      displayType="text"
                      suffix={` GVT`}
                    />
                  </StatisticItem>
                )}
              </div>
              <div className="popover-levels__block popover-levels__text-block">
                <div className="popover-levels__text">
                  {t("program-details-page.popover.text")}
                </div>
                <GVButton
                  variant="text"
                  onClick={this.handleOpenAboutLevels}
                  color="secondary"
                  className="popover-levels__about"
                >
                  {t("program-details-page.popover.about-levels")} &#8250;
                </GVButton>
              </div>
            </div>
          </Popover>
          <AboutLevelsContainerComponent
            open={isOpenAboutLevels}
            onClose={this.handleCloseAboutLevels}
          />
        </div>
        <div className="program-details-description__info">
          <h1 className="title-small-padding">{programDescription.title}</h1>
          <Link
            className="program-details-description__manager-link"
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

export default translate()(ProgramDetailsDescriptionTop);
