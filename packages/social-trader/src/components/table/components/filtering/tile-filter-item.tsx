import { $panelBackgroundColor } from "components/gv-styles/gv-colors/gv-colors";
import { $closeButtonSize } from "components/gv-styles/gv-sizes";
import { CloseIcon } from "components/icon/close-icon";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import * as React from "react";
import styled from "styled-components";

export interface ITileFilterItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  bottomOffset?: boolean;
  removable?: boolean;
  id: string;
  removeTile?: (id: string) => void;
  mandatory?: boolean;
}

const Item = styled(Row)`
  position: relative;
`;

const IconContainer = styled.div`
  height: 6px;
  width: 6px;
`;

const RemoveButton = styled.div`
  padding: ${$closeButtonSize / 4}px;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: ${$closeButtonSize}px;
  height: ${$closeButtonSize}px;
  background-color: #293842;
  border: 2px solid ${$panelBackgroundColor};
  border-radius: 50%;
  top: -${$closeButtonSize / 2}px;
  right: -${$closeButtonSize / 1.2}px;
  &:hover {
    background-color: #161b20;
  }
`;

const _TileFilterItem: React.FC<ITileFilterItemProps> = ({
  bottomOffset = true,
  removable = true,
  mandatory,
  id,
  removeTile,
  children
}) => {
  return (
    <RowItem bottomOffset={bottomOffset}>
      <Item>
        {children}
        {!mandatory && removable && (
          <RemoveButton onClick={() => removeTile!(id)}>
            <IconContainer>
              <CloseIcon />
            </IconContainer>
          </RemoveButton>
        )}
      </Item>
    </RowItem>
  );
};

const TileFilterItem = React.memo(_TileFilterItem);
export default TileFilterItem;
