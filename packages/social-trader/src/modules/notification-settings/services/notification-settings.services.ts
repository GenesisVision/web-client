import { ASSETS_TYPES } from "constants/constants";
import { NotificationSettingConditionType, NotificationType } from "gv-api-web";
import notificationsApi from "services/api-client/notifications-api";
import { api } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";

export const fetchNotificationSettings = () => {
  return api.notifications().getNotificationsSettings();
};

export const removeNotificationMethod = ({ id }: { id: string }) =>
  api.notifications().removeNotificationsSettings(id);

export interface IAddNotificationSettingProps {
  assetId?: string;
  managerId?: string;
  type?: NotificationType;
  conditionType?: NotificationSettingConditionType;
  conditionAmount?: number;
}
export const addNotificationMethod = (opts: IAddNotificationSettingProps) =>
  api.notifications().addNotificationsSettings(opts);

export const toggleNotificationMethod = ({
  id,
  enabled
}: {
  id: string;
  enabled: boolean;
}) => api.notifications().toggleNotificationSettings(id, enabled);

export const getFundNotifications = (id: string) =>
  api.notifications().getNotificationsFundSettings(id);

export const getProgramNotifications = (id: string) =>
  api.notifications().getNotificationsProgramSettings(id);

export const getAssetNotifications = (assetType: ASSETS_TYPES) =>
  assetType === ASSETS_TYPES.Fund
    ? getFundNotifications
    : getProgramNotifications;
