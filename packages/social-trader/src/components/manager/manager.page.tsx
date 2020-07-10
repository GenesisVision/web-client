import { ManagerData } from "components/manager/components/manager-data";
import { ManagerInfo } from "components/manager/components/manager-info";
import { getManagerSchema } from "components/manager/manager.schema";
import Page from "components/page/page";
import { ResponsiveContainer } from "components/responsive-container/responsive-container";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { UpperBlock } from "components/upper-block/upper-block";
import { UpperButtonContainer } from "components/upper-button/upper-button";
import { PublicProfile } from "gv-api-web";
import { SocialPageContextProvider } from "pages/social/social/feed.context";
import * as React from "react";

import styles from "./manager.page.module.scss";

const _ManagerPage: React.FC<Props> = ({ cookieShowEvents, profile }) => {
  const title = profile.username;
  return (
    <Page
      title={title}
      schemas={[getManagerSchema(profile)]}
      description={profile.about || title}
      previewImage={profile.logoUrl}
    >
      <SocialPageContextProvider cookieShowEvents={cookieShowEvents}>
        <Row className={styles["manager-page__container"]} center={false} wide>
          <RowItem className={styles["manager-page__info"]} bottomOffset>
            <Row className={styles["manager-page__info-row"]} center={false}>
              <ManagerInfo profile={profile} />
            </Row>
            <ResponsiveContainer
              enabledScreens={["landscape-tablet", "desktop"]}
            >
              <UpperBlock />
            </ResponsiveContainer>
          </RowItem>
          <RowItem className={styles["manager-page__data"]} bottomOffset>
            <ManagerData
              canWritePost={profile.personalDetails?.canWritePost}
              id={profile.id}
            />
          </RowItem>
        </Row>
        <ResponsiveContainer
          enabledScreens={["phone", "landscape-phone", "tablet"]}
        >
          <UpperButtonContainer />
        </ResponsiveContainer>
      </SocialPageContextProvider>
    </Page>
  );
};

interface Props {
  cookieShowEvents?: boolean;
  profile: PublicProfile;
}

const ManagerPage = React.memo(_ManagerPage);
export default ManagerPage;
