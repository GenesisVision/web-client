import { Center } from "components/center/center";
import { LikeButtonIcon } from "components/conversation/like/like-button-icon/like-button-icon";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import React, { useCallback } from "react";
import styled from "styled-components";
import { Clickable } from "utils/types";

interface Props extends Clickable {
  count: number;
  disable?: boolean;
  liked?: boolean;
}

const Container = styled(Center)`
  cursor: pointer;
`;

const Icon = styled.div`
  width: 15px;
  height: 15px;
`;

export const _Like: React.FC<Props> = ({ count, onClick, disable, liked }) => {
  const clickHandle = useCallback(() => {
    if (!disable) onClick();
  }, [disable, onClick]);

  return (
    <Container onClick={clickHandle}>
      <RowItem size={"small"}>
        <Icon>
          <LikeButtonIcon liked={!!liked} disabled={disable} />
        </Icon>
      </RowItem>
      {count > 0 && (
        <RowItem>
          <Text>{count}</Text>
        </RowItem>
      )}
    </Container>
  );
};

export const Like = React.memo(_Like);
