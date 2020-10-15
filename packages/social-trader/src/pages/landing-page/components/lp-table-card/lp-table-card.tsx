import clsx from "clsx";
import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import { Center } from "components/center/center";
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
import React from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import { formatValue } from "utils/formatter";
import { $labelColor, $primaryColor } from "utils/style/colors";
import {
  mediaBreakpointDesktop,
  mediaBreakpointLargeDesktop,
  mediaBreakpointTablet
} from "utils/style/media";
import { transition } from "utils/style/mixins";

import styles from "./lp-table-card.module.scss";

export interface ITableCardContainer {
  className?: string;
  whiteTheme?: boolean;
}

const LpTableCard: React.FC<ITableCardProps & ITableCardContainer> = props => {
  return (
    <LPTableCardContainer {...props}>
      <LPTableCardTopBlock {...props} />
      <LPTableCardChartBlock {...props} />
      {props.children}
    </LPTableCardContainer>
  );
};

export const LPTableCardContainer: React.FC<ITableCardContainer> = ({
  children,
  whiteTheme,
  className
}) => (
  <div
    className={clsx(styles["lp-table-card"], className, {
      [styles["lp-table-card--white"]]: whiteTheme
    })}
  >
    {children}
  </div>
);

export const LPTableCardRow: React.FC<{
  center?: boolean;
} & React.HTMLAttributes<HTMLDivElement>> = ({ children, center }) => (
  <div
    className={clsx(styles["lp-table-card__row"], {
      [styles["lp-table-card__row--center"]]: center
    })}
  >
    {children}
  </div>
);

export const LPTableCardTable: React.FC<{
  wrap?: boolean;
} & React.HTMLAttributes<HTMLDivElement>> = ({ children, wrap }) => (
  <div
    className={clsx(styles["lp-table-card__table"], {
      [styles["lp-table-card__table--flex-wrap"]]: wrap
    })}
  >
    {children}
  </div>
);

export const LPTableCardTableColumn: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => (
  <div className={styles["lp-table-card__table-column"]}>{children}</div>
);

export const LPTableCardTitle: React.FC<{
  url?: ToType | string;
} & React.HTMLAttributes<HTMLDivElement>> = ({ children, url }) => {
  const title = typeof children === "string" ? children : "";
  return url ? (
    <Link
      white
      title={`Open ${title} details`}
      className={styles["lp-table-card__title"]}
      to={url}
    >
      {children}
    </Link>
  ) : (
    <div className={styles["lp-table-card__title"]}>{children}</div>
  );
};

const StyledText = styled(Text)`
  ${transition("color", "opacity")};
  color: ${$labelColor};
  font-size: 10px;

  &:hover {
    color: ${$primaryColor};
    opacity: 0.4;
  }
  ${mediaBreakpointTablet(`font-size: 14px;`)};
  ${mediaBreakpointDesktop(`font-size: 15px;`)};
  ${mediaBreakpointLargeDesktop(`font-size: 16px;`)};
`;

export const LPTableCardSubTitle: React.FC<{
  url?: ToType | string;
} & React.HTMLAttributes<HTMLDivElement>> = ({ children, url }) => {
  const title = typeof children === "string" ? children : "";
  return (
    <div className={styles["lp-table-card__subtitle"]}>
      {url ? (
        <Link title={`Open ${title} user page`} to={url}>
          <StyledText muted>{children}</StyledText>
        </Link>
      ) : (
        <StyledText muted>{children}</StyledText>
      )}
    </div>
  );
};

export const LPTableCardAvatar: React.FC<ITableCardAvatarProps> = React.memo(
  ({ logo, url, levelProgress, level, alt, color, contentCenter }) => {
    const Avatar = (
      <AssetAvatar
        levelColor={"#100c31"}
        url={logo}
        levelProgress={levelProgress}
        level={level}
        alt={alt || ""}
        color={color}
        size="middle"
        tooltip={
          level ? <LevelTooltip level={level} canLevelUp={false} /> : undefined
        }
      />
    );
    return (
      <Center
        className={clsx(styles["lp-table-card__avatar"], {
          [styles["lp-table-card__avatar--center"]]: contentCenter
        })}
      >
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

export const LPTableCardTopBlock: React.FC<ITableCardTopBlockProps> = React.memo(
  ({
    level,
    levelProgress,
    logo,
    managerUrl,
    detailsUrl,
    extraBlock,
    title,
    subTitle,
    color
  }) => {
    return (
      <LPTableCardRow>
        <RowItem>
          <LPTableCardAvatar
            logo={logo}
            alt={title}
            color={color}
            level={level}
            levelProgress={levelProgress}
            url={detailsUrl}
          />
        </RowItem>
        <RowItem className={styles["lp-table-card__main-info"]}>
          <div className={styles["lp-table-card__title-wrapper"]}>
            <Row>
              <LPTableCardTitle url={detailsUrl}>{title}</LPTableCardTitle>
            </Row>
            {subTitle && (
              <LPTableCardSubTitle url={managerUrl}>
                {subTitle}
              </LPTableCardSubTitle>
            )}
            <Row size={"small"}>{extraBlock}</Row>
          </div>
        </RowItem>
      </LPTableCardRow>
    );
  }
);

export const LPTableCardChartBlock: React.FC<ITableCardChartBlockProps> = React.memo(
  ({ chart, profit }) => (
    <LPTableCardRow>
      <RowItem className={styles["lp-table-card__chart"]}>
        <ProgramSimpleChart data={chart} />
      </RowItem>
      <RowItem className={styles["lp-table-card__chart-info"]}>
        <div className={styles["lp-table-card__profit"]}>
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
    </LPTableCardRow>
  )
);

interface ITableCardAvatarProps {
  url?: ToType | string;
  logo: string;
  levelProgress?: number;
  level?: number;
  alt?: string;
  color?: string;
  contentCenter?: boolean;
}

interface ITableCardChartBlockProps {
  chart: SimpleChartPoint[];
  assetId: string;
  profit: number;
}

interface ITableCardTopBlockProps {
  level?: number;
  levelProgress?: number;
  logo: string;
  subTitle?: string;
  title?: string;
  color?: string;
  extraBlock?: JSX.Element;
  managerUrl?: ToType | string;
  detailsUrl?: ToType | string;
}

interface ITableCardProps
  extends ITableCardTopBlockProps,
    ITableCardChartBlockProps,
    React.HTMLAttributes<HTMLDivElement> {}

export default LpTableCard;
