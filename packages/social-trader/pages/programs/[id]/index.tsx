import ProgramDetailsPage from "pages/programs/program-details/program-details.page";
import React from "react";
import { programDetailsCreator } from "routes/ssr/programs/[id]";

export default programDetailsCreator(ProgramDetailsPage);
