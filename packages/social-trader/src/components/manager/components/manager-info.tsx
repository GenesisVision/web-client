import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { DefaultBlock } from "components/default.block/default.block";
import { FollowUserBlock } from "components/manager/components/follow-user-block";
import { Row } from "components/row/row";
import SocialLinksBlock from "components/social-links-block/social-links-block";
import { Text } from "components/text/text";
import { PublicProfile } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { localizedDate } from "utils/dates";
import { getLongWordsCount } from "utils/helpers";

interface Props {
  profile: PublicProfile;
}

const About = styled(Row)<{ hasLongWords?: boolean }>`
  white-space: pre-wrap;
  ${({ hasLongWords }) => hasLongWords && "overflow-wrap: anywhere;"};
`;

const _ManagerInfo: React.FC<Props> = ({ profile }) => {
  const { username, about, logoUrl, regDate, socialLinks } = profile;
  const [t] = useTranslation();
  const memberSince = `${t("manager-page:member-since")} ${localizedDate(
    regDate
  )}`;

  const hasLongWords = !!about && !!getLongWordsCount(about);
  return (
    <>
      <DefaultBlock solid size={"large"}>
        <Row>
          <ProfileAvatar url={logoUrl} big />
        </Row>
        <Row onlyOffset size={"large"}>
          <Row>
            <h2>{username}</h2>
          </Row>
          <Row size={"small"}>
            <Text muted>
              <b>{memberSince}</b>
            </Text>
          </Row>
        </Row>
        <FollowUserBlock profile={profile} />
      </DefaultBlock>
      <Row wide center={false}>
        <DefaultBlock>
          {!!socialLinks?.length && (
            <Row size={"large"} onlyOffset>
              <Row>
                <h3>{t("manager-page:social-links")}</h3>
              </Row>
              <Row>
                <SocialLinksBlock socialLinks={socialLinks} />
              </Row>
            </Row>
          )}
          {!!about?.length && (
            <Row size={"large"} onlyOffset>
              <Row>
                <h3>{t("manager-page:about")}</h3>
              </Row>
              <About hasLongWords={hasLongWords}>{about}</About>
            </Row>
          )}
        </DefaultBlock>
      </Row>
    </>
  );
};

export const ManagerInfo = React.memo(_ManagerInfo);
