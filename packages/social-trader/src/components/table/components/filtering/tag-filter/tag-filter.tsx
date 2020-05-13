import TagItem from "components/tags/tag-item/tag-item";
import { Tag } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";

import { TFilter } from "../filter.type";
import TileFilter from "../tile-filter";
import TileFilterItem from "../tile-filter-item";
import TagFilterPopover from "./tag-filter-popover";

const _TagFilter: React.FC<Props & WithTranslation> = ({
  t,
  name,
  values,
  value,
  onChange
}) => {
  const selectedTags = values
    .filter(x => value.includes(x.name))
    .map(tag => (
      <TileFilterItem key={tag.name} id={tag.name}>
        <TagItem color={tag.color} name={tag.name} />
      </TileFilterItem>
    ));
  const notSelectedTags = values.filter(x => !value.includes(x.name));
  return (
    <TileFilter
      name={name}
      value={value}
      updateFilter={onChange}
      buttonTitle={t("filters.tag.add")}
      selectedTiles={selectedTags}
    >
      <TagFilterPopover values={notSelectedTags} />
    </TileFilter>
  );
};

const TagFilter = compose<React.ComponentType<Props>>(
  React.memo,
  translate()
)(_TagFilter);
export default TagFilter;

export interface Props {
  name: string;
  value: string[];
  values: Tag[];
  onChange(value: TFilter<string[]>): void;
}
