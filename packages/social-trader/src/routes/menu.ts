import GVLogo from "components/gv-logo/gv-logo";
import { DashboardIcon } from "components/icon/dashboard-icon";
import { DetailsIcon } from "components/icon/details-icon";
import { FundsIcon } from "components/icon/funds-icon";
import { ProgramsIcon } from "components/icon/programs-icon";
import { SettingsIcon } from "components/icon/settings-icon";
import { WalletIcon } from "components/icon/wallet-icon";
import {
  PROFILE_ROUTE,
  SETTINGS_ROUTE
} from "components/profile/profile.constants";
import { WALLET_TOTAL_PAGE_ROUTE } from "components/wallet/wallet.routes";
import * as React from "react";

import { HOME_ROUTE } from "./app.routes";
import {
  DASHBOARD_ROUTE,
  EVENTS_ROUTE,
  FINANCIAL_STATISTIC_ROUTE,
  INVESTMENTS_ROUTE,
  OVERVIEW_ROUTE,
  TRADING_ROUTE
} from "./dashboard.routes";
import { FUNDS_ROUTE } from "./funds.routes";
import {
  GV_FOLLOW_ROUTE,
  GV_FUNDS_ROUTE,
  GV_PROGRAMS_ROUTE
} from "./invest.routes";
import { PROGRAMS_ROUTE } from "./programs.routes";
import {
  COMING_SOON_ROUTE,
  META_TRADER_4_ROUTE,
  META_TRADER_5_ROUTE
} from "./trade.routes";

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

const advancedMobileMenuItems: TMenuItem[] = [
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

export const mobileMenuItems: TMenuItem[] = [
  ...mainItems,
  ...advancedMobileMenuItems
];

const mainMenuItemsUnion = [
  {
    Icon: DashboardIcon,
    label: "navigation.dashboard",
    children: [
      {
        Icon: SettingsIcon,
        route: OVERVIEW_ROUTE,
        label: "navigation.overview"
      },
      { Icon: SettingsIcon, route: EVENTS_ROUTE, label: "navigation.events" },
      {
        Icon: SettingsIcon,
        route: INVESTMENTS_ROUTE,
        label: "navigation.investments"
      },
      { Icon: SettingsIcon, route: TRADING_ROUTE, label: "navigation.trading" },
      {
        Icon: SettingsIcon,
        route: FINANCIAL_STATISTIC_ROUTE,
        label: "navigation.financial-statistic"
      }
    ]
  },
  {
    Icon: DashboardIcon,
    label: "navigation.invest",
    children: [
      {
        Icon: SettingsIcon,
        route: GV_FOLLOW_ROUTE,
        label: "navigation.gv-follow"
      },
      {
        Icon: SettingsIcon,
        route: GV_FUNDS_ROUTE,
        label: "navigation.gv-funds"
      },
      {
        Icon: SettingsIcon,
        route: GV_PROGRAMS_ROUTE,
        label: "navigation.gv-programs"
      }
    ]
  },
  {
    Icon: DashboardIcon,
    label: "navigation.trade",
    children: [
      {
        Icon: SettingsIcon,
        route: META_TRADER_4_ROUTE,
        label: "navigation.mt4"
      },
      {
        Icon: SettingsIcon,
        route: META_TRADER_5_ROUTE,
        label: "navigation.mt5"
      },
      {
        Icon: SettingsIcon,
        route: COMING_SOON_ROUTE,
        label: "navigation.coming-soon"
      }
    ]
  }
];
export const topMenuItemsUnion: TMenuItem[] = [
  { Icon: GVLogo, route: HOME_ROUTE },
  ...mainMenuItemsUnion
];

export const mobileMenuItemsUnion: TMenuItem[] = [
  ...mainMenuItemsUnion,
  ...advancedMobileMenuItems
];
