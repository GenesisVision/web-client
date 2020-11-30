import { CloseIcon } from "components/icon/close-icon";
import { Row } from "components/row/row";
import * as React from "react";
import styled from "styled-components";
import { $panelBackgroundColor } from "utils/style/colors";
import { $closeButtonSize, $paddingXsmall } from "utils/style/sizes";

export interface ITileFilterItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  bottomOffset?: boolean;
  removable?: boolean;
  id: string;
  removeTile?: (id: string) => void;
  mandatory?: boolean;
}

export const TileFilterItemMarginBottom = $paddingXsmall / 2;

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
  right: -${$closeButtonSize / 1.3}px;
  &:hover {
    background-color: #161b20;
  }
`;

export const TileFilterItemContainer = styled.div<{ bottomOffset?: boolean }>`
  &:not(:last-child) {
    margin-right: ${$paddingXsmall}px;
  }
  ${({ bottomOffset = true }) =>
    bottomOffset && `margin-bottom: ${TileFilterItemMarginBottom}px;`};
`;

const _TileFilterItem: React.FC<ITileFilterItemProps> = ({
  bottomOffset,
  removable = true,
  mandatory,
  id,
  removeTile,
  children
}) => {
  return (
    <TileFilterItemContainer bottomOffset={bottomOffset}>
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
    </TileFilterItemContainer>
  );
};

const TileFilterItem = React.memo(_TileFilterItem);
export default TileFilterItem;
