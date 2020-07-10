import Table from "components/table/components/table";
import { withBlurLoader } from "decorators/with-blur-loader";
import { SignalSubscription } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import { SubscriptionTableRow } from "./subscription-table-row";
import { SUBSCRIPTION_COLUMNS } from "./subscription.helpers";

const _SubscriptionTable: React.FC<Props> = ({
  id,
  data,
  onApply,
  assetCurrency
}) => {
  const [t] = useTranslation();
  return (
    <Table
      hideToolbar
      columns={SUBSCRIPTION_COLUMNS}
      items={data}
      renderHeader={column => (
        <span>
          {t(`follow-details-page:current-investment.fields.${column.name}`)}
        </span>
      )}
      renderBodyRow={(data: SignalSubscription) => (
        <SubscriptionTableRow
          id={id}
          assetCurrency={assetCurrency}
          onApply={onApply}
          data={data}
        />
      )}
    />
  );
};

interface Props {
  assetCurrency: CurrencyEnum;
  onApply: VoidFunction;
  data: SignalSubscription[];
  id: string;
}

const SubscriptionTable = withBlurLoader(React.memo(_SubscriptionTable));
export default SubscriptionTable;
