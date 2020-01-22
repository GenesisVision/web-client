import * as React from "react";
import filesService from "services/file-service";

import { ProgramDescriptionDataType } from "./program-details.types";

const isFollow = (description: ProgramDescriptionDataType) => {
  return !!description.followDetails;
};

export const getSchema = (details: ProgramDescriptionDataType) => ({
  "@context": "https://schema.org",
  "@type": isFollow ? "FinancialProduct" : "DepositAccount",
  identifier: details.id,
  provider: details.owner.username,
  hoursAvailable:
    (details.programDetails && details.programDetails.ageDays * 24) ||
    undefined,
  name: details.publicInfo.title,
  description: details.publicInfo.description,
  broker: details.brokerDetails.name,
  feesAndCommissionsSpecification: "", //TODO
  logo: filesService.getFileUrl(details.publicInfo.logo)
});
