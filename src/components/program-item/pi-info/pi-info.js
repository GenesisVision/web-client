import { Link } from "react-router-dom";
import React from "react";

import replaceParams from "../../../utils/replace-params";
import TraderAvatar from "../../program-item/pi-avatar/pi-avatar";

import "./pi-info.css";
import { PROGRAM_ROUTE } from "../../../modules/program/program.constants";

const PIInfo = ({ order, program, isAuthenticated, toggleFavoriteProgram }) => {
  const programRoute = replaceParams(PROGRAM_ROUTE, {
    ":programId": program.id
  });

  return (
    <div className="pi-info">
      <div className="pi-info__order">{order}</div>
      <Link className="pi-info__image" to={programRoute}>
        <TraderAvatar
          url={program.logo}
          level={program.level}
          isTournament={program.isTournament}
        />
      </Link>
    </div>
  );
};

export default PIInfo;
