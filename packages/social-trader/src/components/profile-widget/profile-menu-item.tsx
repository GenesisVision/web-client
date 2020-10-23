import { Button } from "components/button/button";
import { Center } from "components/center/center";
import Link, { ToType } from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import * as React from "react";
import styled from "styled-components";
import { $textLightColor } from "utils/style/colors";
import { $fontSizeCommon } from "utils/style/sizes";
import { Clickable } from "utils/types";

interface IProfileMenuItemProps extends Clickable {
  to?: ToType | string;
  label: any;
  Icon: React.ComponentType;
}

const IconContainer = styled(Center)`
  opacity: 0.2;
  background-position: center;
  height: 13px;
  width: 13px;

  &:hover {
    opacity: 0.5;
  }
`;

const Label = styled(RowItem)`
  font-size: ${$fontSizeCommon}px;
  color: ${$textLightColor};
  white-space: nowrap;
`;

const Item = styled(Row)`
  min-width: 200px;
`;

export const ProfileMenuItem: React.FC<IProfileMenuItemProps> = React.memo(
  ({ Icon, to, onClick, label }) => {
    const renderLabel = () => (
      <Row>
        <RowItem>
          <IconContainer>
            <Icon />
          </IconContainer>
        </RowItem>
        <Label>{label}</Label>
      </Row>
    );
    const renderButton = () =>
      to ? (
        <Link to={to} onClick={onClick}>
          {renderLabel()}
        </Link>
      ) : (
        <Button variant="text" color={"danger"} noPadding onClick={onClick}>
          {renderLabel()}
        </Button>
      );
    return <Item>{renderButton()}</Item>;
  }
);
