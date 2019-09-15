import "./notify-button.scss";

import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import GVButton from "shared/components/gv-button";
import Tooltip from "shared/components/tooltip/tooltip";
import useIsOpen from "shared/hooks/is-open.hook";
import { CurrencyEnum } from "shared/utils/types";

import { getInvestmentInfoAction } from "../services/program-details.service";

const _NotifyButton: React.FC<Props> = ({
  notificationId: propNotificationId,
  canInvest,
  assetId,
  currency
}) => {
  const [t] = useTranslation();
  const [isPending, setIsPending, setNotIsPending] = useIsOpen();
  const [notificationId, setNotificationId] = useState<string | undefined>(
    propNotificationId
  );
  const handleClick = useCallback(
    () => {
      setIsPending();
      getInvestmentInfoAction({
        assetId,
        currency
      })
        .then(setNotificationId)
        .finally(setNotIsPending);
    },
    [assetId, currency]
  );
  return (
    <div className="notify-button">
      <GVButton
        className="asset-details-description__invest-btn"
        onClick={handleClick}
        disabled={Boolean(notificationId || isPending || !canInvest)}
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
