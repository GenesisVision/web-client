import TileFilterItem from "components/table/components/filtering/tile-filter-item";
import TagBubble from "components/tags/tag-item/tag-bubble";
import React from "react";

interface Props {
  color: string;
  onRemove: (name: string) => void;
  name: string;
}

const _HashTag: React.FC<Props> = ({ color, name, onRemove }) => {
  return (
    <TileFilterItem bottomOffset={false} id={name} removeTile={onRemove}>
      <TagBubble color={color}>{name}</TagBubble>
    </TileFilterItem>
  );
};

export const HashTag = React.memo(_HashTag);
