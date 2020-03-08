import { ASSETS_TYPES } from "constants/constants";
import notificationsApi from "services/api-client/notifications-api";
import authService from "services/auth-service";

export const fetchNotificationSettings = () => {
  const authorization = authService.getAuthArg();
  return notificationsApi.getNotificationsSettings(authorization);
};

export const removeNotificationMethod = ({ id }: { id: string }) =>
  notificationsApi.removeNotificationsSettings(id, authService.getAuthArg());

export interface IAddNotificationSettingProps {
  assetId?: string;
  managerId?: string;
  type?: string;
  conditionType?: string;
  conditionAmount?: number;
}
export const addNotificationMethod = (opts: IAddNotificationSettingProps) =>
  notificationsApi.addNotificationsSettings(authService.getAuthArg(), opts);

export const toggleNotificationMethod = ({
  id,
  enabled
}: {
  id: string;
  enabled: boolean;
}) =>
  notificationsApi.toggleNotificationSettings(
    id,
    enabled,
    authService.getAuthArg()
  );

export const getFundNotifications = (id: string) =>
  notificationsApi.getNotificationsFundSettings(id, authService.getAuthArg());

export const getProgramNotifications = (id: string) =>
  notificationsApi.getNotificationsProgramSettings(
    id,
    authService.getAuthArg()
  );

export const getAssetNotifications = (assetType: ASSETS_TYPES) =>
  assetType === ASSETS_TYPES.Fund
    ? getFundNotifications
    : getProgramNotifications;
