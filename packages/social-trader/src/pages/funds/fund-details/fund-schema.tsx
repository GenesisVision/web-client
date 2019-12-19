import { FundDescriptionDataType } from "pages/funds/fund-details/reducers/description.reducer";
import * as React from "react";
import { InvestmentFund, WithContext } from "schema-dts";
import filesService from "services/file-service";

export const getFundSchema = (
  details: FundDescriptionDataType
): WithContext<InvestmentFund> => ({
  "@context": "https://schema.org",
  "@type": "InvestmentFund",
  name: details.publicInfo.title,
  description: details.publicInfo.description,
  feesAndCommissionsSpecification: "", //TODO
  logo: filesService.getFileUrl(details.publicInfo.logo)
});
