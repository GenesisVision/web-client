import { Button } from "components/button/button";
import { Center } from "components/center/center";
import { TradesComponentsPopupItemName } from "components/details/details-description-section/details-statistic-section/details-history/trades-components";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  ORIENTATION_POPOVER
} from "components/popover/popover";
import {
  PopoverContent,
  PopoverContentListItem
} from "components/popover/popover-content";
import { Text } from "components/text/text";
import withLoader from "decorators/with-loader";
import { ProgramPeriodViewModel } from "gv-api-web";
import useAnchor, { TAnchor } from "hooks/anchor.hook";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

const _ProgramPeriodHistoryPopupItem: React.FC<{
  label: string;
  value: number;
  currency: CurrencyEnum;
}> = ({ label, value, currency }) => (
  <PopoverContentListItem>
    <Center>
      <TradesComponentsPopupItemName>
        <Text muted>{label}</Text>
      </TradesComponentsPopupItemName>
      <Text wrap={false}>
        {value} {currency}
      </Text>
    </Center>
  </PopoverContentListItem>
);
const ProgramPeriodHistoryPopupItem = withLoader(
  _ProgramPeriodHistoryPopupItem
);

const ProgramPeriodHistoryPopup: React.FC<ProgramPeriodHistoryPopupProps> = ({
  anchor,
  onClose,
  period,
  currency
}) => {
  const [t] = useTranslation();
  return (
    <Popover
      ownWidth
      anchorEl={anchor}
      onClose={onClose}
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      orientation={ORIENTATION_POPOVER.LEFT}
    >
      <PopoverContent type={"list"}>
        <ProgramPeriodHistoryPopupItem
          condition={!!period.investorsDeposit}
          label={t(
            "program-details-page:history.period-history.investors-deposit"
          )}
          value={period.investorsDeposit}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.investorsWithdraw}
          label={t(
            "program-details-page:history.period-history.investors-withdraw"
          )}
          value={period.investorsWithdraw}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.managerDeposit}
          label={t(
            "program-details-page:history.period-history.manager-deposit"
          )}
          value={period.managerDeposit}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.managerWithdraw}
          label={t(
            "program-details-page:history.period-history.manager-withdraw"
          )}
          value={period.managerWithdraw}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.investorsProfitWithdraw}
          label={t(
            "program-details-page:history.period-history.investors-profit-withdraw"
          )}
          value={period.investorsProfitWithdraw}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.platformSuccessFee}
          label={t(
            "program-details-page:history.period-history.platform-success-fee"
          )}
          value={period.platformSuccessFee}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.managerCommissionRebate}
          label={t(
            "program-details-page:history.period-history.manager-commission-rebate"
          )}
          value={period.managerCommissionRebate}
          currency={currency}
        />
      </PopoverContent>
    </Popover>
  );
};

interface ProgramPeriodHistoryPopupProps
  extends IProgramPeriodHistoryDetailsButtonProps {
  anchor: TAnchor;
  onClose: () => void;
}

const _ProgramPeriodHistoryDetailsButton: React.FC<IProgramPeriodHistoryDetailsButtonProps> = ({
  period,
  currency
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const [t] = useTranslation();
  return (
    <>
      <Button size={"small"} color="secondary" onClick={setAnchor}>
        {t("my-history.details")}
      </Button>
      <ProgramPeriodHistoryPopup
        period={period}
        currency={currency}
        anchor={anchor}
        onClose={clearAnchor}
      />
    </>
  );
};

interface IProgramPeriodHistoryDetailsButtonProps {
  currency: CurrencyEnum;
  period: ProgramPeriodViewModel;
}

export const ProgramPeriodHistoryDetailsButton = React.memo(
  _ProgramPeriodHistoryDetailsButton
);
