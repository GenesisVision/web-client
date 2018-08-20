import FavoriteIcon from "components/favorite-icon/favorite-icon";
import { Icon } from "components/icon/icon";
import Surface from "components/surface/surface";
import TableRow from "components/table/table-row";
import { GVButton, GVProgramAvatar } from "gv-react-components";
import React from "react";
import gvLogo from "shared/media/logo.svg";
import fileService from "shared/services/file-service";

const ProgramTableRowDetailed = ({ program, onCollapseClick }) => {
  return (
    <TableRow>
      <Surface className="program-detailed">
        <div className="program-detailed__info">
          <div className="program-detailed__avatar">
            <GVProgramAvatar
              url={fileService.getFileUrl(program.avatar)}
              level={program.level}
              alt={program.title}
              errorImage={gvLogo}
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
          <GVButton variant="text" color="secondary">
            Details >
          </GVButton>
          <span style={{ float: "right" }}>
            Add to favorites <FavoriteIcon selected />
          </span>
        </div>
      </Surface>
    </TableRow>
  );
};

export default ProgramTableRowDetailed;
