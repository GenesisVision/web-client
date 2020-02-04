import Sidebar from "components/sidebar/sidebar";
import { ProfileHeaderViewModel } from "gv-api-web";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";
import { TMenuItem } from "routes/menu";

const NavigationMobile = dynamic(() =>
  import("components/navigation/navigation-mobile/navigation-mobile")
);

const _NavigationMobileContainer: React.FC<Props> = props => {
  const { isOpenNavigation, onClose } = props;
  return (
    <Sidebar open={isOpenNavigation} onClose={onClose}>
      <NavigationMobile {...props} />
    </Sidebar>
  );
};

interface Props {
  mobileMenuItems: TMenuItem[];
  backPath: string;
  isAuthenticated: boolean;
  profileHeader?: ProfileHeaderViewModel;
  isOpenNavigation: boolean;
  onClose: () => void;
  logout: () => void;
}

const NavigationMobileContainer = React.memo(_NavigationMobileContainer);
export default NavigationMobileContainer;
