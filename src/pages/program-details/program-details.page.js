import "./program-details.scss";

import React from "react";
import { translate } from "react-i18next";

import Page from "../../components/page/page";
import ProgramDetailsChartContainer from "./components/program-details-chart/program-details-chart-container";
import ProgramDetailsDescriptionContainer from "./components/program-details-description/program-details-description-container";
import ProgramDetailsHistoryContainer from "./components/program-details-history/program-details-history-container";
import ProgramDetailsStatisticsContainer from "./components/program-details-statistics/program-details-statistics-container";

const ProgramDetailsPage = ({ t }) => {
  return (
    <Page title={t("program-details-page.title")}>
      <div className="program-details">
        <div className="program-details__description">
          <ProgramDetailsDescriptionContainer />
        </div>
        <div className="program-details__row">
          <div className="program-details__statistics">
            <ProgramDetailsStatisticsContainer />
          </div>
          <div className="program-details__chart">
            <ProgramDetailsChartContainer />
          </div>
          <div className="program-details__history">
            <ProgramDetailsHistoryContainer />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default translate()(ProgramDetailsPage);
