import Popover, { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import useAnchor from "hooks/anchor.hook";
import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";

import { UpdateFilterFunc } from "../table.types";
import TileFilterButton from "./tile-filter-button";
import {
  ITileFilterItemProps,
  TileFilterItemMarginBottom
} from "./tile-filter-item";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  value: string[];
  updateFilter: UpdateFilterFunc;
  name: string;
  buttonTitle: string;
  selectedTiles: React.ReactElement<ITileFilterItemProps>[];
}

const Items = styled(Row)`
  margin-bottom: -${TileFilterItemMarginBottom}px;
  flex-wrap: wrap;
`;

const TileFilter: React.FC<Props> = ({
  selectedTiles,
  buttonTitle,
  value,
  children,
  name,
  updateFilter
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const handleAdd = useCallback(
    (id: string) => {
      clearAnchor();
      updateFilter({
        name,
        value: [...value, id]
      });
    },
    [updateFilter, name, value]
  );
  const handleRemove = useCallback(
    (id: string) =>
      updateFilter({
        name,
        value: value.filter(x => x !== id)
      }),
    [updateFilter, name, value]
  );

  const selectedItems = selectedTiles.map(x =>
    React.cloneElement(x, {
      removeTile: handleRemove
    })
  );
  const child = React.cloneElement(children as React.ReactElement, {
    value,
    changeFilter: handleAdd,
    cancel: clearAnchor
  });
  return (
    <RowItem>
      <Row>
        <RowItem size={"large"}>
          <Items>{selectedItems}</Items>
        </RowItem>
        <RowItem>
          <TileFilterButton
            isActive={!!anchor}
            onClick={setAnchor}
            title={buttonTitle}
          />
        </RowItem>
      </Row>
      <Popover
        anchorEl={anchor}
        onClose={clearAnchor}
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        noPadding
      >
        {child}
      </Popover>
    </RowItem>
  );
};

export default TileFilter;
