import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { UserDetailsList } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { getUsersRating } from "pages/rating/rating.service";
import React from "react";

import "./rating.scss";

interface Props {}

export const RatingContainer: React.FC<Props> = ({}) => {
  const { data } = useApiRequest<UserDetailsList[]>({
    request: getUsersRating,
    fetchOnMount: true,
    fetchOnMountData: { sorting: "ByFollowersDesc" }
  });
  if (!data) return null;
  const winner = data[0];
  const other = data.slice(1);
  return (
    <Row>
      <DefaultBlock solid>
        <Row>
          <h2>Followers rating</h2>
        </Row>
        <Row onlyOffset>
          <Row>
            <RowItem>
              <h1 className="rating__winner">1</h1>
            </RowItem>
            <RowItem>
              <AvatarWithName
                avatar={
                  <ProfileAvatar
                    className="rating__winner-avatar"
                    big
                    url={winner.logoUrl}
                    alt={winner.username}
                  />
                }
                name={
                  <Center className="rating__winner">
                    <RowItem>
                      <b>{winner.username}</b>
                    </RowItem>
                    <RowItem>
                      <h2>{winner.followersCount}</h2>
                    </RowItem>
                  </Center>
                }
              />
            </RowItem>
          </Row>
          {other.map(({ logoUrl, username, followersCount }, index) => (
            <Row>
              <RowItem>{index + 2}</RowItem>
              <RowItem>
                <AvatarWithName
                  avatar={<ProfileAvatar url={logoUrl} alt={username} />}
                  name={
                    <Center>
                      <RowItem>{username}</RowItem>
                      <RowItem>
                        <h3>{followersCount}</h3>
                      </RowItem>
                    </Center>
                  }
                />
              </RowItem>
            </Row>
          ))}
        </Row>
      </DefaultBlock>
    </Row>
  );
};
