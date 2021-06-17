import { ManagerData } from "components/manager/components/manager-data";
import { ManagerInfo } from "components/manager/components/manager-info";
import { getManagerSchema } from "components/manager/manager.schema";
import Page from "components/page/page";
import { ResponsiveContainer } from "components/responsive-container/responsive-container";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { UpperBlock } from "components/upper-block/upper-block";
import { UpperButtonContainer } from "components/upper-button/upper-button";
import { PublicProfile } from "gv-api-web";
import { SocialPageContextProvider } from "pages/social/social/feed.context";
import * as React from "react";
import styled from "styled-components";
import {
  mediaBreakpointLandscapePhone,
  mediaBreakpointLandscapeTablet
} from "utils/style/media";

interface Props {
  cookieShowEvents?: boolean;
  profile: PublicProfile;
}

const Container = styled(Row)`
  position: relative;
  flex-direction: column;
  ${mediaBreakpointLandscapeTablet("flex-direction: row;")};
`;

const Info = styled(RowItem)`
  width: 100%;
  ${mediaBreakpointLandscapeTablet("width: 30%;")};
`;

const InfoRow = styled(Row)`
  flex-direction: column;
  ${mediaBreakpointLandscapePhone("flex-direction: row;")};
  ${mediaBreakpointLandscapeTablet("flex-direction: column;")};
`;

const Data = styled(RowItem)`
  width: 100%;
  ${mediaBreakpointLandscapeTablet("width: 70%;")};
`;

const _ManagerPage: React.FC<Props> = ({ cookieShowEvents, profile }) => {
  const title = profile.username;
  return (
    <Page
      title={title}
      schemas={[getManagerSchema(profile)]}
      description={profile.about || title}
      previewImage={profile.logoUrl}
      noIndex
      noFollow
    >
      <SocialPageContextProvider cookieShowEvents={cookieShowEvents}>
        <Container center={false} wide>
          <Info bottomOffset>
            <InfoRow center={false}>
              <ManagerInfo profile={profile} />
            </InfoRow>
            <ResponsiveContainer
              enabledScreens={["landscape-tablet", "desktop"]}
            >
              <UpperBlock />
            </ResponsiveContainer>
          </Info>
          <Data bottomOffset>
            <ManagerData
              canWritePost={profile.personalDetails?.canWritePost}
              id={profile.id}
            />
          </Data>
        </Container>
        <ResponsiveContainer
          enabledScreens={["phone", "landscape-phone", "tablet"]}
        >
          <UpperButtonContainer />
        </ResponsiveContainer>
      </SocialPageContextProvider>
    </Page>
  );
};

const ManagerPage = React.memo(_ManagerPage);
export default ManagerPage;
