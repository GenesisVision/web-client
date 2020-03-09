import "./table-card.scss";

import classNames from "classnames";
import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import ImageBase from "components/avatar/image-base";
import { ActionsCircleIcon } from "components/icon/actions-circle-icon";
import LevelTooltip from "components/level-tooltip/level-tooltip";
import Link, { ToType } from "components/link/link";
import { MutedText } from "components/muted-text/muted-text";
import Profitability from "components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "components/profitability/profitability.helper";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { Row } from "components/row/row";
import { SimpleChartPoint } from "gv-api-web";
import useAnchor, { TAnchor } from "hooks/anchor.hook";
import React from "react";
import NumberFormat from "react-number-format";
import { formatValue } from "utils/formatter";

const TableCard: React.FC<ITableCardProps> = props => {
  return (
    <TableCardContainer>
      <TableCardTopBlock {...props} />
      <TableCardChartBlock {...props} />
      {props.children}
    </TableCardContainer>
  );
};

export const TableCardContainer: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => <div className="table-card">{children}</div>;

export const TableCardRow: React.FC<{ center?: boolean } & React.HTMLAttributes<
  HTMLDivElement
>> = ({ children, center }) => (
  <div
    className={classNames("table-card__row", {
      "table-card__row--center": center
    })}
  >
    {children}
  </div>
);

export const TableCardTable: React.FC<{ wrap?: boolean } & React.HTMLAttributes<
  HTMLDivElement
>> = ({ children, wrap }) => (
  <div
    className={classNames("table-card__table", {
      "table-card__table--flex-wrap": wrap
    })}
  >
    {children}
  </div>
);

export const TableCardTableRow: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => <div className="table-card__table-row">{children}</div>;

export const TableCardTableColumn: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => (
  <div className="table-card__table-column">{children}</div>
);

export const TableCardTableButtons: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => <div className="table-card__buttons">{children}</div>;

export const TableCardTitle: React.FC<{
  url?: ToType | string;
} & React.HTMLAttributes<HTMLDivElement>> = ({ children, url }) => {
  const title = typeof children === "string" ? children : "";
  return url ? (
    <Link
      title={`Open ${title} details`}
      className="table-card__title"
      to={url}
    >
      {children}
    </Link>
  ) : (
    <div className="table-card__title">{children}</div>
  );
};

export const TableCardSubTitle: React.FC<{
  url?: ToType | string;
} & React.HTMLAttributes<HTMLDivElement>> = ({ children, url }) => {
  const title = typeof children === "string" ? children : "";
  return (
    <Row middle={false} className="table-card__subtitle">
      <MutedText noWrap={false}>
        {url ? (
          <Link
            title={`Open ${title} user page`}
            className=" table-card__name"
            to={url}
          >
            {children}
          </Link>
        ) : (
          children
        )}
      </MutedText>
    </Row>
  );
};

export const TableCardAvatar: React.FC<ITableCardAvatarProps> = React.memo(
  ({ logo, hasAvatar, url, levelProgress, level, alt, color }) => {
    const Avatar = hasAvatar ? (
      <AssetAvatar
        url={logo}
        levelProgress={levelProgress}
        level={level}
        alt={alt || ""}
        color={color}
        size="medium"
        tooltip={
          level ? <LevelTooltip level={level} canLevelUp={false} /> : undefined
        }
      />
    ) : (
      <ImageBase className="table-card__broker-avatar" src={logo} alt={alt} />
    );
    return (
      <div className="table-card__avatar">
        {url ? (
          <Link title={`Open ${alt} details`} to={url}>
            {Avatar}
          </Link>
        ) : (
          Avatar
        )}
      </div>
    );
  }
);

export const TableCardTopBlock: React.FC<ITableCardTopBlockProps> = React.memo(
  ({
    level,
    levelProgress,
    hasAvatar,
    logo,
    managerUrl,
    detailsUrl,
    renderActions,
    extraBlock,
    title,
    subTitle,
    color
  }) => {
    const { anchor, setAnchor, clearAnchor } = useAnchor();
    return (
      <TableCardRow>
        <TableCardAvatar
          logo={logo}
          hasAvatar={hasAvatar}
          alt={title}
          color={color}
          level={level}
          levelProgress={levelProgress}
          url={detailsUrl}
        />
        <div className="table-card__main-info">
          <div className="table-card__title-wrapper">
            <Row>
              <TableCardTitle url={detailsUrl}>{title}</TableCardTitle>
            </Row>
            {subTitle && (
              <TableCardSubTitle url={managerUrl}>{subTitle}</TableCardSubTitle>
            )}
            <Row small>{extraBlock}</Row>{" "}
          </div>
          {renderActions && (
            <div className="table-card__actions">
              <ActionsCircleIcon primary={!!anchor} onClick={setAnchor} />
              {renderActions({ clearAnchor, anchor })}
            </div>
          )}
        </div>
      </TableCardRow>
    );
  }
);

export const TableCardChartBlock: React.FC<ITableCardChartBlockProps> = React.memo(
  ({ chart, assetId, profit }) => (
    <TableCardRow>
      <div className="table-card__chart">
        <ProgramSimpleChart data={chart} />
      </div>
      <div className="table-card__chart-info">
        <div className="table-card__profit">
          {profit !== undefined && (
            <Profitability
              value={formatValue(profit, 2)}
              variant={PROFITABILITY_VARIANT.CHIPS}
              prefix={PROFITABILITY_PREFIX.ARROW}
            >
              <NumberFormat
                value={formatValue(profit, 2)}
                suffix="%"
                allowNegative={false}
                displayType="text"
              />
            </Profitability>
          )}
        </div>
      </div>
    </TableCardRow>
  )
);

interface ITableCardAvatarProps {
  url?: ToType | string;
  hasAvatar?: boolean;
  logo: string;
  levelProgress?: number;
  level?: number;
  alt?: string;
  color?: string;
}

interface ITableCardChartBlockProps {
  chart: SimpleChartPoint[];
  assetId: string;
  profit: number;
}

interface ITableCardTopBlockProps {
  level?: number;
  levelProgress?: number;
  hasAvatar?: boolean;
  logo: string;
  subTitle?: string;
  title?: string;
  color?: string;
  extraBlock?: JSX.Element;
  managerUrl?: ToType | string;
  detailsUrl?: ToType | string;
  renderActions?: (props: {
    clearAnchor: VoidFunction;
    anchor: TAnchor;
  }) => JSX.Element;
}

interface ITableCardProps
  extends ITableCardTopBlockProps,
    ITableCardChartBlockProps,
    React.HTMLAttributes<HTMLDivElement> {}

export default TableCard;
