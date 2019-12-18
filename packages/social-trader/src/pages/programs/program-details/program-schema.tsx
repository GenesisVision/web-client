import * as React from "react";
import { InvestmentOrDeposit, WithContext } from "schema-dts";

import filesService from "../../../services/file-service";
import { ProgramDescriptionDataType } from "./program-details.types";

export const getProgramSchema = (
  details: ProgramDescriptionDataType
): WithContext<InvestmentOrDeposit> => ({
  "@context": "https://schema.org",
  "@type": "InvestmentOrDeposit",
  name: details.publicInfo.description,
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
