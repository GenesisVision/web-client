import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { RowItem } from "components/row-item/row-item";
import React from "react";
import styled from "styled-components";
import { fontSize } from "utils/style/mixins";
import { $fontSizeParagraph } from "utils/style/sizes";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { TooltipContent } from "components/tooltip/tooltip-content";
import Tooltip from "components/tooltip/tooltip";

const StyledLink = styled(Link)`
  ${fontSize($fontSizeParagraph)};
  font-weight: 600;
`;

interface Props {
  text: string;
  tooltipContent: string | JSX.Element;
  route: string;
}

export const ToolbarButton: React.FC<Props> = React.memo(({ text, tooltipContent, route }) => {
  const { linkCreator } = useToLink();
  return (
    <RowItem>
      <Tooltip
        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
        render={() => (
          <TooltipContent>
            {tooltipContent}
          </TooltipContent>
        )}
      >
        <StyledLink to={linkCreator(route, route)}>{text}</StyledLink>
      </Tooltip>
    </RowItem>
  );
});
