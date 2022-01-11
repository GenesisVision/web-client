import { DefaultTableBlock } from "components/default.block/default-table.block";
import FacetContainer, {
  FACET_ASSET
} from "components/facet-container/facet-container";
import Page from "components/page/page";
import { Row } from "components/row/row";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { IDataModel } from "constants/constants";
import useApiRequest from "hooks/api-request.hook";
import FundsTable from "modules/funds-table/components/funds-table/funds-table";
import {
  fetchFunds,
  fetchFundsChallengeWinner
} from "modules/funds-table/services/funds-table.service";
import FundsFacetTable from "pages/invest/funds/funds-facet/components/funds-facet-table";
import { FundsWeeklyHeader } from "pages/invest/funds/funds-facet/funds-weekly/funds-weekly-header";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const FUNDS_WEEKLY_FACET_NAME = "challenge";
const MAPPING_INIT_CURRENCY = "USD";

const _FundsWeeklyContainer: React.FC = () => {
  const [t] = useTranslation();

  const { data, sendRequest: getFundsChallengeWinner } = useApiRequest({
    name: "fetchFundsChallengeWinner",
    cache: true,
    request: fetchFundsChallengeWinner,
    fetchOnMount: true
  });

  const getFunds = useCallback(
    (filters: ComposeFiltersAllType): Promise<IDataModel> =>
      fetchFunds(filters),
    []
  );
  return (
    <Page
      description={`${t("funds-page:title")} ${t(
        `asset-list:facets.${FUNDS_WEEKLY_FACET_NAME}`
      )} facet list`}
      title={`${t("funds-page:title")} ${t(
        `asset-list:facets.${FUNDS_WEEKLY_FACET_NAME}`
      )}`}
    >
      <FundsWeeklyHeader />
      <Row>
        <DefaultTableBlock wide>
          <FundsTable
            updateRow={getFundsChallengeWinner}
            loaderCount={1}
            showSwitchView={false}
            title={t("asset-list:facets.texts.last-week-challenge-winner")}
            data={data}
          />
        </DefaultTableBlock>
      </Row>
      <Row>
        <DefaultTableBlock wide>
          <FacetContainer
            initCurrency={MAPPING_INIT_CURRENCY}
            title={t("asset-list:facets.texts.top-12")}
            id={FUNDS_WEEKLY_FACET_NAME}
            asset={FACET_ASSET.FUNDS}
            TableContainer={FundsFacetTable}
            getItems={getFunds}
          />
        </DefaultTableBlock>
      </Row>
    </Page>
  );
};

const FundsWeeklyContainer = React.memo(_FundsWeeklyContainer);
export default FundsWeeklyContainer;
