import {
  DetailsBroker,
  DetailsPerformanceData
} from "components/details/details-description-section/details-description/details-structure-blocks";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { RowItem } from "components/row-item/row-item";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { FollowDetailsDataType } from "../follow-details.types";

const _PerformanceData: React.FC<Props> = ({ description }) => {
  const [t] = useTranslation();
  return (
    <DetailsPerformanceData>
      <RowItem size={"xlarge"}>
        <LabeledValue label={t("asset-details:description.broker")}>
          <DetailsBroker
            name={"broker"}
            logoUrl={description.brokerDetails.logoUrl}
          />
        </LabeledValue>
      </RowItem>
      <RowItem size={"xlarge"}>
        <LabeledValue label={t("asset-details:description.currency")}>
          {description.currency}
        </LabeledValue>
      </RowItem>
    </DetailsPerformanceData>
  );
};

interface Props {
  description: FollowDetailsDataType;
}

const PerformanceData = React.memo(_PerformanceData);
export default PerformanceData;
