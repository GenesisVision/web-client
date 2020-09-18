import { LabeledValue } from "components/labeled-value/labeled-value";
import { useToLink } from "components/link/link.helper";
import TableCard, {
  TableCardRow,
  TableCardTable,
  TableCardTableColumn
} from "components/table/components/table-card/table-card";
import { IRenderActionsArgs } from "components/table/components/table-card/table-card-actions";
import TagProgramContainer from "components/tags/tag-program-container/tag-program-container";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import {
  DECIMAL_SCALE_BIG_VALUE,
  DECIMAL_SCALE_SMALL_VALUE
} from "constants/constants";
import { DashboardTradingAsset } from "gv-api-web";
import { useTranslation } from "i18n";
import { DashboardPrivateCardActions } from "pages/dashboard/components/dashboard-trading/dashboard-private-card/dashboard-private-card-actions";
import { DashboardPrivateCardTransfer } from "pages/dashboard/components/dashboard-trading/dashboard-private-card/dashboard-private-card-transfer";
import * as React from "react";
import NumberFormat from "react-number-format";
import { ACCOUNT_DETAILS_ROUTE } from "routes/accounts.routes";
import { composeAccountDetailsUrl } from "utils/compose-url";
import { convertDateToShortFormat, distanceDate } from "utils/dates";
import { formatValueDifferentDecimalScale } from "utils/formatter";

const _DashboardPrivateCard: React.FC<Props> = ({ asset, updateItems }) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const renderActions = (actionsArgs: IRenderActionsArgs) => (
    <DashboardPrivateCardActions
      actionsArgs={actionsArgs}
      updateItems={updateItems}
      asset={asset}
    />
  );
  const detailsLink = linkCreator(
    composeAccountDetailsUrl(asset.id),
    ACCOUNT_DETAILS_ROUTE
  );
  return (
    <TableCard
      subTitle={t(
        `dashboard-page:trading.asset-types.${asset.accountInfo.type}`
      )}
      detailsUrl={detailsLink}
      assetId={asset.id}
      profit={asset.statistic.profit}
      chart={asset.statistic.chart}
      title={asset.accountInfo.title}
      logo={asset.broker.logoUrl}
      renderActions={renderActions}
      extraBlock={asset.tags && <TagProgramContainer tags={asset.tags} />}
    >
      <TableCardTable>
        {asset.accountInfo.currency && (
          <TableCardTableColumn>
            <LabeledValue
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "dashboard-page:tooltips.private-card.equity"
                  )}
                  labelText={t("header-fields.equity")}
                />
              }
            >
              <NumberFormat
                value={formatValueDifferentDecimalScale(
                  asset.accountInfo.balance,
                  DECIMAL_SCALE_SMALL_VALUE,
                  DECIMAL_SCALE_BIG_VALUE
                )}
                suffix={` ${asset.accountInfo.currency}`}
                displayType="text"
              />
            </LabeledValue>
          </TableCardTableColumn>
        )}
        <TableCardTableColumn>
          <LabeledValue
            label={
              <TooltipLabel
                tooltipContent={t(
                  "dashboard-page:tooltips.private-card.leverage"
                )}
                labelText={t("dashboard-page:trading.leverage")}
              />
            }
          >
            <NumberFormat
              value={formatValueDifferentDecimalScale(
                asset.accountInfo.leverage,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              displayType="text"
            />
          </LabeledValue>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <LabeledValue
            label={
              <TooltipLabel
                tooltipContent={t("dashboard-page:tooltips.private-card.age")}
                labelText={t("dashboard-page:trading.age")}
              />
            }
          >
            {convertDateToShortFormat(
              distanceDate(asset.accountInfo.creationDate)
            )}
          </LabeledValue>
        </TableCardTableColumn>
      </TableCardTable>
      <TableCardRow>
        <DashboardPrivateCardTransfer updateItems={updateItems} asset={asset} />
      </TableCardRow>
    </TableCard>
  );
};

interface Props {
  updateItems: VoidFunction;
  asset: DashboardTradingAsset;
}

const DashboardPrivateCard = React.memo(_DashboardPrivateCard);
export default DashboardPrivateCard;
