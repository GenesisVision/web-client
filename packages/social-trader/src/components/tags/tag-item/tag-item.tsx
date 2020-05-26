import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { Tag } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import TagBubble from "./tag-bubble";

const _TagItem: React.FC<Props> = ({ color, name, clickable }) => {
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
      <div>
        <TagBubble color={color} content={name} clickable={clickable} />
      </div>
    </Tooltip>
  );
};

interface Props extends Tag {
  clickable?: boolean;
}

const TagItem = React.memo(_TagItem);
export default TagItem;
