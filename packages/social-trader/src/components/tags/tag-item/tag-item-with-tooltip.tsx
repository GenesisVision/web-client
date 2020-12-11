import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import TagItem, { TagItemProps } from "components/tags/tag-item/tag-item";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
`;

const _TagItemWithTooltip: React.FC<TagItemProps> = ({
  color,
  name,
  clickable
}) => {
  const [t] = useTranslation();
  return (
    <Tooltip
      horizontal={HORIZONTAL_POPOVER_POS.LEFT}
      render={() => (
        <TooltipContent>
          {t(`filters.tag.${name.toLowerCase()}`)}
        </TooltipContent>
      )}
    >
      <ContentContainer>
        <TagItem name={name} color={color} clickable={clickable} />
      </ContentContainer>
    </Tooltip>
  );
};

const TagItemWithTooltip = React.memo(_TagItemWithTooltip);
export default TagItemWithTooltip;
