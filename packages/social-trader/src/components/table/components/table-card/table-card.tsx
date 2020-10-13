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
import {
  tableCardActionsIconStyle,
  tableCardContainerStyles,
  tableCardTitleStyles,
  tableCardTitleWrapperStyle
} from "components/table/components/table-card/table-card.styles";
import { Text } from "components/text/text";
import { SimpleChartPoint } from "gv-api-web";
import useAnchor, { TAnchor } from "hooks/anchor.hook";
import React from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import { formatValue } from "utils/formatter";
import { $primaryColor } from "utils/style/colors";
import { fontSize, link, width } from "utils/style/mixins";
import {
  $fontSizeCommon,
  $paddingSmall,
  $paddingXxsmall
} from "utils/style/sizes";

export interface IWithOffset {
  withOffset?: boolean;
}

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

const TableCard: React.FC<ITableCardProps & IWithOffset> = props => {
  return (
    <TableCardContainer withOffset={props.withOffset}>
      <TableCardTopBlock {...props} />
      <TableCardChartBlock {...props} />
      {props.children}
    </TableCardContainer>
  );
};

export const TableCardContainer = styled.div<IWithOffset>`
  ${tableCardContainerStyles}
`;

export const TableCardRow = styled.div<{ center?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: flex-start;
`;

export const TableCardTable = styled.div<{ wrap?: boolean }>`
  display: flex;
  justify-content: space-between;
  ${({ wrap }) => wrap && `flex-wrap: wrap;`}
`;

export const TableCardTableRow = styled.div`
  width: 100%;
`;

export const TableCardTableColumn = styled.div`
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    padding-right: ${$paddingXxsmall}px;
  }
`;

export const TableCardTableButtons = styled(Center)`
  justify-content: center;
`;

const StyledTitleLink = styled(Link)`
  ${tableCardTitleStyles}
`;

const StyledTitleDiv = styled.div`
  ${tableCardTitleStyles}
`;

export const TableCardTitle: React.FC<{
  url?: ToType | string;
} & React.HTMLAttributes<HTMLDivElement>> = ({ children, url }) => {
  const title = typeof children === "string" ? children : "";
  return url ? (
    <StyledTitleLink title={`Open ${title} details`} to={url}>
      {children}
    </StyledTitleLink>
  ) : (
    <StyledTitleDiv>{children}</StyledTitleDiv>
  );
};

const SubtitleContainer = styled.div`
  max-width: 130px;
  overflow-wrap: anywhere;
  word-break: break-word;
`;
const NameLink = styled(Link)`
  ${link($primaryColor)};
`;

export const TableCardSubTitle: React.FC<{
  url?: ToType | string;
} & React.HTMLAttributes<HTMLDivElement>> = ({ children, url }) => {
  const title = typeof children === "string" ? children : "";
  return (
    <SubtitleContainer>
      <Text muted>
        {url ? (
          <NameLink title={`Open ${title} user page`} to={url}>
            {children}
          </NameLink>
        ) : (
          children
        )}
      </Text>
    </SubtitleContainer>
  );
};

const BrokerAvatar = styled(ImageBase)`
  ${width(80)}
`;

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
        size="middle"
        tooltip={
          level ? <LevelTooltip level={level} canLevelUp={false} /> : undefined
        }
      />
    ) : (
      <BrokerAvatar src={logo} alt={alt} />
    );
    return (
      <Center>
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

const MainInfo = styled(RowItem)`
  position: relative;
  margin-left: ${$paddingSmall / 4}px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-grow: 1;
`;
const TitleWrapper = styled.div`
  ${tableCardTitleWrapperStyle}
`;
const Actions = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
`;
const ActionsIcon = styled.div`
  ${tableCardActionsIconStyle}
`;

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
        <MainInfo>
          <TitleWrapper>
            <Row>
              <TableCardTitle url={detailsUrl}>{title}</TableCardTitle>
            </Row>
            {subTitle && (
              <TableCardSubTitle url={managerUrl}>{subTitle}</TableCardSubTitle>
            )}
            <Row size={"small"}>{extraBlock}</Row>
          </TitleWrapper>
          {renderActions && (
            <Actions>
              <ActionsIcon>
                <ActionsCircleIcon primary={!!anchor} onClick={setAnchor} />
              </ActionsIcon>
              {renderActions({ clearAnchor, anchor })}
            </Actions>
          )}
        </MainInfo>
      </TableCardRow>
    );
  }
);

const Chart = styled(RowItem)`
  min-width: 60px;
  flex-grow: 1;
`;
const Profit = styled.div`
  margin-bottom: 8px;
  ${fontSize($fontSizeCommon)};
`;

export const TableCardChartBlock: React.FC<ITableCardChartBlockProps> = React.memo(
  ({ chart, assetId, profit }) => (
    <TableCardRow>
      <Chart>
        <ProgramSimpleChart data={chart} />
      </Chart>
      <RowItem>
        <Profit>
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
        </Profit>
      </RowItem>
    </TableCardRow>
  )
);

export default TableCard;
