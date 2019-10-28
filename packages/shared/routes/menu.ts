import * as React from "react";
import GVLogo from "shared/components/gv-logo/gv-logo";
import { DashboardIcon } from "shared/components/icon/dashboard-icon";
import { DetailsIcon } from "shared/components/icon/details-icon";
import { FundsIcon } from "shared/components/icon/funds-icon";
import { ProgramsIcon } from "shared/components/icon/programs-icon";
import { SettingsIcon } from "shared/components/icon/settings-icon";
import { WalletIcon } from "shared/components/icon/wallet-icon";
import {
  PROFILE_ROUTE,
  SETTINGS_ROUTE
} from "shared/components/profile/profile.constants";
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";

import { HOME_ROUTE } from "./app.routes";
import { DASHBOARD_ROUTE } from "./dashboard.routes";
import { FUNDS_ROUTE } from "./funds.routes";
import { PROGRAMS_ROUTE } from "./programs.routes";

export type TMenuItem = {
  route?: string;
  Icon: React.ComponentType<any>;
  label?: string;
  children?: TMenuItem[];
};

const mainItems: TMenuItem[] = [
  {
    Icon: DashboardIcon,
    label: "navigation.dashboard",
    route: DASHBOARD_ROUTE
  },
  { Icon: ProgramsIcon, route: PROGRAMS_ROUTE, label: "navigation.programs" },
  { Icon: FundsIcon, route: FUNDS_ROUTE, label: "navigation.funds" }
];

export const topMenuItems: TMenuItem[] = [
  { Icon: GVLogo, route: HOME_ROUTE },
  ...mainItems
];

export const mobileMenuItems: TMenuItem[] = [
  ...mainItems,
  {
    Icon: DetailsIcon,
    route: PROFILE_ROUTE,
    label: "navigation.personal-details"
  },
  {
    Icon: WalletIcon,
    route: WALLET_TOTAL_PAGE_ROUTE,
    label: "navigation.wallet"
  },
  { Icon: SettingsIcon, route: SETTINGS_ROUTE, label: "navigation.settings" }
];
