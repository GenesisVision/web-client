import classNames from "classnames";
import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import ImageBase from "components/avatar/image-base";
import { Center } from "components/center/center";
import { ActionsCircleIcon } from "components/icon/actions-circle-icon";
import LevelTooltip from "components/level-tooltip/level-tooltip";
import Link, { ToType } from "components/link/link";
import Profitability from "components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "components/profitability/profitability.helper";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { SimpleChartPoint } from "gv-api-web";
import useAnchor, { TAnchor } from "hooks/anchor.hook";
import React from "react";
import NumberFormat from "react-number-format";
import { formatValue } from "utils/formatter";

import styles from "./table-card.module.scss";

export interface IWithOffset {
  withOffset?: boolean;
}

const TableCard: React.FC<ITableCardProps & IWithOffset> = props => {
  return (
    <TableCardContainer withOffset={props.withOffset}>
      <TableCardTopBlock {...props} />
      <TableCardChartBlock {...props} />
      {props.children}
    </TableCardContainer>
  );
};

export const TableCardContainer: React.FC<React.HTMLAttributes<HTMLDivElement> &
  IWithOffset> = ({ withOffset = true, children }) => (
  <div
    className={classNames(styles["table-card"], {
      [styles["table-card--with-offset"]]: withOffset
    })}
  >
    {children}
  </div>
);

export const TableCardRow: React.FC<{ center?: boolean } & React.HTMLAttributes<
  HTMLDivElement
>> = ({ children, center }) => (
  <div
    className={classNames(styles["table-card__row"], {
      [styles["table-card__row--center"]]: center
    })}
  >
    {children}
  </div>
);

export const TableCardTable: React.FC<{ wrap?: boolean } & React.HTMLAttributes<
  HTMLDivElement
>> = ({ children, wrap }) => (
  <div
    className={classNames(styles["table-card__table"], {
      [styles["table-card__table--flex-wrap"]]: wrap
    })}
  >
    {children}
  </div>
);

export const TableCardTableRow: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => (
  <div className={styles["table-card__table-row"]}>{children}</div>
);

export const TableCardTableColumn: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => (
  <div className={styles["table-card__table-column"]}>{children}</div>
);

export const TableCardTableButtons: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => (
  <Center className={styles["table-card__buttons"]}>{children}</Center>
);

export const TableCardTitle: React.FC<{
  url?: ToType | string;
} & React.HTMLAttributes<HTMLDivElement>> = ({ children, url }) => {
  const title = typeof children === "string" ? children : "";
  return url ? (
    <Link
      title={`Open ${title} details`}
      className={styles["table-card__title"]}
      to={url}
    >
      {children}
    </Link>
  ) : (
    <div className={styles["table-card__title"]}>{children}</div>
  );
};

export const TableCardSubTitle: React.FC<{
  url?: ToType | string;
} & React.HTMLAttributes<HTMLDivElement>> = ({ children, url }) => {
  const title = typeof children === "string" ? children : "";
  return (
    <div className={styles["table-card__subtitle"]}>
      <Text muted>
        {url ? (
          <Link
            title={`Open ${title} user page`}
            className={styles["table-card__name"]}
            to={url}
          >
            {children}
          </Link>
        ) : (
          children
        )}
      </Text>
    </div>
  );
};

export const TableCardAvatar: React.FC<ITableCardAvatarProps> = React.memo(
  ({ logo, hasAvatar, url, levelProgress, level, alt, color }) => {
    const Avatar = hasAvatar ? (
      <AssetAvatar
        levelColor={"#212c34"}
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
      <ImageBase
        className={styles["table-card__broker-avatar"]}
        src={logo}
        alt={alt}
      />
    );
    return (
      <Center className={styles["table-card__avatar"]}>
        {url ? (
          <Link title={`Open ${alt} details`} to={url}>
            {Avatar}
          </Link>
        ) : (
          Avatar
        )}
      </Center>
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
        <RowItem>
          <TableCardAvatar
            logo={logo}
            hasAvatar={hasAvatar}
            alt={title}
            color={color}
            level={level}
            levelProgress={levelProgress}
            url={detailsUrl}
          />
        </RowItem>
        <RowItem className={styles["table-card__main-info"]}>
          <div className={styles["table-card__title-wrapper"]}>
            <Row>
              <TableCardTitle url={detailsUrl}>{title}</TableCardTitle>
            </Row>
            {subTitle && (
              <TableCardSubTitle url={managerUrl}>{subTitle}</TableCardSubTitle>
            )}
            <Row size={"small"}>{extraBlock}</Row>
          </div>
          {renderActions && (
            <div className={styles["table-card__actions"]}>
              <div className={styles["table-card__actions-icon"]}>
                <ActionsCircleIcon primary={!!anchor} onClick={setAnchor} />
              </div>
              {renderActions({ clearAnchor, anchor })}
            </div>
          )}
        </RowItem>
      </TableCardRow>
    );
  }
);

export const TableCardChartBlock: React.FC<ITableCardChartBlockProps> = React.memo(
  ({ chart, assetId, profit }) => (
    <TableCardRow>
      <RowItem className={styles["table-card__chart"]}>
        <ProgramSimpleChart data={chart} />
      </RowItem>
      <RowItem className={styles["table-card__chart-info"]}>
        <div className={styles["table-card__profit"]}>
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
      </RowItem>
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
