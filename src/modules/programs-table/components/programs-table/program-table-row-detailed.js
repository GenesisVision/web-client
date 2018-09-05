import { Icon } from "components/icon/icon";
import Surface from "components/surface/surface";
import TableRow from "components/table/table-row";
import { GVButton, GVProgramAvatar } from "gv-react-components";
import FavoriteIcon from "modules/favorite-program/components/favorite-icon/favorite-icon";
import { PROGRAM_DETAILS_ROUTE } from "pages/programs/programs.routes";
import React from "react";
import { Link } from "react-router-dom";
import fileService from "shared/services/file-service";
import replaceParams from "utils/replace-params";

const ProgramTableRowDetailed = ({
  program,
  isAuthenticated,
  toggleFavorite,
  onCollapseClick
}) => {
  const programDetailsUrl = replaceParams(PROGRAM_DETAILS_ROUTE, {
    ":programId": program.id
  });

  return (
    <TableRow>
      <Surface className="program-detailed">
        <div className="program-detailed__info">
          <div className="program-detailed__avatar">
            <GVProgramAvatar
              url={fileService.getFileUrl(program.avatar)}
              level={program.level}
              alt={program.title}
              size="medium"
            />
            <div>
              <div className="program-detailed__title">{program.title}</div>
              <div className="program-detailed__manager">
                {program.manager.username}
              </div>
            </div>
          </div>
          <div className="program-detailed__strategy">Strategy</div>
          <div className="program-detailed__strategy">
            {program.description}
          </div>
        </div>
        <div className="program-detailed__statistic">
          <div className="program-detailed__chart">chart</div>
          <div className="program-detailed__statistic-data">
            <div style={{ padding: "0 1rem" }}>
              <div>Balance</div>
              <div>{program.statistic.balanceInGVT.amount}</div>
            </div>
            <div style={{ padding: "0 1rem" }}>
              <div>Curr.</div>
              <div>{program.currency}</div>
            </div>
            <div style={{ padding: "0 1rem" }}>
              <div>Investors</div>
              <div>{program.statistic.investorsCount}</div>
            </div>
            <div style={{ padding: "0 1rem" }}>
              <div>Av. to Invest</div>
              <div>{program.availableForInvestment}</div>
            </div>
            <div style={{ padding: "0 1rem" }}>
              <div>Trades</div>
              <div>{program.statistic.tradesCount}</div>
            </div>
          </div>
          <Icon
            type="collapse"
            className="program-detailed__collapse"
            onClick={onCollapseClick}
          />
          <GVButton>Invest</GVButton>
          <Link to={programDetailsUrl}>
            <GVButton variant="text" color="secondary">
              Details >
            </GVButton>
          </Link>
          {isAuthenticated &&
            program.personalProgramDetails && (
              <span style={{ float: "right" }}>
                Add to favorites{" "}
                <FavoriteIcon
                  toggleSelected={toggleFavorite}
                  programId={program.id}
                  selected={program.personalProgramDetails.isFavorite}
                />
              </span>
            )}
        </div>
      </Surface>
    </TableRow>
  );
};

export default ProgramTableRowDetailed;
