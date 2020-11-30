import { Row } from "components/row/row";
import { FundAssetPartWithIcon } from "gv-api-web";
import * as React from "react";
import styled from "styled-components";
import { fontSize } from "utils/style/mixins";
import { $fontSizeSmallMobile } from "utils/style/sizes";

interface IRatioFieldProps {
  handleHover?: (
    asset: string
  ) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  item: FundAssetPartWithIcon;
  handleLeave?: () => void;
  newLevel: number;
  ZIndex: number;
}

interface Props {
  showBounds?: boolean;
  values: FundAssetPartWithIcon[];
  handleHover?: (
    asset: string
  ) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleLeave?: () => void;
}

const Line = styled.div`
  display: block;
  position: relative;
  height: 2px;
  background-color: #2a353f;
  width: 100%;
`;

const Values = styled(Row)`
  justify-content: space-between;
`;

const Value = styled.div<{ full?: boolean }>`
  ${fontSize($fontSizeSmallMobile)};
  opacity: ${({ full }) => (full ? 1 : 0.4)};
`;

const _FundAssetRatio: React.FC<Props> = ({
  showBounds = true,
  values,
  handleHover,
  handleLeave
}) => {
  let ZIndex = values.length;
  let newLevel = 0;
  return (
    <>
      <Line>
        {values.map((item: FundAssetPartWithIcon) => {
          newLevel += item.percent;
          ZIndex--;
          return (
            <RatioField
              key={item.name}
              handleHover={handleHover}
              handleLeave={handleLeave}
              item={item}
              newLevel={newLevel}
              ZIndex={ZIndex}
            />
          );
        })}
      </Line>
      {showBounds && (
        <Values size={"small"}>
          <Value>0%</Value>
          <Value
            full={
              values.reduce(
                (sum: number, item: FundAssetPartWithIcon): number =>
                  sum + item.percent,
                0
              ) === 100
            }
          >
            100%
          </Value>
        </Values>
      )}
    </>
  );
};

const ItemLine = styled.div<{
  width: number;
  background: string;
  zIndex: number;
}>`
  height: 3px;
  position: absolute;
  width: ${({ width }) => width}%;
  background: ${({ background }) => background};
  z-index: ${({ zIndex }) => zIndex};
`;

const RatioField: React.FC<IRatioFieldProps> = React.memo(
  ({ handleHover, item, handleLeave, newLevel, ZIndex }) => (
    <ItemLine
      width={newLevel}
      background={item.color}
      zIndex={ZIndex}
      onMouseOver={handleHover && handleHover(item.asset)}
      onMouseLeave={handleLeave && handleLeave}
    />
  )
);

const FundAssetRatio = React.memo(_FundAssetRatio);
export default FundAssetRatio;
