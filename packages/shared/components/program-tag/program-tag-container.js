import "./program-tag-container.scss";

import React, { Component, Fragment } from "react";
import Tooltip from "shared/components/tooltip/tooltip";

import Profitability from "../profitability/profitability";
import ProgramTagItem from "./program-tag-item";

const MAX_VISIBLE_TAGS = 2;

const ReminderTags = tags => {
  return (
    <div className="program-tag-tooltip">
      {tags.map(
        (tag, idx) =>
          idx > 0 && (
            <ProgramTagItem name={tag.name} color={tag.color} key={idx} />
          )
      )}
    </div>
  );
};

class ProgramTagContainer extends Component {
  render() {
    const { tags } = this.props;
    const length = tags.length;
    const reminder = length > MAX_VISIBLE_TAGS ? length - 1 : 0;
    return (
      <div className="program-tag-container">
        {tags.map(
          (tag, idx) =>
            ((reminder && idx === 0) || !reminder) && (
              <ProgramTagItem name={tag.name} color={tag.color} key={idx} />
            )
        )}
        {reminder && (
          <Tooltip render={() => ReminderTags(tags)}>
            <div>
              <Profitability
                className="program-tag-container__other"
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

export default ProgramTagContainer;
