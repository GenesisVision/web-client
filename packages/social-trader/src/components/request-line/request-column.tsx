import { CancelRequestButton } from "components/request-line/cancel-request-button";
import { RequestColumnContainer } from "components/request-line/request-line-container";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { AssetInvestmentRequest } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { localizedDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";

const RequestColumnItem: React.FC<{ label: string | JSX.Element }> = ({
  children,
  label
}) => {
  return (
    <Row size={"small"}>
      <RowItem wide>
        <Text muted wrap={false}>
          {label}
        </Text>
      </RowItem>
      <RowItem>
        <Text wrap={false}>{children}</Text>
      </RowItem>
    </Row>
  );
};

const _RequestColumn: React.FC<Props> = ({
  request: { assetDetails, type, amount, currency, date, canCancelRequest, id },
  onApplyCancelRequest
}) => {
  const {
    successFee,
    entryFee,
    exitFee,
    managementFee,
    assetType
  } = assetDetails;
  const [t] = useTranslation();
  return (
    <RequestColumnContainer>
      <RequestColumnItem label={type}>{localizedDate(date)}</RequestColumnItem>
      <RequestColumnItem label={t("Value")}>
        {assetDetails.isWithdrawAll ? (
          t("withdraw-program.withdrawing-all")
        ) : (
          <NumberFormat
            value={formatCurrencyValue(amount, currency)}
            decimalScale={8}
            displayType="text"
            allowNegative={false}
            suffix={` ${currency}`}
          />
        )}
      </RequestColumnItem>
      {successFee !== null && (
        <RequestColumnItem label={t("asset-details:description.successFee")}>
          <NumberFormat
            value={successFee}
            suffix={` %`}
            allowNegative={false}
            displayType="text"
          />
        </RequestColumnItem>
      )}
      {assetType === "Fund" ? (
        <>
          {entryFee !== null && (
            <RequestColumnItem label={t("asset-details:description.entryFee")}>
              <NumberFormat
                value={entryFee}
                suffix={` %`}
                allowNegative={false}
                displayType="text"
              />
            </RequestColumnItem>
          )}
        </>
      ) : (
        <>
          {managementFee !== null && (
            <RequestColumnItem
              label={t("asset-details:description.management-fee")}
            >
              <NumberFormat
                value={managementFee}
                suffix={` %`}
                allowNegative={false}
                displayType="text"
              />
            </RequestColumnItem>
          )}
        </>
      )}
      {exitFee !== null && (
        <RequestColumnItem label={t("asset-details:description.exitFee")}>
          <NumberFormat
            value={exitFee}
            suffix={` %`}
            allowNegative={false}
            displayType="text"
          />
        </RequestColumnItem>
      )}
      {canCancelRequest && (
        <Row>
          <CancelRequestButton
            onApplyCancelRequest={onApplyCancelRequest}
            id={id}
          />
        </Row>
      )}
    </RequestColumnContainer>
  );
};

interface Props {
  request: AssetInvestmentRequest;
  onApplyCancelRequest: () => void;
}

const RequestColumn = React.memo(_RequestColumn);
export default RequestColumn;
