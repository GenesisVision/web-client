import { DetailsPerformanceData } from "components/details/details-description-section/details-description/details-structure-blocks";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { RowItem } from "components/row-item/row-item";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "utils/dates";

import { AccountDetailsDataType } from "../account-details.types";

const _PerformanceData: React.FC<Props> = ({
  description: {
    publicInfo: { creationDate },
    tradingAccountInfo: { leverage, currency }
  }
}) => {
  const [t] = useTranslation();
  return (
    <DetailsPerformanceData>
      {leverage && (
        <RowItem size={"xlarge"}>
          <LabeledValue label={t("asset-details:description.leverage")}>
            {leverage}
          </LabeledValue>
        </RowItem>
      )}
      {currency && (
        <RowItem size={"xlarge"}>
          <LabeledValue label={t("asset-details:description.currency")}>
            {currency}
          </LabeledValue>
        </RowItem>
      )}
      <RowItem size={"xlarge"}>
        <LabeledValue label={t("asset-details:description.creation-date")}>
          {formatDate(creationDate)}
        </LabeledValue>
      </RowItem>
    </DetailsPerformanceData>
  );
};

interface Props {
  description: AccountDetailsDataType;
}

const PerformanceData = React.memo(_PerformanceData);
export default PerformanceData;
