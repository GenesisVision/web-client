import "./programs-container.scss";

import { ProgramDetailsListItem } from "gv-api-web";
import * as React from "react";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import ProgramsList from "routes/ssr/landing-page/components/programs/programs-list";
import ProgramIcon from "routes/ssr/landing-page/images/common/program-icon.svg";

interface Props {
  programs?: ProgramDetailsListItem[];
}

const ProgramsContainer: React.FC<Props> = ({ programs }) => {
  console.log(programs);
  // if (!programs.length) return null;
  return (
    <div className="programs-container">
      <div className="programs-container__info">
        <img
          src={ProgramIcon}
          alt="Programs"
          className="programs-container__img"
        />
        <h2 className="programs-container__title">Programs</h2>
        <p className="programs-container__text">
          Receive a 100% bonus on any deposit made on Genesis Markets. The bonus
          is unlocked as soon as you start trading!
        </p>
        <LPButton href="/">Discover</LPButton>
      </div>
      <ProgramsList className="programs-container__list" />
    </div>
  );
};

export default ProgramsContainer;
