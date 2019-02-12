import "./tag-program-container.scss";

import React, { Component, Fragment } from "react";
import Tooltip from "shared/components/tooltip/tooltip";

import Profitability from "../profitability/profitability";
import TagProgramItem from "./tag-program-item";

const MAX_VISIBLE_TAGS = 2;

const ReminderTags = tags => {
  return (
    <div className="tag-program-tooltip">
      {tags.map(
        (tag, idx) =>
          idx > 0 && (
            <TagProgramItem name={tag.name} color={tag.color} key={idx} />
          )
      )}
    </div>
  );
};

class TagProgramContainer extends Component {
  render() {
    const { tags } = this.props;
    const length = tags.length;
    const reminder = length > MAX_VISIBLE_TAGS ? length - 1 : 0;
    return (
      <div className="tag-program-container">
        {tags.map(
          (tag, idx) =>
            ((reminder && idx === 0) || !reminder) && (
              <TagProgramItem name={tag.name} color={tag.color} key={idx} />
            )
        )}
        {reminder && (
          <Tooltip render={() => ReminderTags(tags)}>
            <div>
              <Profitability
                className="tag-program-container__other"
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
