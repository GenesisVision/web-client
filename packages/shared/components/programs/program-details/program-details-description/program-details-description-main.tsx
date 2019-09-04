import "./program-details-description.scss";

import { ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import DetailsFavorite from "shared/components/details/details-description-section/details-description/controls/details-favorite";
import DetailsNotification from "shared/components/details/details-description-section/details-description/controls/details-notification";
import DetailsSettingControl from "shared/components/details/details-description-section/details-description/controls/details-setting-control";
import GVButton from "shared/components/gv-button";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import SocialLinksBlock from "shared/components/social-links-block/social-links-block";
import TagItem from "shared/components/tags/tag-item/tag-item";
import useAnchor from "shared/hooks/anchor.hook";
import {
  composeManagerDetailsUrl,
  composeProgramNotificationsUrl,
  composeProgramSettingsUrl
} from "shared/utils/compose-url";

import { IChangePasswordTradingAccountProps } from "../program-details.types";
import InvestmentLimitsPopover from "./investment-limits-popover";

const _ProgramDetailsDescriptionMain: React.FC<Props> = ({
  programDescription,
  isOwnProgram
}) => {
  const [t] = useTranslation();
  const { anchor, setAnchor, clearAnchor } = useAnchor();
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
          onClickLevel={setAnchor}
        />
        <Popover
          horizontal={HORIZONTAL_POPOVER_POS.LEFT}
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          anchorEl={anchor}
          noPadding
          onClose={clearAnchor}
        >
          <InvestmentLimitsPopover
            limit={programDescription.totalAvailableInvestment}
            currency={programDescription.currency}
            level={programDescription.level}
            canLevelUp={programDescription.rating.canLevelUp}
            closePopover={clearAnchor}
          />
        </Popover>
      </div>
      <div className="program-details-description__info">
        <h1 className="title-small-padding">{programDescription.title}</h1>
        <Link
          to={{
            pathname: composeManagerDetailsUrl(programDescription.manager.url),
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
            <TagItem name={tag.name} color={tag.color} key={idx} />
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
      </div>
      <div className="program-details-description__settings">
        <DetailsFavorite
          id={programDescription.id}
          isFavorite={personalDetails && personalDetails.isFavorite}
        />
        <DetailsNotification
          title={programDescription.title}
          url={composeProgramNotificationsUrl(programDescription.url)}
          hasNotifications={personalDetails && personalDetails.hasNotifications}
        />
        {isOwnProgram && personalDetails && personalDetails.canCloseProgram && (
          <DetailsSettingControl
            title={programDescription.title}
            url={composeProgramSettingsUrl(programDescription.url)}
            text={t("program-details-page.description.program-settings")}
          />
        )}
      </div>
    </div>
  );
};

interface Props {
  programDescription: ProgramDetailsFull;
  ChangePasswordTradingAccount?: React.ComponentType<
    IChangePasswordTradingAccountProps
  >;
  isOwnProgram: boolean;
}

const ProgramDetailsDescriptionMain = React.memo(
  _ProgramDetailsDescriptionMain
);
export default ProgramDetailsDescriptionMain;
