import ProgramDetailsPage from "pages/programs/program-details/program-details.page";
import React from "react";
import { programDetailsCreator } from "shared/routes/ssr/programs/[id]";

export default programDetailsCreator(ProgramDetailsPage);
