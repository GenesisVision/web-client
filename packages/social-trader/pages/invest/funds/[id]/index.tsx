import FundDetailsPage from "pages/invest/funds/fund-details/fund-details.page";
import React from "react";
import { fundDetailsCreator } from "shared/routes/ssr/funds/[id]";

export default fundDetailsCreator(FundDetailsPage);
