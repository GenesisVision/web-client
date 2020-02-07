import "./programs-container.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import { ProgramDetailsListItem } from "gv-api-web";
import LPButton from "pages/landing-page/components/lp-button/lp-button";
import ProgramsList from "pages/landing-page/components/programs/programs-list";
import ProgramIcon from "pages/landing-page/images/common/program-icon.svg";
import React from "react";
import { PROGRAMS_ROUTE } from "routes/programs.routes";

interface Props {
  programs: ProgramDetailsListItem[];
}

const ProgramsContainer: React.FC<Props> = ({ programs }) => {
  if (!programs.length) return null;
  return (
    <div className="programs-container">
      <div className="programs-container__info">
        <ImageBaseElement
          src={ProgramIcon}
          alt="Programs"
          className="programs-container__img"
        />
        <h2 className="programs-container__title">Programs</h2>
        <p className="programs-container__text">
          Select investment programs that suit your personal profile and let the
          manager do the work for you. You will be able to withdraw your
          investment or profits only at predefined intervals set by the
          program’s manager.
        </p>
        <LPButton href={PROGRAMS_ROUTE}>Discover</LPButton>
      </div>
      <ProgramsList className="programs-container__list" programs={programs} />
    </div>
  );
};

export default ProgramsContainer;
