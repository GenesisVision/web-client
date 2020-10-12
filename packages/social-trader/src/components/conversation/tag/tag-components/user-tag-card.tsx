import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { TagBlock } from "components/conversation/tag/tag.block";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { Text } from "components/text/text";
import Crashable from "decorators/crashable";
import React from "react";
import { managerToPathCreator } from "routes/manager.routes";

import { IUserTagProps } from "./tag-components.types";

const _UserTagCard: React.FC<IUserTagProps> = ({
  userDetails: { username, url, logoUrl }
}) => {
  const { contextTitle } = useToLink();
  return (
    <TagBlock>
      <AvatarWithName
        size={"small"}
        avatar={
          <Link to={managerToPathCreator(url, contextTitle)}>
            <ProfileAvatar url={logoUrl} alt={username} />
          </Link>
        }
        name={
          <Link to={managerToPathCreator(url, contextTitle)}>
            <Text muted wrap={false} size={"small"}>
              {username}
            </Text>
          </Link>
        }
      />
    </TagBlock>
  );
};
export const UserTagCard = React.memo(Crashable(_UserTagCard));
