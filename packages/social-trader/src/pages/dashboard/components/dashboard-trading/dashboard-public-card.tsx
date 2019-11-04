import ProgramDeposit from "modules/program-deposit/program-deposit";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import { TAsset } from "pages/dashboard/dashboard.types";
import React from "react";
import GVButton from "shared/components/gv-button";
import TableCard, {
  TableCardRow
} from "shared/components/table/components/table-card/table-card";
import useIsOpen from "shared/hooks/is-open.hook";
import { useTranslation } from "shared/i18n";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";

const _DashboardPublicCard: React.FC<{ asset: TAsset; title: string }> = ({
  asset,
  title
}) => {
  const [
    isOpenInvestPopup,
    setIsOpenInvestPopup,
    setIsCloseInvestPopup
  ] = useIsOpen();
  const [
    isOpenWithdrawPopup,
    setIsOpenWithdrawPopup,
    setIsCloseWithdrawPopup
  ] = useIsOpen();
  const [t] = useTranslation();
  const linkProps = {
    pathname: composeProgramDetailsUrl(asset.url),
    state: `/ ${title}`
  };
  return (
    <TableCard
      asset={asset}
      detailsUrl={linkProps}
      pathTitle={title}
      profit={asset.statistic.profit}
      profitPercent={asset.statistic.profitPercent}
    >
      <TableCardRow>
        <GVButton
          className="table-cards__button"
          onClick={setIsOpenInvestPopup}
        >
          {t(`dashboard-page.recommendations.program`)}
        </GVButton>
        <GVButton
          color="secondary"
          variant="outlined"
          onClick={setIsOpenWithdrawPopup}
        >
          {t("fund-details-page.description.withdraw")}
        </GVButton>
      </TableCardRow>
      <ProgramDeposit
        currency={asset.currency}
        open={isOpenInvestPopup}
        id={asset.id}
        onClose={setIsCloseInvestPopup}
        onApply={() => {}}
      />
      <ProgramWithdrawContainer
        open={isOpenWithdrawPopup}
        id={asset.id}
        accountCurrency={"GVT"}
        assetCurrency={asset.currency}
        onClose={setIsCloseWithdrawPopup}
        onSubmit={() => {}}
      />
    </TableCard>
  );
};

const DashboardPublicCard = React.memo(_DashboardPublicCard);
export default DashboardPublicCard;
