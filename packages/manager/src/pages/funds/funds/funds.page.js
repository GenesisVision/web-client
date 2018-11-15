import Page from "shared/components/page/page";
import FundsTableContainer from "modules/funds-table/components/funds-table/funds-table-container";
import React from "react";
import { translate } from "react-i18next";

import FacetCardsContainer from "./components/facet-cards/faset-cards-container";

const FundsPage = ({ t }) => {
  return (
    <Page title={t("funds-page.title")}>
      <FacetCardsContainer title={t("funds-page.title")} />
      <FundsTableContainer title={"All funds"} />
    </Page>
  );
};

export default translate()(FundsPage);
