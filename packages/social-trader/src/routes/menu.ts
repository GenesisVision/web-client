import GVLogo from "components/gv-logo/gv-logo";
import { DashboardIcon } from "components/icon/dashboard-icon";
import { DetailsIcon } from "components/icon/details-icon";
import { FollowIcon } from "components/icon/follow-icon";
import { FundsIcon } from "components/icon/funds-icon";
import { HistoryIcon } from "components/icon/history-icon";
import { InvestIcon } from "components/icon/invest-icon";
import { MyProfileIcon } from "components/icon/my-profile-icon";
import { NewsIcon } from "components/icon/news-icon";
import { ProgramsIcon } from "components/icon/programs-icon";
import { SettingsIcon } from "components/icon/settings-icon";
import { SocialIcon } from "components/icon/social-icon";
import { TerminalIcon } from "components/icon/terminal-icon";
import { TradeArrowsIcon } from "components/icon/trade-arrows-icon";
import { TradeIcon } from "components/icon/trade-icon";
import { UsersIcon } from "components/icon/users-icon";
import { WalletIcon } from "components/icon/wallet-icon";
import { PROFILE_ROUTE, SETTINGS_ROUTE } from "components/profile/profile.constants";
import { WALLET_TOTAL_PAGE_ROUTE } from "pages/wallet/wallet.paths";
import * as React from "react";
import { MEDIA_ROUTE, MY_PROFILE_ROUTE, SOCIAL_ROUTE, USERS_ROUTE } from "routes/social.routes";

import { HOME_ROUTE } from "./app.routes";
import { EVENTS_ROUTE, INVESTMENTS_ROUTE, OVERVIEW_ROUTE, TRADING_ROUTE } from "./dashboard.routes";
import { GV_FOLLOW_ROUTE, GV_FUNDS_ROUTE, GV_PROGRAMS_ROUTE, INVEST_ROUTE } from "./invest.routes";
import { TERMINAL_ROUTE, TRADE_ROUTE } from "./trade.routes";

export type TMenuItem = {
  isBeta?: boolean;
  route?: string;
  Icon: React.ComponentType<any>;
  label?: string;
  children?: TMenuItem[];
};

export const rootMenuItem = { Icon: GVLogo, route: HOME_ROUTE };

export const filterBeta = ({ isBeta }: TMenuItem): boolean => !isBeta;

export const filterMenuForBeta = (menu: TMenuItem[]) => {
  return menu
    .map(menuItem => {
      const children = (menuItem.children
        ? filterMenuForBeta(menuItem.children)
        : undefined) as TMenuItem[];
      return { ...menuItem, children };
    })
    .filter(filterBeta);
};

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

const mainMenuItemsUnion = [
  {
    Icon: DashboardIcon,
    label: "navigation.dashboard",
    route: OVERVIEW_ROUTE,
    children: [
      {
        Icon: DashboardIcon,
        label: "navigation.overview",
        route: OVERVIEW_ROUTE
      },
      {
        Icon: InvestIcon,
        route: INVESTMENTS_ROUTE,
        label: "navigation.investments"
      },
      {
        Icon: TradeArrowsIcon,
        route: TRADING_ROUTE,
        label: "navigation.trading"
      },
      { Icon: HistoryIcon, route: EVENTS_ROUTE, label: "navigation.events" }
      /*{
        Icon: StatisticIcon,
        route: FINANCIAL_STATISTIC_ROUTE,
        label: "navigation.financial-statistic"
      }*/
    ]
  },
  {
    Icon: SocialIcon,
    label: "navigation.social",
    route: SOCIAL_ROUTE,
    children: [
      { Icon: SocialIcon, label: "navigation.feed", route: SOCIAL_ROUTE },
      {
        Icon: UsersIcon,
        route: USERS_ROUTE,
        label: "navigation.users"
      },
      {
        Icon: MyProfileIcon,
        route: MY_PROFILE_ROUTE,
        label: "navigation.my-profile"
      },
      {
        Icon: NewsIcon,
        route: MEDIA_ROUTE,
        label: "navigation.media"
      }
    ]
  },
  {
    Icon: InvestIcon,
    label: "navigation.invest",
    route: INVEST_ROUTE,
    children: [
      {
        Icon: ProgramsIcon,
        route: GV_FUNDS_ROUTE,
        label: "navigation.gv-funds"
      },
      {
        Icon: FundsIcon,
        route: GV_PROGRAMS_ROUTE,
        label: "navigation.gv-programs"
      },
      {
        Icon: FollowIcon,
        route: GV_FOLLOW_ROUTE,
        label: "navigation.gv-follow"
      }
    ]
  },
  {
    Icon: TradeIcon,
    label: "navigation.trade",
    route: TRADE_ROUTE,
    children: [
      {
        Icon: TerminalIcon,
        route: TERMINAL_ROUTE,
        label: "navigation.terminal"
      }
      /*{
        Icon: TerminalIcon,
        route: TERMINAL_SPOT_ROUTE,
        label: "navigation.terminal.spot"
      },
      {
        Icon: TerminalIcon,
        route: TERMINAL_FUTURES_ROUTE,
        label: "navigation.terminal.futures"
      }*/
    ]
  }
];
export const topMenuItems: TMenuItem[] = mainMenuItemsUnion;

export const mobileMenuItems: TMenuItem[] = [
  ...mainMenuItemsUnion,
  ...advancedMobileMenuItems
];
