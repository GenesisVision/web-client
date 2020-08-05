import TagItemWithTooltip from "components/tags/tag-item/tag-item-with-tooltip";
import { Tag } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { TFilter } from "../filter.type";
import TileFilter from "../tile-filter";
import TileFilterItem from "../tile-filter-item";
import TagFilterPopover from "./tag-filter-popover";

export interface Props {
  name: string;
  value: string[];
  values: Tag[];
  onChange: (value: TFilter<string[]>) => void;
}

const _TagFilter: React.FC<Props> = ({ name, values, value, onChange }) => {
  const [t] = useTranslation();
  const selectedTags = values
    .filter(x => value.includes(x.name))
    .map(tag => (
      <TileFilterItem key={tag.name} id={tag.name}>
        <TagItemWithTooltip name={tag.name} color={tag.color} />
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

const TagFilter = React.memo(_TagFilter);
export default TagFilter;
