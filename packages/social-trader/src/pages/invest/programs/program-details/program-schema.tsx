import { ProgramDescriptionDataType } from "./program-details.types";

const isFollow = (description: ProgramDescriptionDataType) => {
  return !!description.followDetails;
};

export const getSchema = (details: ProgramDescriptionDataType) => ({
  "@context": "https://schema.org",
  "@type": isFollow(details) ? "FinancialProduct" : "DepositAccount",
  identifier: details.id,
  provider: details.owner.username,
  name: details.publicInfo.title,
  description: details.publicInfo.description,
  broker: details.brokerDetails.name,
  feesAndCommissionsSpecification: "", //TODO
  logo: details.publicInfo.logoUrl
});
