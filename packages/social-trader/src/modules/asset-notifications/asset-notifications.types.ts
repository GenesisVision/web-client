import { INotification } from "./asset-notifications-general";

export type NotificationsList = {
  general: INotification[];
  custom: boolean;
};

export enum NOTIFICATIONS {
  PlatformNewsAndUpdates = "PlatformNewsAndUpdates",
  PlatformEmergency = "PlatformEmergency",
  Social = "Social",
  FundNewsAndUpdates = "FundNewsAndUpdates",
  FundRebalancing = "FundRebalancing",
  FollowNewsAndUpdates = "FollowNewsAndUpdates",
  ProgramNewsAndUpdates = "ProgramNewsAndUpdates",
  ProgramEndOfPeriod = "ProgramEndOfPeriod"
}
