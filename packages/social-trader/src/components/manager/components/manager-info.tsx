import classNames from "classnames";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { DefaultBlock } from "components/default.block/default.block";
import { FollowUserBlock } from "components/manager/components/follow-user-block";
import { MutedText } from "components/muted-text/muted-text";
import { Row } from "components/row/row";
import SocialLinksBlock from "components/social-links-block/social-links-block";
import { SIZES } from "constants/constants";
import { PublicProfile } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { localizedDate } from "utils/dates";
import { getLongWordsCount } from "utils/helpers";

import styles from "./manager-info.module.scss";

const _ManagerInfo: React.FC<Props> = ({ profile }) => {
  const { username, about, logoUrl, regDate, socialLinks } = profile;
  const [t] = useTranslation();
  const memberSince = `${t("manager-page.member-since")} ${localizedDate(
    regDate
  )}`;

  const hasLongWords = about && !!getLongWordsCount(about);
  return (
    <>
      <DefaultBlock solid size={SIZES.LARGE}>
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
        <FollowUserBlock profile={profile} />
      </DefaultBlock>
      <Row wide center={false}>
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
              <Row
                className={classNames(styles["manager-info__about"], {
                  [styles["manager-info__about--break-word"]]: hasLongWords
                })}
              >
                {about}
              </Row>
            </Row>
          )}
        </DefaultBlock>
      </Row>
    </>
  );
};

interface Props {
  profile: PublicProfile;
}

export const ManagerInfo = React.memo(_ManagerInfo);
