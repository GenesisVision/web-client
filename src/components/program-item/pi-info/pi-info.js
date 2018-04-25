import { Link } from "react-router-dom";
import React from "react";

import DaysLeftWidget from "../../days-left-widget/days-left-widget";
import replaceParams from "../../../utils/replace-params";
import TokensWidget from "../../tokens-widget/tokens-widget";
import TraderAvatar from "../../program-avatar/program-avatar";
import PIBookmark from "../pi-bookmark/pi-bookmark";

import "./pi-info.css";
import { PROGRAM_ROUTE } from "../../../modules/program/program.constants";

const PIInfo = ({
  order,
  program,
  showTokensWidget,
  isAuthenticated,
  addFavoriteProgram,
  removeFavoriteProgram
}) => {
  const renderDaysLeft = () => {
    if (program.isEnabled) {
      return (
        <DaysLeftWidget
          start={program.startOfPeriod}
          duration={program.periodDuration}
        />
      );
    }

    return <div>The program is not enabled</div>;
  };

  const renderTokens = () => {
    if (program.isEnabled) {
      return (
        <TokensWidget
          id={program.id}
          invested={program.freeTokens.investorsTokens}
          requested={program.freeTokens.requestsTokens}
          total={program.freeTokens.total}
        />
      );
    }

    return null;
  };

  const toggleFavorite = () => {
    const { id, isFavorite } = program;
    isFavorite ? removeFavoriteProgram(id) : addFavoriteProgram(id);
  };

  const programRoute = replaceParams(PROGRAM_ROUTE, {
    ":programId": program.id
  });
  return (
    <div className="pi-info">
      <div className="pi-info__order">{order}</div>
      <Link className="pi-info__image" to={programRoute}>
        <TraderAvatar imgUrl={program.logo} level={program.level} />
      </Link>
      <div className="pi-info__name pi-name">
        <div className="pi-name__title">
          <Link to={programRoute}>{program.title}</Link>
          {isAuthenticated && (
            <PIBookmark
              isFavorite={program.isFavorite}
              onClick={toggleFavorite}
            />
          )}
        </div>
        <div className="pi-name__description">{program.description}</div>
        <div className="pi-name__eop">{renderDaysLeft()}</div>
        {showTokensWidget && (
          <div className="pi-name__eop">{renderTokens()}</div>
        )}
      </div>
    </div>
  );
};

export default PIInfo;
