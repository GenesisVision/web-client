import { OrderSignalProgramInfo } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import GVButton from "shared/components/gv-button";
import Link from "shared/components/link/link";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";

const _TradeHistorySubRow: React.FC<Props> = ({ provider, symbol, title }) => {
  const { program } = provider;
  return (
    <TableRow>
      <TableCell className="details-trades__cell">
        <div className="dashboard-programs__cell--avatar-title">
          <Link
            to={{
              pathname: composeProgramDetailsUrl(program.url),
              state: `/ ${title}`
            }}
          >
            <AssetAvatar
              url={program.logo}
              alt={program.title}
              color={program.color}
              level={program.level}
              levelProgress={program.levelProgress}
            />
          </Link>
          <Link
            to={{
              pathname: composeProgramDetailsUrl(program.url),
              state: `/ ${title}`
            }}
          >
            <GVButton variant={"text"} color={"secondary"}>
              {program.title}
            </GVButton>
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
};

const TradeHistorySubRow = compose<React.FC<OwnProps>>(
  translate(),
  React.memo
)(_TradeHistorySubRow);
export default TradeHistorySubRow;

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  title: string;
  provider: OrderSignalProgramInfo;
  symbol: string;
}
