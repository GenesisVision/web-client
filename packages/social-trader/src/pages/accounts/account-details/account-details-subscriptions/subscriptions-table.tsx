import Table from "components/table/components/table";
import { withBlurLoader } from "decorators/with-blur-loader";
import SubscriptionsTableRow from "pages/accounts/account-details/account-details-subscriptions/subscriptions-table-row";
import { SUBSCRIPTIONS_COLUMNS } from "pages/accounts/account-details/account-details-subscriptions/subscriptions.helpers";
import {
  AccountSubscriptionsDataType,
  AccountSubscriptionsType
} from "pages/accounts/account-details/services/account-details.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

const _SubscriptionsTable: React.FC<Props> = ({
  id,
  data,
  onApply,
  assetCurrency
}) => {
  const [t] = useTranslation();
  return (
    <Table
      hideToolbar
      columns={SUBSCRIPTIONS_COLUMNS}
      items={data}
      renderHeader={column => (
        <span>
          {t(`account-details-page:subscriptions.table.${column.name}`)}
        </span>
      )}
      renderBodyRow={(provider: AccountSubscriptionsDataType) => (
        <SubscriptionsTableRow
          id={id}
          assetCurrency={assetCurrency}
          onApply={onApply}
          provider={provider}
        />
      )}
    />
  );
};

interface Props {
  assetCurrency: CurrencyEnum;
  onApply: VoidFunction;
  data: AccountSubscriptionsType;
  id: string;
}

const SubscriptionsTable = withBlurLoader(React.memo(_SubscriptionsTable));
export default SubscriptionsTable;
