import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import TagItem from "components/tags/tag-item/tag-item";
import { Tag } from "gv-api-web";
import * as React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import TileFilterPopover from "../tile-filter-popover";

const _TagFilterPopover: React.FC<Props> = ({ values, changeFilter }) => {
  const [t] = useTranslation();
  const filterableValues = useMemo(
    () =>
      values.map(x => ({
        ...x,
        id: x.name,
        searchValue: x.name
      })),
    [values]
  );
  return (
    <TileFilterPopover
      header={t("filters.tag.popover-header")}
      placeholder={t("filters.tag.popover-search-placeholder")}
      values={filterableValues}
      changeFilter={changeFilter!}
    >
      {(filteredTags, handleClick) => (
        <Row wrap>
          {filteredTags.map(tag => (
            <RowItem bottomOffset small onClick={() => handleClick(tag.id)}>
              <TagItem name={tag.name} color={tag.color} />
            </RowItem>
          ))}
        </Row>
      )}
    </TileFilterPopover>
  );
};

const TagFilterPopover = React.memo(_TagFilterPopover);
export default TagFilterPopover;

interface Props {
  values: Tag[];
  changeFilter?(value: string): void;
}
