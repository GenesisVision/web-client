import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { DefaultBlock } from "components/default.block/default.block";
import { FollowUserButton } from "components/manager/components/follow-user-buttom";
import {
  FollowersCountItem,
  FollowingCountItem
} from "components/manager/components/users-popups/users-count-item";
import { useIsOwnPage } from "components/manager/manager.page.helpers";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import SocialLinksBlock from "components/social-links-block/social-links-block";
import { SIZES } from "constants/constants";
import { PublicProfile } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  betaTesterSelector,
  isSocialBetaTester
} from "reducers/header-reducer";
import { localizedDate } from "utils/dates";

const _ManagerInfo: React.FC<Props> = ({
  profile: {
    personalDetails: { isFollow },
    followers,
    following,
    username,
    about,
    logoUrl,
    regDate,
    id,
    socialLinks
  }
}) => {
  const betaTester = useSelector(betaTesterSelector);
  const isBetaTester = isSocialBetaTester(betaTester);
  const isOwnPage = useIsOwnPage(id);
  const [t] = useTranslation();
  const memberSince = `${t("manager-page.member-since")} ${localizedDate(
    regDate
  )}`;
  return (
    <div>
      <Row>
        <DefaultBlock solid wide size={SIZES.LARGE}>
          <Row>
            <ProfileAvatar url={logoUrl} big />
          </Row>
          <Row onlyOffset large>
            <Row>
              <h2>{username}</h2>
            </Row>
            <Row small>
              <MutedText>
                <b>{memberSince}</b>
              </MutedText>
            </Row>
          </Row>
          {isBetaTester && (
            <>
              {isOwnPage === false && (
                <Row onlyOffset large>
                  <FollowUserButton id={id} value={isFollow} />
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
          )}
        </DefaultBlock>
      </Row>
      <Row>
        <DefaultBlock>
          {!!socialLinks?.length && (
            <Row large onlyOffset>
              <Row>
                <h3>{t("manager-page.social-links")}</h3>
              </Row>
              <Row>
                <SocialLinksBlock socialLinks={socialLinks} />
              </Row>
            </Row>
          )}
          {!!about?.length && (
            <Row large onlyOffset>
              <Row>
                <h3>{t("manager-page.about")}</h3>
              </Row>
              <Row>{about}</Row>
            </Row>
          )}
        </DefaultBlock>
      </Row>
    </div>
  );
};

interface Props {
  profile: PublicProfile;
}

export const ManagerInfo = React.memo(_ManagerInfo);
