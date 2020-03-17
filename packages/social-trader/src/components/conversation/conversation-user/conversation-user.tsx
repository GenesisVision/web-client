import "./conversation-user.scss";

import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _ConversationUser: React.FC<Props> = ({ avatar, username, date }) => {
  return (
    <AvatarWithName
      avatar={<ProfileAvatar url={avatar} alt={username} />}
      name={
        <>
          <Row>
            <RowItem className="conversation-user__name">{username}</RowItem>
          </Row>
          <Row small>
            <MutedText>{date}</MutedText>
          </Row>
        </>
      }
    />
  );
};

interface Props {
  avatar: string;
  username: string;
  date: string | Date;
}

export const ConversationUser = React.memo(_ConversationUser);
