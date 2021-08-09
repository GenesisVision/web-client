import { Button } from "components/button/button";
import Hint from "components/hint/hint";
import { ToType } from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import { PopoverContentListItem } from "components/popover/popover-content";
import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
import { Text } from "components/text/text";
import {
  AmountWithLogoCurrency,
  BrokerTradeServerType,
  ProgramMinInvestAmount
} from "gv-api-web";
import { TEvent } from "hooks/anchor.hook";
import useIsOpen from "hooks/is-open.hook";
import { useTranslation } from "i18n";
import ConfirmContainer from "modules/confirm/confirm-container";
import { TransferItemType } from "modules/transfer/transfer.types";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { makeProgramLinkCreator } from "pages/convert-asset/convert-asset.routes";
import * as React from "react";
import { convertToStatisticCurrency } from "utils/ga";
import { CurrencyEnum } from "utils/types";

export const transformAmountWithCurrencyToTransferItem = ({
  amount,
  currency,
  logoUrl
}: AmountWithLogoCurrency): TransferItemType => ({
  id: currency,
  currency,
  logoUrl,
  available: amount
});

export const MakeProgramButton: React.FC<{
  isExchange?: boolean;
  makeProgramLink?: string | ToType;
  necessaryMoney: string;
  isEnoughMoney: boolean;
  id: string;
  clearAnchor: (event: TEvent) => void;
}> = React.memo(
  ({
    isExchange,
    makeProgramLink: makeProgramLinkProp,
    isEnoughMoney,
    id,
    clearAnchor,
    necessaryMoney
  }) => {
    const { linkCreator } = useToLink();
    const [t] = useTranslation();
    const makeProgramLinkMethod = makeProgramLinkCreator({
      assetFrom: isExchange
        ? CONVERT_ASSET.EXCHANGE_ACCOUNT
        : CONVERT_ASSET.ACCOUNT,
      assetTo: CONVERT_ASSET.PROGRAM
    });
    const makeProgramLink =
      makeProgramLinkProp || linkCreator(makeProgramLinkMethod(id));
    const label = t("dashboard-page:trading.actions.make-program");
    return isEnoughMoney ? (
      <TableCardActionsItem to={makeProgramLink} onClick={clearAnchor}>
        {label}
      </TableCardActionsItem>
    ) : (
      <PopoverContentListItem>
        <Button disabled={true} variant="text" noPadding color={"secondary"}>
          <Hint
            content={label}
            vertical={VERTICAL_POPOVER_POS.BOTTOM}
            tooltipContent={t(
              "dashboard-page:trading.tooltips.is-not-enough-money",
              { value: necessaryMoney }
            )}
          />
        </Button>
      </PopoverContentListItem>
    );
  }
);

export const ConfirmTFAButton: React.FC<{
  onApply: VoidFunction;
  id: string;
}> = React.memo(({ onApply, id }) => {
  const { t } = useTranslation();
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <>
      <TableCardActionsItem onClick={setOpen}>
        {t("asset-settings:buttons.two-factor-confirm")}
      </TableCardActionsItem>
      <ConfirmContainer
        open={isOpen}
        onClose={setClose}
        onApply={onApply}
        programId={id}
      />
    </>
  );
});

export const getMinDepositCreateProgram = (
  programMinDepositAmounts: ProgramMinInvestAmount[],
  brokerType: BrokerTradeServerType,
  curr: CurrencyEnum
) => {
  const broker = programMinDepositAmounts.find(
    ({ serverType }) => serverType === brokerType
  );
  const minDepositCreateAssetInCurr =
    !!broker &&
    broker.minDepositCreateAsset.find(({ currency }) => {
      if (curr === "USD" && currency === "USDT") {
        return true;
      }
      return currency === curr;
    });

  return minDepositCreateAssetInCurr ? minDepositCreateAssetInCurr.amount : 0;
};
