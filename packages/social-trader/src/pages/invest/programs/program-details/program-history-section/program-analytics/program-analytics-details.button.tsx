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

interface IProgramAnalyticsDetailsButtonProps {
  currency: CurrencyEnum;
  period: ProgramPeriodViewModel;
}

const _ProgramAnalyticsPopupItem: React.FC<{
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
const ProgramAnalyticsPopupItem = withLoader(_ProgramAnalyticsPopupItem);

const ProgramAnalyticsPopup: React.FC<ProgramAnalyticsPopupProps> = ({
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
        <ProgramAnalyticsPopupItem
          condition={!!period.investorsDeposit}
          label={t(
            "program-details-page:history.period-history.investors-deposit"
          )}
          value={period.investorsDeposit}
          currency={currency}
        />
        <ProgramAnalyticsPopupItem
          condition={!!period.investorsWithdraw}
          label={t(
            "program-details-page:history.period-history.investors-withdraw"
          )}
          value={period.investorsWithdraw}
          currency={currency}
        />
        <ProgramAnalyticsPopupItem
          condition={!!period.managerDeposit}
          label={t(
            "program-details-page:history.period-history.manager-deposit"
          )}
          value={period.managerDeposit}
          currency={currency}
        />
        <ProgramAnalyticsPopupItem
          condition={!!period.managerWithdraw}
          label={t(
            "program-details-page:history.period-history.manager-withdraw"
          )}
          value={period.managerWithdraw}
          currency={currency}
        />
        <ProgramAnalyticsPopupItem
          condition={!!period.investorsProfitWithdraw}
          label={t(
            "program-details-page:history.period-history.investors-profit-withdraw"
          )}
          value={period.investorsProfitWithdraw}
          currency={currency}
        />
        <ProgramAnalyticsPopupItem
          condition={!!period.platformSuccessFee}
          label={t(
            "program-details-page:history.period-history.platform-success-fee"
          )}
          value={period.platformSuccessFee}
          currency={currency}
        />
        <ProgramAnalyticsPopupItem
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

interface ProgramAnalyticsPopupProps
  extends IProgramAnalyticsDetailsButtonProps {
  anchor: TAnchor;
  onClose: () => void;
}

const _ProgramAnalyticsDetailsButton: React.FC<IProgramAnalyticsDetailsButtonProps> = ({
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
      <ProgramAnalyticsPopup
        period={period}
        currency={currency}
        anchor={anchor}
        onClose={clearAnchor}
      />
    </>
  );
};
export const ProgramAnalyticsDetailsButton = React.memo(
  _ProgramAnalyticsDetailsButton
);
