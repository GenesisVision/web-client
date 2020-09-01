import { useToLink } from "components/link/link.helper";
import {
  TableCardActions,
  TableCardActionsItem
} from "components/table/components/table-card/table-card-actions";
import {
  AssetType,
  BrokerTradeServerType,
  DashboardTradingAssetActions
} from "gv-api-web";
import { TAnchor } from "hooks/anchor.hook";
import { useTranslation } from "i18n";
import ClosePeriodButton from "modules/asset-settings/close-period/close-period-button";
import MakeSignalButton from "modules/program-signal-popup/make-signal.button";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { makeProgramLinkCreator } from "pages/convert-asset/convert-asset.routes";
import {
  getMinDepositCreateProgram,
  MakeProgramButton
} from "pages/dashboard/components/dashboard-trading/dashboard-private-card.helpers";
import { getTerminalLink } from "pages/dashboard/dashboard.helpers";
import ChangeAccountPasswordButton from "pages/invest/programs/programs-settings/change-password/change-password-trading-account.button";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { programMinDepositAmountsSelector } from "reducers/platform-reducer";
import {
  createFundSettingsToUrl,
  createProgramSettingsToUrl
} from "utils/compose-url";
import { CurrencyEnum } from "utils/types";

interface IDashboardPublicCardActionsProps {
  currency: CurrencyEnum;
  brokerType: BrokerTradeServerType;
  onApply: VoidFunction;
  name: string;
  actions: DashboardTradingAssetActions;
  assetType: AssetType;
  clearAnchor: VoidFunction;
  anchor?: TAnchor;
  url?: string;
  id: string;
  showTerminal: boolean;
  showClosePeriod: boolean;
}

const _DashboardPublicCardActions: React.FC<IDashboardPublicCardActionsProps> = ({
  currency,
  brokerType,
  onApply,
  name,
  assetType,
  actions: {
    isEnoughMoneyToCreateProgram,
    canMakeExchangeProgramFromPrivateTradingAccount,
    canMakeSignalProviderFromProgram,
    canMakeProgramFromPrivateTradingAccount,
    canMakeProgramFromSignalProvider,
    canChangePassword
  },
  anchor,
  clearAnchor,
  url,
  id,
  showTerminal,
  showClosePeriod
}) => {
  const programMinDepositAmounts = useSelector(
    programMinDepositAmountsSelector
  );
  const minDepositCreateProgram = getMinDepositCreateProgram(
    programMinDepositAmounts,
    brokerType,
    currency
  );
  const { linkCreator, contextTitle } = useToLink();
  const [t] = useTranslation();
  const terminalLink = brokerType
    ? linkCreator(getTerminalLink(brokerType))
    : "";
  const createSettingsToUrlMethod =
    assetType === "Fund" ? createFundSettingsToUrl : createProgramSettingsToUrl;
  const settingsLink = url ? createSettingsToUrlMethod(url, contextTitle) : "";
  const makeProgramLinkMethod = makeProgramLinkCreator({
    assetFrom: canMakeExchangeProgramFromPrivateTradingAccount
      ? CONVERT_ASSET.EXCHANGE_ACCOUNT
      : CONVERT_ASSET.SIGNAL,
    assetTo: CONVERT_ASSET.PROGRAM
  });
  const makeProgramLink = linkCreator(makeProgramLinkMethod(id));
  const handleOnApply = useCallback(() => {
    clearAnchor();
    onApply();
  }, []);
  return (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      {canMakeSignalProviderFromProgram && (
        <MakeSignalButton onApply={handleOnApply} id={id} programName={name} />
      )}
      {(canMakeProgramFromPrivateTradingAccount ||
        canMakeExchangeProgramFromPrivateTradingAccount ||
        canMakeProgramFromSignalProvider) && (
        <MakeProgramButton
          makeProgramLink={makeProgramLink}
          necessaryMoney={`${minDepositCreateProgram} ${currency}`}
          isEnoughMoney={isEnoughMoneyToCreateProgram}
          id={id}
          clearAnchor={clearAnchor}
        />
      )}
      <TableCardActionsItem to={settingsLink} onClick={clearAnchor}>
        {t("dashboard-page:trading.actions.settings")}
      </TableCardActionsItem>
      {showTerminal && (
        <TableCardActionsItem to={terminalLink} onClick={clearAnchor}>
          {t("dashboard-page:trading.actions.terminal")}
        </TableCardActionsItem>
      )}
      {showClosePeriod && <ClosePeriodButton id={id} />}
      {canChangePassword && (
        <ChangeAccountPasswordButton id={id} title={contextTitle} />
      )}
    </TableCardActions>
  );
};

export const DashboardPublicCardActions = React.memo(
  _DashboardPublicCardActions
);
