import "./request-line.scss";

import ConfirmPopup from "components/confirm-popup/confirm-popup";
import PortfolioEventLogo from "components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import GVButton from "components/gv-button";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { AssetInvestmentRequest } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import investmentsApi from "services/api-client/investments-api";
import authService from "services/auth-service";
import { ASSET } from "shared/constants/constants";
import { localizedDate } from "shared/utils/dates";
import { formatCurrencyValue } from "utils/formatter";

const _RequestLine: React.FC<Props> = ({
  successFee,
  exitFee,
  request,
  onApplyCancelRequest
}) => {
  const [t] = useTranslation();
  const [disabled, setDisabled, setNotDisabled] = useIsOpen();
  const { sendRequest } = useApiRequest({
    request: (id: string) =>
      investmentsApi.cancelRequest(id, authService.getAuthArg()),
    middleware: [onApplyCancelRequest, setNotDisabled]
  });
  const handleApplyCancelRequest = useCallback(() => {
    setDisabled();
    sendRequest(request.id);
  }, [request.id]);
  return (
    <div className="request-line">
      <div className="request-line__logo">
        <PortfolioEventLogo assetDetails={request.assetDetails} icon={""} />
      </div>
      <StatisticItemList className="request-line__values">
        <StatisticItem label={request.assetDetails.title} invert accent>
          {request.type}
        </StatisticItem>
        <StatisticItem
          label={
            request.assetDetails.isWithdrawAll ? (
              t("withdraw-program.withdrawing-all")
            ) : (
              <NumberFormat
                value={formatCurrencyValue(request.amount, request.currency)}
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
          condition={successFee !== null && successFee !== undefined}
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
          label={
            <NumberFormat
              value={request.assetDetails.entryFee}
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
          condition={exitFee !== null && exitFee !== undefined}
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
      </StatisticItemList>
      {request.canCancelRequest && (
        <CancelRequestBlock
          handleApplyCancelRequest={handleApplyCancelRequest}
          disabled={disabled}
        />
      )}
    </div>
  );
};

const CancelRequestBlock: React.FC<{
  handleApplyCancelRequest: () => void;
  disabled: boolean;
}> = React.memo(({ handleApplyCancelRequest, disabled }) => {
  const [t] = useTranslation();
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  return (
    <>
      <GVButton color="primary" variant="text" onClick={setOpenPopup}>
        {t("buttons.cancel")}
      </GVButton>
      <ConfirmPopup
        open={isOpenPopup}
        onClose={setClosePopup}
        onCancel={setClosePopup}
        onApply={handleApplyCancelRequest}
        header={t("request-line.cancel-header")}
        body={t("request-line.cancel-body")}
        applyButtonText={t("buttons.confirm")}
        className="dialog--wider"
        disabled={disabled}
      />
    </>
  );
});

interface Props {
  successFee?: number;
  exitFee?: number;
  request: AssetInvestmentRequest;
  onApplyCancelRequest: () => void;
  asset?: ASSET;
}

const RequestLine = React.memo(_RequestLine);
export default RequestLine;
