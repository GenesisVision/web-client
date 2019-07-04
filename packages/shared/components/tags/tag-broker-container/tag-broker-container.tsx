import "./tag-broker-container.scss";

import { ProgramTag } from "gv-api-web";
import * as React from "react";
import { PROFITABILITY_VARIANT } from "shared/components/profitability/profitability.helper";
import Tooltip from "shared/components/tooltip/tooltip";
import TagItem from "../tag-item/tag-item";
import TagItemTooltip from "../tag-item/tag-item-tooltip";
import Profitability from "shared/components/profitability/profitability";
import withLoader, { WithLoaderProps } from "../../../decorators/with-loader";

const MAX_VISIBLE_TAGS = 1;
const COLOR_TAGS = "#ffffff";

const _TagBrokerContainer: React.FC<Props & WithLoaderProps> = ({ tags }) => {
  const length = tags.length;
  const reminder = length > MAX_VISIBLE_TAGS ? `${length - 1}` : null;
  return (
    <div className="tag-broker-container">
      {tags.map(
        (tag, idx) =>
          ((reminder && idx === 0) || !reminder) && (
            <TagItem name={tag.name} color={COLOR_TAGS} key={idx} />
          )
      )}
      {reminder && (
        <Tooltip
          render={() => (
            <TagItemTooltip
              tags={tags}
              color={COLOR_TAGS}
              className="tag-broker-container__tooltip"
            />
          )}
        >
          <div className="tag-broker-container__others">...</div>
        </Tooltip>
      )}
    </div>
  );
};

interface Props {
  tags: ProgramTag[];
}

const TagBrokerContainer = React.memo(withLoader(_TagBrokerContainer));

export default TagBrokerContainer;
