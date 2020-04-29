import { FundDescriptionDataType } from "pages/invest/funds/fund-details/reducers/description.reducer";
import { SchemaType } from "utils/seo";

export const getFundSchema = (
  details: FundDescriptionDataType
): SchemaType => ({
  context: "https://schema.org",
  "@type": "InvestmentFund",
  identifier: details.id,
  provider: details.owner.username,
  name: details.publicInfo.title,
  description: details.publicInfo.description,
  feesAndCommissionsSpecification: "", //TODO
  logo: details.publicInfo.logoUrl
});
