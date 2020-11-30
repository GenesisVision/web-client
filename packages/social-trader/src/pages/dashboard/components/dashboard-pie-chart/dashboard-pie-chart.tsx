import { detailsBlockHorizontalPaddings } from "components/details/details.constants";
import MultiPieContainer from "components/pie-container/multi-pie.container";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { withBlurLoader } from "decorators/with-blur-loader";
import React, { useState } from "react";
import styled from "styled-components";
import { mediaBreakpointLandscapeTablet } from "utils/style/media";
import { fontSize, height, transition, width } from "utils/style/mixins";
import { $fontSizeParagraph, $paddingBig } from "utils/style/sizes";

interface Props {
  data: any[];
}

const Container = styled.div`
  ${detailsBlockHorizontalPaddings};
  display: flex;
`;

const ChartContainer = styled.div`
  box-sizing: border-box;
  ${width(140)};
  ${height(140)};
  margin: 0 ${$paddingBig}px 0 0;
  ${mediaBreakpointLandscapeTablet(`margin: 0 ${$paddingBig}px;`)}
`;

const NameContainer = styled(Row)`
  cursor: pointer;
`;

const Name = styled.div<{ selected?: boolean }>`
  opacity: ${({ selected }) => (selected ? 1 : 0.8)};
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  letter-spacing: 0.47px;
  ${fontSize($fontSizeParagraph)};
  ${transition("opacity")};
`;

const Bullet = styled.div<{ selected?: boolean; background: string }>`
  border-radius: 50%;
  width: ${({ selected }) => (selected ? "16px" : "8px")};
  height: ${({ selected }) => (selected ? "16px" : "8px")};
  min-width: ${({ selected }) => (selected ? "16px" : "8px")};
  background: ${({ background }) => background};
  ${transition("width", "height", "min-width")};
`;

const _DashboardPieChart: React.FC<Props> = ({ data }) => {
  const [overItem, setOverItem] = useState<string>();
  return (
    <Container>
      <ChartContainer>
        <MultiPieContainer
          setOverItem={setOverItem}
          over={overItem}
          data={data.map(item => ({ ...item, value: item.percent }))}
        />
      </ChartContainer>
      <div>
        {data.map(({ name, color, percent }) => (
          <NameContainer
            onMouseEnter={() => setOverItem(name)}
            onMouseLeave={() => setOverItem(undefined)}
          >
            <RowItem>
              <Bullet selected={name === overItem} background={color} />
            </RowItem>
            <Name selected={name === overItem}>
              {name} - {percent} %
            </Name>
          </NameContainer>
        ))}
      </div>
    </Container>
  );
};

const DashboardPieChart = withBlurLoader(React.memo(_DashboardPieChart));
export default DashboardPieChart;
