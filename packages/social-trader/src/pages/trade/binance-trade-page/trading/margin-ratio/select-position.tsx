import { Center } from "components/center/center";
import Popover from "components/popover/popover";
import {
  PopoverContent,
  PopoverContentListItem
} from "components/popover/popover-content";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import FilterArrowIcon from "components/table/components/filtering/filter-arrow-icon";
import useAnchor from "hooks/anchor.hook";
import React from "react";

import { Position } from "../terminal.types";
import { MARGIN_INFO_ASSET } from "./margin-ratio.helpers";

interface Props {
  positions: Position[];
  selectedPositon: Position;
  setSelectionPosition: (position: Position) => void;
}

const _SelectPosition: React.FC<Props> = ({
  positions,
  selectedPositon,
  setSelectionPosition
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();

  const renderLabel = ({ symbol, marginType, positionSide }: Position) => (
    <h5>
      {marginType === "Isolated"
        ? `${symbol} ${positionSide !== "Both" ? positionSide : ""} Isolated`
        : `${MARGIN_INFO_ASSET} Cross`}
    </h5>
  );

  const crossPosition = positions.find(
    ({ marginType }) => marginType === "Cross"
  );

  return (
    <>
      <Popover anchorEl={anchor} onClose={clearAnchor}>
        <PopoverContent type={"list"}>
          {crossPosition && (
            <PopoverContentListItem
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectionPosition(crossPosition);
                clearAnchor();
              }}
            >
              {renderLabel(crossPosition)}
            </PopoverContentListItem>
          )}
          {positions.map(pos => {
            if (pos.marginType === "Cross") {
              return null;
            }
            return (
              <PopoverContentListItem
                key={pos.positionSide + pos.symbol}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectionPosition(pos);
                  clearAnchor();
                }}
              >
                {renderLabel(pos)}
              </PopoverContentListItem>
            );
          })}
        </PopoverContent>
      </Popover>
      <Row>
        <Center onClick={setAnchor}>
          <RowItem size={"small"}>{renderLabel(selectedPositon)}</RowItem>
          <FilterArrowIcon isOpen={!!anchor} />
        </Center>
      </Row>
    </>
  );
};

const SelectPosition = React.memo(_SelectPosition);
export default SelectPosition;
