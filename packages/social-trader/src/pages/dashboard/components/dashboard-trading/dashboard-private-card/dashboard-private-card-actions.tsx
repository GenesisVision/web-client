import { useToLink } from "components/link/link.helper";
import { PopoverContentListItem } from "components/popover/popover-content";
import {
  IRenderActionsArgs,
  TableCardActions,
  TableCardActionsItem
} from "components/table/components/table-card/table-card-actions";
import { DashboardTradingAsset } from "gv-api-web";
import CloseAssetButton from "modules/asset-settings/close-asset/close-asset-button";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { makeProgramLinkCreator } from "pages/convert-asset/convert-asset.routes";
import {
  ConfirmTFAButton,
  getMinDepositCreateProgram,
  MakeProgramButton
} from "pages/dashboard/components/dashboard-trading/dashboard-private-card.helpers";
import { getTerminalLink } from "pages/dashboard/dashboard.helpers";
import ChangeAccountPasswordButton
  from "pages/invest/programs/programs-settings/change-password/change-password-trading-account.button";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { programMinDepositAmountsSelector } from "reducers/platform-reducer";
import { createAccountApiKeysToUrl } from "utils/compose-url";

interface Props {
  updateItems: VoidFunction;
  asset: DashboardTradingAsset;
  actionsArgs: IRenderActionsArgs;
}

const _DashboardPrivateCardActions: React.FC<Props> = ({
  updateItems,
  asset,
  actionsArgs: { clearAnchor, anchor }
}) => {
  const [t] = useTranslation();
  const { linkCreator, contextTitle } = useToLink();
  const makeSignalLinkMethod = makeProgramLinkCreator({
    assetFrom: CONVERT_ASSET.ACCOUNT,
    assetTo: CONVERT_ASSET.SIGNAL
  });

  const apiKeysLink = createAccountApiKeysToUrl(asset.id, contextTitle);
  const terminalLink = linkCreator(
    getTerminalLink(asset.broker.type, asset.id)
  );
  const makeSignalAccountLink = linkCreator(makeSignalLinkMethod(asset.id));
  const makeProgramExternalLinkMethod = makeProgramLinkCreator({
    assetFrom: CONVERT_ASSET.EXTERNAL_ACCOUNT,
    assetTo: CONVERT_ASSET.PROGRAM
  });
  const makeProgramExternalLink = linkCreator(
    makeProgramExternalLinkMethod(asset.id)
  );
  const programMinDepositAmounts = useSelector(
    programMinDepositAmountsSelector
  );
  const minDepositCreateProgram = getMinDepositCreateProgram(
    programMinDepositAmounts,
    asset.broker.type,
    asset.accountInfo.currency
  );
  return (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      {asset.actions.hasTerminal && (
        <TableCardActionsItem to={terminalLink} onClick={clearAnchor}>
          {t("dashboard-page:trading.actions.terminal")}
        </TableCardActionsItem>
      )}
      {asset.actions.canMakeSignalProviderFromPrivateExternalTradingAccount && (
        <TableCardActionsItem
          to={makeProgramExternalLink}
          onClick={clearAnchor}
        >
          {t("dashboard-page:trading.actions.make-signal-account")}
        </TableCardActionsItem>
      )}
      {(asset.actions.canMakeExchangeProgramFromPrivateTradingAccount ||
        asset.actions.canMakeProgramFromPrivateTradingAccount) && (
        <MakeProgramButton
          isExchange={
            asset.actions.canMakeExchangeProgramFromPrivateTradingAccount
          }
          necessaryMoney={`${minDepositCreateProgram} ${asset.accountInfo.currency}`}
          isEnoughMoney={asset.actions.isEnoughMoneyToCreateProgram}
          id={asset.id}
          clearAnchor={clearAnchor}
        />
      )}
      {asset.actions.canMakeSignalProviderFromPrivateTradingAccount && (
        <TableCardActionsItem to={makeSignalAccountLink} onClick={clearAnchor}>
          {t("dashboard-page:trading.actions.make-signal-account")}
        </TableCardActionsItem>
      )}
      {asset.actions.canChangePassword && (
        <ChangeAccountPasswordButton
          id={asset.id}
          title={asset.accountInfo.title}
        />
      )}
      {asset.actions.canClose && (
        <PopoverContentListItem>
          <CloseAssetButton
            noPadding
            assetName={asset.accountInfo.title}
            onApply={updateItems}
            type={asset.accountInfo.type}
            id={asset.id}
            variant={"text"}
          />
        </PopoverContentListItem>
      )}
      {asset.actions.canConfirm2FA && (
        <ConfirmTFAButton onApply={updateItems} id={asset.id} />
      )}
      {asset.actions.canCreateApiKeys && (
        <TableCardActionsItem to={apiKeysLink} onClick={clearAnchor}>
          {t("dashboard-page:trading.actions.api-keys")}
        </TableCardActionsItem>
      )}
    </TableCardActions>
  );
};

export const DashboardPrivateCardActions = React.memo(
  _DashboardPrivateCardActions
);
