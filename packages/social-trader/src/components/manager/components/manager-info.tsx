import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { DefaultBlock } from "components/default.block/default.block";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { FollowUserButton } from "components/manager/components/follow-user-buttom";
import { ManagerStatisticItem } from "components/manager/components/manager-statistic-item";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import SocialLinksBlock from "components/social-links-block/social-links-block";
import { SIZES } from "constants/constants";
import { PublicProfile } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { localizedDate } from "utils/dates";

const _ManagerInfo: React.FC<Props> = ({
  profile: { username, about, avatar, regDate, id, socialLinks }
}) => {
  const [t] = useTranslation();
  const memberSince = `${t("manager-page.member-since")} ${localizedDate(
    regDate
  )}`;
  return (
    <div>
      <Row>
        <DefaultBlock solid wide size={SIZES.LARGE}>
          <Row>
            <ProfileAvatar url={avatar} big />
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
          <Row onlyOffset large>
            <FollowUserButton id={id} value={false} />
          </Row>
          <Row large>
            <RowItem>
              <ManagerStatisticItem
                label={t("manager-page.followers")}
                value={1536}
              />
            </RowItem>
            <RowItem>
              <ManagerStatisticItem
                label={t("manager-page.following")}
                value={44}
              />
            </RowItem>
          </Row>
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
