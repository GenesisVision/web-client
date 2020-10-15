import NotificationsWidget from "components/notifications-widget/notifications-widget";
import ProfileWidget from "components/profile-widget/profile-widget";
import { ProfileWidgetLoader } from "components/profile-widget/profile-widget.loader";
import WalletWidgetContainer from "components/wallet-widget/wallet-widget-container";
import { ProfileHeaderViewModel } from "gv-api-web";
import React from "react";
import styled from "styled-components";
import { getRandomInteger } from "utils/helpers";
import { hideOnLandscapeTablet } from "utils/style/mixins";

const DesktopWidget = styled.div`
  ${hideOnLandscapeTablet("flex")}
`;

const AuthWidgets: React.FC<Props> = ({ showWallet = true, profileHeader }) => {
  return (
    <>
      {showWallet && (
        <DesktopWidget>
          <WalletWidgetContainer />
        </DesktopWidget>
      )}
      <NotificationsWidget
        loaderData={getRandomInteger(0, 1000)}
        data={profileHeader && profileHeader.notificationsCount}
      />
      <DesktopWidget>
        <ProfileWidget
          condition={!!profileHeader}
          loader={<ProfileWidgetLoader />}
          profileHeader={profileHeader!}
        />
      </DesktopWidget>
    </>
  );
};

interface Props {
  showWallet?: boolean;
  profileHeader?: ProfileHeaderViewModel;
}

export default AuthWidgets;
