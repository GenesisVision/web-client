import { FundDescriptionDataType } from "pages/funds/fund-details/reducers/description.reducer";
import filesService from "services/file-service";
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
  logo: filesService.getFileUrl(details.publicInfo.logo)
});
