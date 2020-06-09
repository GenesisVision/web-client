import { FollowUserButton } from "components/manager/components/follow-user-buttom";
import {
  FollowersCountItem,
  FollowingCountItem
} from "components/manager/components/users-popups/users-count-item";
import { useIsOwnPage } from "components/manager/manager.page.helpers";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { PublicProfile } from "gv-api-web";
import React from "react";

interface Props {
  profile: PublicProfile;
}

const _FollowUserBlock: React.FC<Props> = ({
  profile: { id, personalDetails, followers, following }
}) => {
  const isOwnPage = useIsOwnPage(id);
  return (
    <>
      {isOwnPage === false && personalDetails && (
        <Row onlyOffset large>
          <FollowUserButton id={id} value={personalDetails.isFollow} />
        </Row>
      )}
      <Row large>
        <RowItem>
          <FollowersCountItem id={id} count={followers} />
        </RowItem>
        <RowItem>
          <FollowingCountItem id={id} count={following} />
        </RowItem>
      </Row>
    </>
  );
};

export const FollowUserBlock = React.memo(_FollowUserBlock);
