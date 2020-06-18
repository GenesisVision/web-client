import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _TagItemWrapperTooltip: React.FC<Props> = ({ children, name }) => {
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
      <div>{children}</div>
    </Tooltip>
  );
};

interface Props {
  children: JSX.Element;
  name: string;
}

const TagItemWrapperTooltip = React.memo(_TagItemWrapperTooltip);
export default TagItemWrapperTooltip;
