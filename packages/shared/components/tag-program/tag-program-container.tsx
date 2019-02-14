import "./tag-program-container.scss";

import { ProgramTag } from "gv-api-web";
import * as React from "react";
import Tooltip from "shared/components/tooltip/tooltip";

import Profitability from "../profitability/profitability";
import TagProgramItem from "./tag-program-item";
import TagProgramTooltip from "./tag-program-tooltip";

const MAX_VISIBLE_TAGS = 2;

interface ITagProgramContainerProps {
  tags: ProgramTag[];
}

class TagProgramContainer extends React.Component<ITagProgramContainerProps> {
  render() {
    const { tags } = this.props;
    const length = tags.length;
    const reminder = length > MAX_VISIBLE_TAGS ? length - 1 : null;
    return (
      <div className="tag-program-container">
        {tags.map(
          (tag, idx) =>
            ((reminder && idx === 0) || !reminder) && (
              <TagProgramItem name={tag.name} color={tag.color} key={idx} />
            )
        )}
        {reminder && (
          <Tooltip render={() => <TagProgramTooltip tags={tags} />}>
            <div>
              <Profitability
                className="tag-button"
                value={reminder}
                variant="chips"
              >
                + {reminder}
              </Profitability>
            </div>
          </Tooltip>
        )}
      </div>
    );
  }
}

export default TagProgramContainer;
