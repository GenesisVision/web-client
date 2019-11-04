import { TRecommendation } from "pages/dashboard/dashboard.types";
import * as React from "react";
import TableCard from "shared/components/table/components/table-card/table-card";
import useIsOpen from "shared/hooks/is-open.hook";
import { useTranslation } from "shared/i18n";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";

interface Props {
  asset: TRecommendation;
  title: string;
}

const _DashboardPrivateCard: React.FC<Props> = ({ asset, title }) => {
  const [t] = useTranslation();
  const [
    isOpenInvestPopup,
    setIsOpenInvestPopup,
    setIsCloseInvestPopup
  ] = useIsOpen();
  const linkProps = {
    pathname: composeProgramDetailsUrl(asset.url),
    state: `/ ${title}`
  };

  const renderDepositContainer = () => {};

  return (
    <TableCard
      asset={asset}
      detailsUrl={linkProps}
      pathTitle={title}
      profit={asset.statistic.profit}
      profitPercent={asset.statistic.profitPercent}
    ></TableCard>
  );
};

const DashboardPrivateCard = React.memo(_DashboardPrivateCard);
export default DashboardPrivateCard;
