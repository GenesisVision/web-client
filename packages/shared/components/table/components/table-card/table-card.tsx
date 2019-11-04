import "./table-card.scss";

import classNames from "classnames";
import { ChartSimple } from "gv-api-web";
import React from "react";
import NumberFormat from "react-number-format";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Link from "shared/components/link/link";
import Profitability from "shared/components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "shared/components/profitability/profitability.helper";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import useAnchor, { TAnchor, TEvent } from "shared/hooks/anchor.hook";
import LevelTooltip from "shared/level-tooltip/level-tooltip";
import { MANAGER_DETAILS_FOLDER_ROUTE } from "shared/routes/manager.routes";
import { composeManagerDetailsUrl } from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

const _TableCard: React.FC<ITableCardProps> = props => {
  return (
    <TableCardContainer>
      <TableCardTopBlock {...props} />
      <TableCardChartBlock
        {...props}
        assetId={props.asset.id}
        chart={props.asset.chart}
        profit={props.asset.statistic.profitValue}
        profitPercent={props.asset.statistic.profitPercent}
      />
      {props.children}
    </TableCardContainer>
  );
};

export const TableCardContainer: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = React.memo(({ children }) => <div className="table-card">{children}</div>);

export const TableCardRow: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = React.memo(({ children }) => (
  <div className="table-card__row">{children}</div>
));

export const TableCardTable: React.FC<
  { wrap?: boolean } & React.HTMLAttributes<HTMLDivElement>
> = React.memo(({ children, wrap }) => (
  <div
    className={classNames("table-card__table", {
      "table-card__table--flex-wrap": wrap
    })}
  >
    {children}
  </div>
));

export const TableCardTableRow: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = React.memo(({ children }) => (
  <div className="table-card__table-row">{children}</div>
));

export const TableCardTableColumn: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = React.memo(({ children }) => (
  <div className="table-card__table-column">{children}</div>
));

export const TableCardTopBlock: React.FC<ITableCardTopBlockProps> = React.memo(
  ({ detailsUrl, asset, pathTitle, renderActions, extraBlock }) => {
    const { anchor, setAnchor, clearAnchor } = useAnchor();
    return (
      <TableCardRow>
        <div className="table-card__avatar">
          <Link to={detailsUrl}>
            <AssetAvatar
              url={asset.logo}
              levelProgress={asset.levelProgress}
              level={asset.level}
              alt={asset.title}
              color={asset.color}
              size="medium"
              tooltip={
                (!!asset.level && (
                  <LevelTooltip level={asset.level} canLevelUp={false} />
                )) ||
                undefined
              }
            />
          </Link>
        </div>
        <div className="table-card__main-info">
          <div className="table-card__title-wrapper">
            <Link className="table-card__title" to={detailsUrl}>
              {asset.title}
            </Link>
            <Link
              className="table-card__name"
              to={{
                as: composeManagerDetailsUrl(asset.manager.url),
                pathname: MANAGER_DETAILS_FOLDER_ROUTE,
                state: `/ ${pathTitle}`
              }}
            >
              {asset.manager.username}
            </Link>
          </div>
          {renderActions && (
            <div className="table-card__actions">
              <ActionsCircleIcon primary={!!anchor} onClick={setAnchor} />
              {renderActions({ clearAnchor, anchor })}
            </div>
          )}
          {extraBlock}
        </div>
      </TableCardRow>
    );
  }
);

export const TableCardChartBlock: React.FC<
  ITableCardChartBlockProps
> = React.memo(({ chart, assetId, profitPercent, profit }) => (
  <TableCardRow>
    <div className="table-card__chart">
      <ProgramSimpleChart data={chart} programId={assetId} />
    </div>
    <div className="table-card__chart-info">
      <div className="table-card__profit">
        <Profitability
          value={formatValue(profitPercent, 2)}
          variant={PROFITABILITY_VARIANT.CHIPS}
          prefix={PROFITABILITY_PREFIX.ARROW}
        >
          <NumberFormat
            value={formatValue(profitPercent, 2)}
            suffix="%"
            allowNegative={false}
            displayType="text"
          />
        </Profitability>
      </div>
      {profit && (
        <div className="table-card__profit-value">
          <NumberFormat
            value={formatValue(profit, 2)}
            suffix=" GVT"
            allowNegative={false}
            displayType="text"
          />
        </div>
      )}
    </div>
  </TableCardRow>
));

interface ITableCardChartBlockProps {
  chart: ChartSimple[];
  assetId: string;
  profitPercent: number;
  profit: number;
}

interface ITableCardTopBlockProps {
  extraBlock?: JSX.Element;
  pathTitle?: string;
  detailsUrl: {
    pathname: string;
    state: string;
  };
  asset: any;
  renderActions?: (props: {
    clearAnchor: (event: TEvent) => void;
    anchor: TAnchor;
  }) => JSX.Element;
}

interface ITableCardProps
  extends ITableCardTopBlockProps,
    React.HTMLAttributes<HTMLDivElement> {
  profit?: number;
  profitPercent: number;
}

const TableCard = React.memo(_TableCard);
export default TableCard;
