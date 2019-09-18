import "./notify-button.scss";

import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import GVButton from "shared/components/gv-button";
import Tooltip from "shared/components/tooltip/tooltip";
import useApiRequest from "shared/hooks/api-request.hook";
import { CurrencyEnum } from "shared/utils/types";

import { getInvestmentInfoAction } from "../services/program-details.service";

const _NotifyButton: React.FC<Props> = ({
  notificationId: propNotificationId,
  canInvest,
  assetId,
  currency
}) => {
  const [t] = useTranslation();
  const { isPending, sendRequest, data } = useApiRequest({
    request: getInvestmentInfoAction
  });
  const handleClick = useCallback(
    () =>
      sendRequest({
        assetId,
        currency
      }),
    [assetId, currency]
  );
  return (
    <div className="notify-button">
      <GVButton
        className="asset-details-description__invest-btn"
        onClick={handleClick}
        disabled={Boolean(data || isPending || !canInvest)}
      >
        {t("buttons.notify")}
      </GVButton>
      <Tooltip render={() => t("program-details-page.description.notify-hint")}>
        <div className="notify-button__hint">?</div>
      </Tooltip>
    </div>
  );
};

interface Props {
  assetId: string;
  notificationId?: string;
  currency: CurrencyEnum;
  canInvest: boolean;
}

const NotifyButton = React.memo(_NotifyButton);
export default NotifyButton;
