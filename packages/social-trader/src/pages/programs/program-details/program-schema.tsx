import * as React from "react";
import filesService from "services/file-service";

import { ProgramDescriptionDataType } from "./program-details.types";

const isFollow = (description: ProgramDescriptionDataType) => {
  return !!description.followDetails;
};

export const getSchema = (description: ProgramDescriptionDataType) => ({
  "@context": "https://schema.org",
  "@type": isFollow ? "FinancialProduct" : "DepositAccount",
  name: description.publicInfo.title,
  description: description.publicInfo.description,
  broker: description.brokerDetails.name,
  feesAndCommissionsSpecification: "", //TODO
  logo: filesService.getFileUrl(description.publicInfo.logo)
});
