import { AssetDetailsAssetTypeEnum, ProgramRequest } from "gv-api-web";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import PortfolioEventLogo from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import GVButton from "shared/components/gv-button";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ASSET, ROLE } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import useRole from "shared/hooks/use-role.hook";
import { localizedDate } from "shared/utils/dates";
import { formatCurrencyValue } from "shared/utils/formatter";

import { CancelRequestPropsType } from "../../dashboard.constants";

const _DashboardRequest: React.FC<Props> = ({
  successFee,
  exitFee,
  request,
  cancelRequest,
  onApplyCancelRequest,
  asset = ASSET.PROGRAM
}) => {
  const [t] = useTranslation();
  const role = useRole();
  const isInvestor = role === ROLE.INVESTOR;
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const [disabled, setDisabled, setNotDisabled] = useIsOpen();
  const handleApplyCancelRequest = useCallback(() => {
    setDisabled();
    const onFinally = () => onApplyCancelRequest();
    const removeDisableBtn = () => setNotDisabled();
    cancelRequest({
      id: request.id,
      onFinally,
      removeDisableBtn,
      role,
      asset
    });
  }, [request.id, role, asset]);
  const assetDetails = {
    logo: request.logo,
    title: request.title,
    color: request.color,
    url: "",
    id: request.programId,
    assetType: "Programs" as AssetDetailsAssetTypeEnum
  };
  return (
    <div className="dashboard-request-popover__request">
      <div className="dashboard-request-popover__logo">
        <PortfolioEventLogo assetDetails={assetDetails} icon={""} />
      </div>
      <StatisticItem
        className={
          "dashboard-request-popover__statistic-item dashboard-request-popover__statistic-item--title"
        }
        label={request.title}
        invert
        accent
      >
        {request.type}
      </StatisticItem>
      <StatisticItem
        className={"dashboard-request-popover__statistic-item"}
        label={
          request.withdrawAll ? (
            t("withdraw-program.withdrawing-all")
          ) : (
            <NumberFormat
              value={formatCurrencyValue(request.value, request.currency)}
              decimalScale={8}
              displayType="text"
              allowNegative={false}
              suffix={` ${request.currency}`}
            />
          )
        }
        invert
      >
        {localizedDate(request.date)}
      </StatisticItem>
      <StatisticItem
        className={"dashboard-request-popover__statistic-item"}
        condition={
          isInvestor && successFee !== null && successFee !== undefined
        }
        label={
          <NumberFormat
            value={successFee}
            suffix={` %`}
            allowNegative={false}
            displayType="text"
          />
        }
        invert
      >
        {t("program-details-page.description.successFee")}
      </StatisticItem>
      <StatisticItem
        className={"dashboard-request-popover__statistic-item"}
        condition={
          isInvestor &&
          request.type === "Invest" &&
          request.entryFee !== null &&
          request.entryFee !== undefined
        }
        label={
          <NumberFormat
            value={request.entryFee}
            suffix={` %`}
            allowNegative={false}
            displayType="text"
          />
        }
        invert
      >
        {t("fund-details-page.description.entryFee")}
      </StatisticItem>
      <StatisticItem
        className={"dashboard-request-popover__statistic-item"}
        condition={isInvestor && exitFee !== null && exitFee !== undefined}
        label={
          <NumberFormat
            value={exitFee}
            suffix={` %`}
            allowNegative={false}
            displayType="text"
          />
        }
        invert
      >
        {t("fund-details-page.description.exitFee")}
      </StatisticItem>
      <div className="dashboard-request-popover__btns">
        {request.canCancelRequest && (
          <GVButton color="primary" variant="text" onClick={setOpenPopup}>
            {t("buttons.cancel")}
          </GVButton>
        )}
        <ConfirmPopup
          open={isOpenPopup}
          onClose={setClosePopup}
          onCancel={setClosePopup}
          onApply={handleApplyCancelRequest}
          header={"Cancel request"}
          body={"Please confirm that you want to cancel the request."}
          applyButtonText={t("buttons.confirm")}
          className="dialog--wider"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export interface Props extends OwnProps {}

interface OwnProps {
  successFee?: number;
  exitFee?: number;
  request: ProgramRequest;
  cancelRequest: (x: CancelRequestPropsType) => void;
  onApplyCancelRequest(): void;
  asset?: ASSET;
}

const DashboardRequest = React.memo(_DashboardRequest);
export default DashboardRequest;
