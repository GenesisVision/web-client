import { Button } from "components/button/button";
import { Center } from "components/center/center";
import { getMinProgramDeposit } from "components/deposit/services/program-deposit.service";
import { RowItem } from "components/row-item/row-item";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import useApiRequest from "hooks/api-request.hook";
import { addInvestNotify } from "pages/invest/programs/program-details/service/program-details.service";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { programMinDepositAmountsSelector } from "reducers/platform-reducer";
import styled from "styled-components";
import { $mainColor } from "utils/style/colors";
import { CurrencyEnum } from "utils/types";

interface Props {
  broker: string;
  assetId: string;
  currency: CurrencyEnum;
  canInvest: boolean;
}

const Hint = styled.div`
  border: 1px solid ${$mainColor};
  border-radius: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  font-size: 8px;
  color: ${$mainColor};
  cursor: help;
`;

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
    <Center>
      <RowItem>
        <Button
          size={"xlarge"}
          onClick={handleClick}
          disabled={Boolean(data || isPending || !canInvest)}
        >
          {t("buttons.notify")}
        </Button>
      </RowItem>
      <Tooltip
        render={() => (
          <TooltipContent>
            {t("asset-details:description.notify-hint")}
          </TooltipContent>
        )}
      >
        <Hint>?</Hint>
      </Tooltip>
    </Center>
  );
};

const NotifyButton = React.memo(_NotifyButton);
export default NotifyButton;
