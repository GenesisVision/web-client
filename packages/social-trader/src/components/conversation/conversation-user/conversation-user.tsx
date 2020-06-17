import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import { postToPathCreator } from "routes/social.routes";
import { formatDate } from "utils/dates";

import styles from "./conversation-user.module.scss";

const _ConversationUser: React.FC<Props> = ({
  postUrl,
  avatar,
  username,
  date,
  authorUrl
}) => {
  const { contextTitle } = useToLink();
  return (
    <AvatarWithName
      avatar={
        <Link to={managerToPathCreator(authorUrl, contextTitle)}>
          <ProfileAvatar url={avatar} alt={username} />
        </Link>
      }
      name={
        <>
          <Row>
            <Link to={managerToPathCreator(authorUrl, contextTitle)}>
              <RowItem className={styles["conversation-user__name"]}>
                {username}
              </RowItem>
            </Link>
          </Row>
          <Row small>
            <Link to={postUrl && postToPathCreator(postUrl, contextTitle)}>
              <MutedText>{formatDate(date)}</MutedText>
            </Link>
          </Row>
        </>
      }
    />
  );
};

interface Props {
  postUrl: string;
  authorUrl: string;
  avatar: string;
  username: string;
  date: string | Date;
}

export const ConversationUser = React.memo(_ConversationUser);
