import "./notify-button.scss";

import { getMinProgramDeposit } from "components/deposit/services/program-deposit.service";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import useApiRequest from "hooks/api-request.hook";
import { addInvestNotify } from "pages/invest/programs/program-details/service/program-details.service";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { programMinDepositAmountsSelector } from "reducers/platform-reducer";
import { CurrencyEnum } from "utils/types";

const _NotifyButton: React.FC<Props> = ({
  broker,
  canInvest,
  assetId,
  currency
}) => {
  const [t] = useTranslation();
  const programMinDepositAmounts = useSelector(
    programMinDepositAmountsSelector
  );
  const minDeposit = getMinProgramDeposit(
    programMinDepositAmounts,
    currency,
    broker
  );
  const { isPending, sendRequest, data } = useApiRequest({
    request: () => addInvestNotify({ minDeposit, assetId })
  });
  const handleClick = useCallback(() => sendRequest(), []);
  return (
    <div className="notify-button">
      <GVButton
        size={GV_BTN_SIZE.BIG}
        className="asset-details-description__invest-btn"
        onClick={handleClick}
        disabled={Boolean(data || isPending || !canInvest)}
      >
        {t("buttons.notify")}
      </GVButton>
      <Tooltip
        render={() => (
          <TooltipContent>
            {t("program-details-page.description.notify-hint")}
          </TooltipContent>
        )}
      >
        <div className="notify-button__hint">?</div>
      </Tooltip>
    </div>
  );
};

interface Props {
  broker: string;
  assetId: string;
  currency: CurrencyEnum;
  canInvest: boolean;
}

const NotifyButton = React.memo(_NotifyButton);
export default NotifyButton;
