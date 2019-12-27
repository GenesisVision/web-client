import GVButton from "components/gv-button";
import Hint from "components/hint/hint";
import { useToLink } from "components/link/link.helper";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import StatisticItem from "components/statistic-item/statistic-item";
import TableCard, {
  TableCardRow,
  TableCardTable,
  TableCardTableColumn
} from "components/table/components/table-card/table-card";
import {
  IRenderActionsArgs,
  TableCardActions,
  TableCardActionsItem,
  TableCardActionsItemContainer
} from "components/table/components/table-card/table-card-actions";
import {
  BrokerTradeServerType,
  DashboardTradingAsset,
  ProgramMinInvestAmount
} from "gv-api-web";
import { TEvent } from "hooks/anchor.hook";
import { CLOSEABLE_ASSET } from "modules/asset-settings/close-asset/close-asset";
import CloseAssetButton from "modules/asset-settings/close-asset/close-asset-button";
import { DepositTransferButton } from "modules/transfer/deposit-transfer-button";
import { WithdrawTransferButton } from "modules/transfer/withdraw-transfer-button";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { makeProgramLinkCreator } from "pages/convert-asset/convert-asset.routes";
import { getTerminalLink } from "pages/dashboard/dashboard.helpers";
import { mapAccountToTransferItemType } from "pages/dashboard/services/dashboard.service";
import ChangeAccountPasswordButton from "pages/programs/programs-settings/change-password/change-password-trading-account.button";
import * as React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { programMinDepositAmountsSelector } from "reducers/platform-reducer";
import {
  DECIMAL_SCALE_BIG_VALUE,
  DECIMAL_SCALE_SMALL_VALUE
} from "shared/constants/constants";
import { useTranslation } from "shared/i18n";
import { distanceDate } from "shared/utils/dates";
import { composeAccountDetailsUrl } from "utils/compose-url";
import { formatValueDifferentDecimalScale } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _DashboardPrivateCard: React.FC<Props> = ({ asset, updateItems }) => {
  const programMinDepositAmounts = useSelector(
    programMinDepositAmountsSelector
  );
  const minDepositCreateProgram = getMinDepositCreateProgram(
    programMinDepositAmounts,
    asset.broker.type,
    asset.accountInfo.currency
  );
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const makeSignalLinkMethod = makeProgramLinkCreator({
    assetFrom: CONVERT_ASSET.ACCOUNT,
    assetTo: CONVERT_ASSET.SIGNAL
  });
  const terminalLink = linkCreator(getTerminalLink(asset.broker.type));
  const makeSignalAccountLink = linkCreator(makeSignalLinkMethod(asset.id));
  const makeProgramExternalLinkMethod = makeProgramLinkCreator({
    assetFrom: CONVERT_ASSET.EXTERNAL_ACCOUNT,
    assetTo: CONVERT_ASSET.PROGRAM
  });
  const makeProgramExternalLink = linkCreator(
    makeProgramExternalLinkMethod(asset.id)
  );
  const renderActions = ({ anchor, clearAnchor }: IRenderActionsArgs) => (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      <TableCardActionsItem to={terminalLink} onClick={clearAnchor}>
        {t("dashboard-page.trading.actions.terminal")}
      </TableCardActionsItem>
      {asset.actions.canMakeSignalProviderFromPrivateExternalTradingAccount && (
        <TableCardActionsItem
          to={makeProgramExternalLink}
          onClick={clearAnchor}
        >
          {t("dashboard-page.trading.actions.make-signal-account")}
        </TableCardActionsItem>
      )}
      {asset.actions.canMakeProgramFromPrivateTradingAccount && (
        <MakeProgramButton
          necessaryMoney={`${minDepositCreateProgram} ${asset.accountInfo.currency}`}
          isEnoughMoney={asset.actions.isEnoughMoneyToCreateProgram}
          id={asset.id}
          clearAnchor={clearAnchor}
        />
      )}
      {asset.actions.canMakeSignalProviderFromPrivateTradingAccount && (
        <TableCardActionsItem to={makeSignalAccountLink} onClick={clearAnchor}>
          {t("dashboard-page.trading.actions.make-signal-account")}
        </TableCardActionsItem>
      )}
      {asset.actions.canChangePassword && (
        <ChangeAccountPasswordButton
          id={asset.id}
          title={asset.accountInfo.title}
        />
      )}
      {asset.actions.canClose && (
        <TableCardActionsItemContainer>
          <CloseAssetButton
            noPadding
            assetName={asset.accountInfo.title}
            onApply={updateItems}
            type={CLOSEABLE_ASSET.TRADING_ACCOUNT}
            id={asset.id}
            variant={"text"}
          />
        </TableCardActionsItemContainer>
      )}
    </TableCardActions>
  );
  const detailsLink = linkCreator(composeAccountDetailsUrl(asset.id));
  return (
    <TableCard
      subTitle={t(
        `dashboard-page.trading.asset-types.${asset.accountInfo.type}`
      )}
      detailsUrl={detailsLink}
      assetId={asset.id}
      profit={asset.statistic.profit}
      chart={asset.statistic.chart}
      title={asset.accountInfo.title}
      logo={asset.broker.logo}
      renderActions={renderActions}
    >
      <TableCardTable>
        {asset.accountInfo.currency && (
          <TableCardTableColumn>
            <StatisticItem label={t("programs-page.programs-header.equity")}>
              <NumberFormat
                value={formatValueDifferentDecimalScale(
                  asset.accountInfo.balance,
                  DECIMAL_SCALE_SMALL_VALUE,
                  DECIMAL_SCALE_BIG_VALUE
                )}
                suffix={` ${asset.accountInfo.currency}`}
                displayType="text"
              />
            </StatisticItem>
          </TableCardTableColumn>
        )}
        <TableCardTableColumn>
          <StatisticItem label={t("dashboard-page.trading.leverage")}>
            <NumberFormat
              value={formatValueDifferentDecimalScale(
                asset.accountInfo.leverage,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              displayType="text"
            />
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("dashboard-page.trading.age")}>
            {distanceDate(asset.accountInfo.creationDate)}
          </StatisticItem>
        </TableCardTableColumn>
      </TableCardTable>
      <TableCardRow>
        {asset.actions.canTransferMoney && (
          <>
            <DepositTransferButton
              onApply={updateItems}
              currentItem={mapAccountToTransferItemType(asset)}
              accountType={asset.accountInfo.type}
            />
            <WithdrawTransferButton
              onApply={updateItems}
              currentItem={mapAccountToTransferItemType(asset)}
              accountType={asset.accountInfo.type}
            />
          </>
        )}
      </TableCardRow>
    </TableCard>
  );
};

interface Props {
  updateItems: VoidFunction;
  asset: DashboardTradingAsset;
}

const MakeProgramButton: React.FC<{
  necessaryMoney: string;
  isEnoughMoney: boolean;
  id: string;
  clearAnchor: (event: TEvent) => void;
}> = React.memo(({ isEnoughMoney, id, clearAnchor, necessaryMoney }) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const makeProgramLinkMethod = makeProgramLinkCreator({
    assetFrom: CONVERT_ASSET.ACCOUNT,
    assetTo: CONVERT_ASSET.PROGRAM
  });
  const makeProgramLink = linkCreator(makeProgramLinkMethod(id));
  const label = t("dashboard-page.trading.actions.make-program");
  return isEnoughMoney ? (
    <TableCardActionsItem to={makeProgramLink} onClick={clearAnchor}>
      {label}
    </TableCardActionsItem>
  ) : (
    <GVButton variant="text" color="secondary">
      <Hint
        content={label}
        className="dashboard-trading__disable-button"
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        tooltipContent={t(
          "dashboard-page.trading.tooltips.is-not-enough-money",
          { value: necessaryMoney }
        )}
      />
    </GVButton>
  );
});

const getMinDepositCreateProgram = (
  programMinDepositAmounts: ProgramMinInvestAmount[],
  brokerType: BrokerTradeServerType,
  curr: CurrencyEnum
) => {
  const broker = programMinDepositAmounts.find(
    ({ serverType }) => serverType === brokerType
  );
  return broker
    ? broker.minDepositCreateAsset.find(({ currency }) => currency === curr)!
        .amount
    : 0;
};

const DashboardPrivateCard = React.memo(_DashboardPrivateCard);
export default DashboardPrivateCard;
