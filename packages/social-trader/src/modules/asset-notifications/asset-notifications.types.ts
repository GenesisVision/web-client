import { INotification } from "./asset-notifications-general";

export type NotificationsList = {
  general: INotification[];
  custom: boolean;
};

export enum NOTIFICATIONS {
  PlatformNewsAndUpdates = "PlatformNewsAndUpdates",
  PlatformEmergency = "PlatformEmergency",
  FundNewsAndUpdates = "FundNewsAndUpdates",
  FundRebalancing = "FundRebalancing",
  FollowNewsAndUpdates = "ProgramNewsAndUpdates",
  ProgramNewsAndUpdates = "ProgramNewsAndUpdates",
  ProgramEndOfPeriod = "ProgramEndOfPeriod"
}
