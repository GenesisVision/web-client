import "./programs-container.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import { ProgramDetailsListItem } from "gv-api-web";
import { useTranslation } from "i18n";
import { JoinButton } from "pages/landing-page/components/join-button";
import ProgramsList from "pages/landing-page/components/programs/programs-list";
import ProgramIcon from "pages/landing-page/images/common/program-icon.svg";
import React from "react";
import { PROGRAMS_ROUTE } from "routes/programs.routes";

interface Props {
  programs: ProgramDetailsListItem[];
}

const ProgramsContainer: React.FC<Props> = ({ programs }) => {
  const { t } = useTranslation();
  if (!programs.length) return null;
  return (
    <div className="programs-container">
      <div className="programs-container__info">
        <ImageBaseElement
          src={ProgramIcon}
          alt={t("landing-page.programs-container.title")}
          className="programs-container__img"
        />
        <h2 className="programs-container__title">
          {t("landing-page.programs-container.title")}
        </h2>
        <p className="programs-container__text">
          {t("landing-page.programs-container.text")}
        </p>
        <JoinButton
          eventLabel={t("landing-page.buttons.discover")}
          href={PROGRAMS_ROUTE}
        >
          {t("landing-page.buttons.discover")}
        </JoinButton>
      </div>
      <ProgramsList className="programs-container__list" programs={programs} />
    </div>
  );
};

export default ProgramsContainer;
