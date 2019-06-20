import { ProgramTag } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import TagProgramItem from "shared/components/tag-program/tag-program-item";

import TileFilterPopover from "../tile-filter-popover";

const _TagFilterPopover: React.FC<Props & InjectedTranslateProps> = ({
  t,
  values,
  changeFilter
}) => {
  const filterableValues = values.map(x => ({
    ...x,
    id: x.name,
    searchValue: x.name
  }));
  return (
    <TileFilterPopover
      header={t("filters.tag.popover-header")}
      placeholder={t("filters.tag.popover-search-placeholder")}
      values={filterableValues}
      changeFilter={changeFilter!}
    >
      {(filteredTags, handleClick) => (
        <div className="tag-filter">
          {filteredTags.map(tag => (
            <div
              key={tag.id}
              className="tag-filter__tag"
              onClick={() => handleClick(tag.id)}
            >
              <TagProgramItem name={tag.name} color={tag.color} />
            </div>
          ))}
        </div>
      )}
    </TileFilterPopover>
  );
};

const TagFilterPopover = compose<React.ComponentType<Props>>(
  React.memo,
  translate()
)(_TagFilterPopover);
export default TagFilterPopover;

interface Props {
  values: ProgramTag[];
  changeFilter?(value: string): void;
}
