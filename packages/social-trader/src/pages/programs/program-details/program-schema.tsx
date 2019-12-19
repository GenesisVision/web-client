import * as React from "react";
import { BrokerageAccount, WithContext } from "schema-dts";
import filesService from "services/file-service";

import { ProgramDescriptionDataType } from "./program-details.types";

export const getProgramSchema = (
  details: ProgramDescriptionDataType
): WithContext<BrokerageAccount> => ({
  "@context": "https://schema.org",
  "@type": "BrokerageAccount",
  name: details.publicInfo.title,
  description: details.publicInfo.description,
  broker: details.brokerDetails.name,
  feesAndCommissionsSpecification: "", //TODO
  logo: filesService.getFileUrl(details.publicInfo.logo),
  aggregateRating: {
    "@type": "AggregateRating",
    bestRating: 7, //TODO
    ratingValue: details.programDetails.level
  } //TODO
});
