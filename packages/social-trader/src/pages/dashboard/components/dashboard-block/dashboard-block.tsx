import { DefaultTableBlock } from "components/default.block/default-table.block";
import DetailsBlockTitleBox from "components/details/details-block-title-box";
import Link from "components/link/link";
import React from "react";
import styled from "styled-components";
import { $textLightColor } from "utils/style/colors";
import {
  mediaBreakpointLandscapeTablet,
  mediaBreakpointTablet
} from "utils/style/media";
import { adaptiveMargin } from "utils/style/mixins";
import { $fontSizeH1, $fontSizeH2, $paddingXsmall } from "utils/style/sizes";

export type DashboardBlockOrientation = "landscapeTablet" | "tablet";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: DashboardBlockOrientation;
  label?: string;
  all?: string;
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  ${adaptiveMargin("bottom", $paddingXsmall)};
`;

const StyledLink = styled(Link)`
  color: ${$textLightColor};
  display: inline-block;
  text-align: center;
  font-size: ${$fontSizeH1}px;
  line-height: ${$fontSizeH2}px;
  width: ${$fontSizeH2}px;
`;

const Container = styled.div<{ orientation?: DashboardBlockOrientation }>`
  margin-bottom: ${$paddingXsmall}px;
  &:not(:last-child) {
    ${({ orientation }) => {
      switch (orientation) {
        case "tablet":
          return mediaBreakpointTablet(`margin-right: ${$paddingXsmall}px;`);
        case "landscapeTablet":
          return mediaBreakpointLandscapeTablet(
            `margin-right: ${$paddingXsmall}px;`
          );
      }
    }};
  }
`;

const DashboardBlock: React.FC<Props> = ({
  orientation,
  label,
  all,
  children
}) => {
  return (
    <Container orientation={orientation}>
      <DefaultTableBlock table tall>
        {(label || all) && (
          <DetailsBlockTitleBox>
            <Header>
              {label && <h3>{label}</h3>}
              {all && (
                <div>
                  <StyledLink noColor to={all}>
                    &rsaquo;
                  </StyledLink>
                </div>
              )}
            </Header>
          </DetailsBlockTitleBox>
        )}
        {children}
      </DefaultTableBlock>
    </Container>
  );
};

export default DashboardBlock;
