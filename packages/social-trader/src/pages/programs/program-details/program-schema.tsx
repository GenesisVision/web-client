import * as React from "react";
import filesService from "services/file-service";

import { ProgramDescriptionDataType } from "./program-details.types";

const isFollow = (description: ProgramDescriptionDataType) => {
  return !!description.followDetails;
};

export const getSchema = (description: ProgramDescriptionDataType) => {
  return isFollow(description)
    ? getFollowSchema(description)
    : getProgramSchema(description);
};

const getProgramSchema = (details: ProgramDescriptionDataType) => ({
  "@context": "https://schema.org",
  "@type": "DepositAccount",
  name: details.publicInfo.title,
  description: details.publicInfo.description,
  broker: details.brokerDetails.name,
  feesAndCommissionsSpecification: "", //TODO
  logo: filesService.getFileUrl(details.publicInfo.logo),
  aggregateRating: details.programDetails
    ? {
        "@type": "AggregateRating",
        bestRating: 7, //TODO
        ratingValue: details.programDetails.level
      }
    : undefined //TODO
});

const getFollowSchema = (details: ProgramDescriptionDataType) => ({
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  name: details.publicInfo.title,
  description: details.publicInfo.description,
  broker: details.brokerDetails.name,
  feesAndCommissionsSpecification: "", //TODO
  logo: filesService.getFileUrl(details.publicInfo.logo)
});
