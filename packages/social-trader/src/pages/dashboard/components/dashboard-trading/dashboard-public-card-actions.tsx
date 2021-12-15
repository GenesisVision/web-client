import { useToLink } from "components/link/link.helper";
import {
  TableCardActions,
  TableCardActionsItem
} from "components/table/components/table-card/table-card-actions";
import { ASSET } from "constants/constants";
import { DashboardTradingAsset } from "gv-api-web";
import { TAnchor } from "hooks/anchor.hook";
import { useTranslation } from "i18n";
import ClosePeriodButton from "modules/asset-settings/close-period/close-period-button";
import { MakePublicFundCardOption } from "modules/fund-public-popup/make-public-fund.button";
import MakeSignalButton from "modules/program-signal-popup/make-signal.button";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { makeProgramLinkCreator } from "pages/convert-asset/convert-asset.routes";
import {
  ConfirmTFAButton,
  getMinDepositCreateProgram,
  MakeProgramButton
} from "pages/dashboard/components/dashboard-trading/dashboard-private-card.helpers";
import { getTerminalLink } from "pages/dashboard/dashboard.helpers";
import ChangeAccountPasswordButton from "pages/invest/programs/programs-settings/change-password/change-password-trading-account.button";
import { getTerminalType } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { programMinDepositAmountsSelector } from "reducers/platform-reducer";
import {
  createFundSettingsToUrl,
  createProgramApiKeysToUrl,
  createProgramSettingsToUrl
} from "utils/compose-url";

interface IDashboardPublicCardActionsProps {
  asset: DashboardTradingAsset;
  onApply: VoidFunction;
  clearAnchor: VoidFunction;
  anchor?: TAnchor;
}

const _DashboardPublicCardActions: React.FC<IDashboardPublicCardActionsProps> = ({
  asset,
  onApply,
  anchor,
  clearAnchor
}) => {
  const {
    accountInfo: { currency, permissions },
    broker,
    assetTypeExt,
    assetType,
    id,
    publicInfo: { title, url },
    actions: {
      canCreateApiKeys,
      canClosePeriod,
      hasTerminal,
      canConfirm2FA,
      isEnoughMoneyToCreateProgram,
      canMakeSignalProviderFromProgram,
      canMakeProgramFromPrivateTradingAccount,
      canMakeProgramFromSignalProvider,
      canChangePassword
    }
  } = asset;
  const showClosePeriod = assetType === ASSET.PROGRAM && canClosePeriod;
  const programMinDepositAmounts = useSelector(
    programMinDepositAmountsSelector
  );
  const minDepositCreateProgram = getMinDepositCreateProgram(
    programMinDepositAmounts,
    broker?.type,
    currency
  );
  const { linkCreator, contextTitle } = useToLink();
  const [t] = useTranslation();

  const apiKeysLink = createProgramApiKeysToUrl(url, contextTitle);

  const terminalLink = broker?.type
    ? linkCreator(
        getTerminalLink({
          id,
          brokerType: broker?.type,
          terminalType: getTerminalType(permissions)
        })
      )
    : "";

  const createSettingsToUrlMethod =
    assetType === "Fund" ? createFundSettingsToUrl : createProgramSettingsToUrl;
  const settingsLink = url ? createSettingsToUrlMethod(url, contextTitle) : "";

  const makeProgramLinkMethod = makeProgramLinkCreator({
    assetFrom: CONVERT_ASSET.SIGNAL,
    assetTo: CONVERT_ASSET.PROGRAM
  });
  const makeProgramLink = linkCreator(makeProgramLinkMethod(id));

  const handleOnApply = useCallback(() => {
    clearAnchor();
    onApply();
  }, []);

  const isSelfManagedFund = assetTypeExt === "SelfManagedFund";

  return (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      {isSelfManagedFund && (
        <MakePublicFundCardOption
          id={id}
          onApply={handleOnApply}
          title={asset.publicInfo.title}
        />
      )}
      {canMakeSignalProviderFromProgram && (
        <MakeSignalButton onApply={handleOnApply} id={id} programName={title} />
      )}
      {(canMakeProgramFromPrivateTradingAccount ||
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
      {hasTerminal && (
        <TableCardActionsItem to={terminalLink} onClick={clearAnchor}>
          {t("dashboard-page:trading.actions.terminal")}
        </TableCardActionsItem>
      )}
      {showClosePeriod && <ClosePeriodButton id={id} />}
      {canChangePassword && (
        <ChangeAccountPasswordButton id={id} title={contextTitle} />
      )}
      {canConfirm2FA && <ConfirmTFAButton onApply={handleOnApply} id={id} />}
      {canCreateApiKeys && (
        <TableCardActionsItem to={apiKeysLink} onClick={clearAnchor}>
          {t("dashboard-page:trading.actions.api-keys")}
        </TableCardActionsItem>
      )}
    </TableCardActions>
  );
};

export const DashboardPublicCardActions = React.memo(
  _DashboardPublicCardActions
);
