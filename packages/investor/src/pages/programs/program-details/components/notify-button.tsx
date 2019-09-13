import "./notify-button.scss";

import { subscribeAvailableToInvest } from "pages/programs/program-details/services/program-details.service";
import React, { useCallback, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import Tooltip from "shared/components/tooltip/tooltip";
import useIsOpen from "shared/hooks/is-open.hook";
import { CurrencyEnum } from "shared/utils/types";

const _NotifyButton: React.FC<Props> = ({
  t,
  notificationId: propNotificationId,
  canInvest,
  assetId,
  subscribeAvailableToInvest,
  currency
}) => {
  const [isPending, setIsPending, setNotIsPending] = useIsOpen();
  const [notificationId, setNotificationId] = useState<string | undefined>(
    propNotificationId
  );
  const handleClick = useCallback(
    () => {
      setIsPending();
      subscribeAvailableToInvest({
        assetId: assetId,
        currency: currency
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

const NotifyButton = compose<React.FC<OwnProps>>(
  translate(),
  connect(
    undefined,
    {
      subscribeAvailableToInvest
    }
  ),
  React.memo
)(_NotifyButton);
export default NotifyButton;

interface OwnProps {
  assetId: string;
  notificationId?: string;
  currency: CurrencyEnum;
  canInvest: boolean;
}

interface DispatchProps {
  subscribeAvailableToInvest: (
    props: {
      assetId: string;
      currency: string;
    }
  ) => Promise<string>;
}

interface Props extends OwnProps, WithTranslation, DispatchProps {}
