import "./program-details-description.scss";

import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import DetailsFavorite from "shared/components/details/details-description-section/details-description/controls/details-favorite";
import DetailsNotification from "shared/components/details/details-description-section/details-description/controls/details-notification";
import GVButton from "shared/components/gv-button";
import PieContainerSmall from "shared/components/pie-container/pie-container-small";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS,
  anchorElType
} from "shared/components/popover/popover";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import SocialLinksBlock from "shared/components/social-links-block/social-links-block";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import TagProgramItem from "shared/components/tag-program/tag-program-item";
import { STATUS } from "shared/constants/constants";
import filesService from "shared/services/file-service";
import {
  composeManagerDetailsUrl,
  composeProgramNotificationsUrl
} from "shared/utils/compose-url";

import { IChangePasswordTradingAccountProps } from "../program-details.types";
import InvestmentLimitsPopover from "./investment-limits-popover";

interface IProgramDetailsDescriptionMainProps
  extends IIProgramDetailsDescriptionMainOwnProps,
    InjectedTranslateProps {}

interface IProgramDetailsDescriptionMainState {
  anchor?: anchorElType;
}

class _ProgramDetailsDescriptionMain extends React.PureComponent<
  IProgramDetailsDescriptionMainProps,
  IProgramDetailsDescriptionMainState
> {
  constructor(props: IProgramDetailsDescriptionMainProps) {
    super(props);

    this.state = {
      anchor: undefined
    };
  }

  handleOpenDropdown = (event: React.MouseEvent<HTMLElement>) =>
    this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: undefined });

  render() {
    const { anchor } = this.state;
    const {
      levelsParameters,
      t,
      programDescription,
      ChangePasswordTradingAccount,
      isOwnProgram
    } = this.props;
    const personalDetails = programDescription.personalProgramDetails;
    return (
      <div className="program-details-description__main">
        <div className="program-details-description__avatar">
          <AssetAvatar
            url={programDescription.logo}
            level={programDescription.level}
            levelProgress={programDescription.levelProgress}
            alt={programDescription.title}
            size="big"
            color={programDescription.color}
            onClickLevel={this.handleOpenDropdown}
          />
          <Popover
            horizontal={HORIZONTAL_POPOVER_POS.LEFT}
            vertical={VERTICAL_POPOVER_POS.BOTTOM}
            anchorEl={anchor}
            noPadding
            onClose={this.handleCloseDropdown}
          >
            <InvestmentLimitsPopover
              limit={programDescription.totalAvailableInvestment}
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
          <SocialLinksBlock
            socialLinks={programDescription.manager.socialLinks}
          />
          <h4 className="program-details-description__subheading">
            {t("program-details-page.description.strategy")}
          </h4>
          <div className="program-details-description__text">
            {programDescription.description}
          </div>
          <div className="program-details-description__perfomance-data">
            <StatisticItem label={t("program-details-page.description.broker")}>
              <img
                className={"program-details-description__broker"}
                src={filesService.getFileUrl(
                  programDescription.brokerDetails.logo
                )}
              />
            </StatisticItem>
            <StatisticItem
              label={t("program-details-page.description.leverage")}
            >
              {programDescription.leverageMin}:{programDescription.leverageMin}
            </StatisticItem>
            {programDescription.periodStarts && (
              <StatisticItem
                label={t("program-details-page.description.period")}
              >
                <ProgramPeriodPie
                  condition={status !== STATUS.CLOSED}
                  loader={t("program-period.program-closed")}
                  start={programDescription.periodStarts}
                  end={programDescription.periodEnds}
                />
              </StatisticItem>
            )}
            <StatisticItem label={t("program-details-page.description.age")}>
              <PieContainerSmall
                end={levelsParameters.programAgeMax}
                value={programDescription.ageDays}
                suffix={"days"}
              />
            </StatisticItem>
            <StatisticItem
              label={t("program-details-page.description.genesis-ratio")}
            >
              <PieContainerSmall
                start={levelsParameters.genesisRatioMin}
                end={levelsParameters.genesisRatioMax}
                value={programDescription.genesisRatio}
              />
            </StatisticItem>
            <StatisticItem
              label={t("program-details-page.description.investment-scale")}
            >
              <PieContainerSmall
                start={levelsParameters.investmentScaleMin}
                end={levelsParameters.investmentScaleMax}
                value={programDescription.investmentScale}
              />
            </StatisticItem>
            <StatisticItem
              label={t("program-details-page.description.volume-scale")}
            >
              <PieContainerSmall
                start={levelsParameters.volumeScaleMin}
                end={levelsParameters.volumeScaleMax}
                value={programDescription.volumeScale}
              />
            </StatisticItem>
          </div>
        </div>
        <div className="program-details-description__settings">
          {ChangePasswordTradingAccount &&
            isOwnProgram &&
            personalDetails &&
            personalDetails.canChangePassword && (
              <ChangePasswordTradingAccount
                programDescription={programDescription}
              />
            )}
          <DetailsFavorite
            id={programDescription.id}
            isFavorite={personalDetails && personalDetails.isFavorite}
          />
          <DetailsNotification
            title={programDescription.title}
            url={composeProgramNotificationsUrl(programDescription.url)}
            hasNotifications={
              personalDetails && personalDetails.hasNotifications
            }
          />
        </div>
      </div>
    );
  }
}

interface IIProgramDetailsDescriptionMainOwnProps {
  levelsParameters: LevelsParamsInfo;
  programDescription: ProgramDetailsFull;
  ChangePasswordTradingAccount?: React.ComponentType<
    IChangePasswordTradingAccountProps
  >;
  isOwnProgram: boolean;
}

const ProgramDetailsDescriptionMain = translate()(
  _ProgramDetailsDescriptionMain
);
export default ProgramDetailsDescriptionMain;
