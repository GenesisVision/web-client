import { ASSETS_TYPES } from "constants/constants";
import useApiRequest from "hooks/api-request.hook";
import AssetNotifications from "modules/asset-notifications/asset-notifications";
import { assetNotificationsLoaderData } from "modules/asset-notifications/asset-notifications.loader";
import { getAssetNotifications } from "modules/notification-settings/services/notification-settings.services";
import * as React from "react";
import { useCallback } from "react";

import { NotificationsList } from "./asset-notifications.types";

const _AssetNotifications: React.FC<Props> = ({
  id,
  assetType,
  notifications
}) => {
  const { data, sendRequest } = useApiRequest({
    request: getAssetNotifications(assetType),
    fetchOnMount: true,
    fetchOnMountData: id
  });
  const handleSuccess = useCallback(() => {
    return sendRequest(id);
  }, [sendRequest, id]);
  return (
    <AssetNotifications
      notifications={notifications}
      onSuccess={handleSuccess}
      data={data!}
      loaderData={assetNotificationsLoaderData}
    />
  );
};

interface Props {
  id: string;
  assetType: ASSETS_TYPES;
  notifications: NotificationsList;
}

const AssetNotificationsContainer = React.memo(_AssetNotifications);
export default AssetNotificationsContainer;
