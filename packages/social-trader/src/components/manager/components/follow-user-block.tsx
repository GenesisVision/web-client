import { FollowUserButton } from "components/manager/components/follow-user-buttom";
import {
  FollowersCountItem,
  FollowingCountItem
} from "components/manager/components/users-popups/users-count-item";
import { useIsOwnPage } from "components/manager/manager.page.helpers";
import { getUserProfile } from "components/manager/services/manager.service";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { PublicProfile } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";

interface Props {
  profile: PublicProfile;
}

const _FollowUserBlock: React.FC<Props> = ({
  profile: { id, personalDetails, followers, following }
}) => {
  const { data, sendRequest } = useApiRequest({
    name: "FollowUserBlock",
    cache: true,
    request: () => getUserProfile(id)
  });
  const isOwnPage = useIsOwnPage(id);

  const updateData = useCallback(() => {
    sendRequest();
  }, []);

  const followersValue = data ? data.followers : followers;
  const followingValue = data ? data.following : following;
  return (
    <>
      {isOwnPage === false && personalDetails && (
        <Row onlyOffset size={"large"}>
          <FollowUserButton
            onChange={updateData}
            id={id}
            value={personalDetails.isFollow}
          />
        </Row>
      )}
      <Row size={"large"}>
        <RowItem>
          <FollowersCountItem
            onChange={updateData}
            id={id}
            count={followersValue}
          />
        </RowItem>
        <RowItem>
          <FollowingCountItem
            onChange={updateData}
            id={id}
            count={followingValue}
          />
        </RowItem>
      </Row>
    </>
  );
};

export const FollowUserBlock = React.memo(_FollowUserBlock);
