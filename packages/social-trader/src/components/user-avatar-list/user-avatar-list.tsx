import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { Center } from "components/center/center";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { ProfilePublicShort } from "gv-api-web";
import React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import styled from "styled-components";
import { $smallAvatarSize } from "utils/style/sizes";

export interface IUserAvatarListProps {
  onClickRemainder?: VoidFunction;
  remainderColor?: string;
  count: number;
  length?: number;
  list: ProfilePublicShort[];
}

const AVATAR_SHIFT = 20;

const Container = styled(Center)<{
  length: number;
  count: number;
}>`
  position: relative;
  width: ${({ length, count }) =>
    (44 - AVATAR_SHIFT) * (Math.min(length, count) + 1) +
    +(count > length) * AVATAR_SHIFT}px;
`;

const Item = styled.div<{ i: number }>`
  position: relative;
  left: ${({ i }) => -(AVATAR_SHIFT * i)}px;
`;

const Remainder = styled.div<{
  clickable?: boolean;
  remainderColor: string;
  length: number;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${$smallAvatarSize}px;
  height: ${$smallAvatarSize}px;
  border-radius: 100%;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  background: ${({ remainderColor }) => remainderColor};
  left: ${({ length }) => -(AVATAR_SHIFT * length)}px;
`;

const _UserAvatarList: React.FC<IUserAvatarListProps> = ({
  onClickRemainder,
  remainderColor = "#1c2730",
  count,
  length = 3,
  list
}) => {
  const { contextTitle } = useToLink();
  return (
    <Container length={length} count={count}>
      {list.slice(0, length).map(({ url, logoUrl, username }, i) => {
        const profileUrl = managerToPathCreator(url, contextTitle);
        return (
          <Item i={i}>
            <Link title={username} to={profileUrl}>
              <ProfileAvatar url={logoUrl} alt={username} />
            </Link>
          </Item>
        );
      })}
      {count > length && (
        <Remainder
          clickable={!!onClickRemainder}
          remainderColor={remainderColor}
          length={length}
          onClick={onClickRemainder}
        >
          + {count - length}
        </Remainder>
      )}
    </Container>
  );
};

export const UserAvatarList = React.memo(_UserAvatarList);
