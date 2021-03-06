import ImageBaseElement from "components/avatar/image-base.element";
import { ProgramDetailsListItem } from "gv-api-web";
import { useTranslation } from "i18n";
import { JoinButton } from "pages/landing-page/components/join-button";
import ProgramsList from "pages/landing-page/components/programs/programs-list";
import ProgramIcon from "pages/landing-page/images/common/program-icon.svg";
import React from "react";
import { PROGRAMS_ROUTE } from "routes/programs.routes";

import styles from "./programs-container.module.scss";

interface Props {
  programs: ProgramDetailsListItem[];
}

const _ProgramsContainer: React.FC<Props> = ({ programs }) => {
  const { t } = useTranslation();
  if (!programs.length) return null;
  return (
    <div className={styles["programs-container"]}>
      <div className={styles["programs-container__info"]}>
        <ImageBaseElement
          src={ProgramIcon}
          alt={t("landing-page:programs.title")}
          className={styles["programs-container__img"]}
        />
        <h2 className={styles["programs-container__title"]}>
          {t("landing-page:programs.title")}
        </h2>
        <p className={styles["programs-container__text"]}>
          {t("landing-page:programs.text")}
        </p>
        <JoinButton
          eventLabel={t("landing-page:buttons.discover")}
          href={PROGRAMS_ROUTE}
        >
          {t("landing-page:buttons.discover")}
        </JoinButton>
      </div>
      <ProgramsList
        className={styles["programs-container__list"]}
        programs={programs}
      />
    </div>
  );
};

const ProgramsContainer = React.memo(_ProgramsContainer);
export default ProgramsContainer;
