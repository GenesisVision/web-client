import "./../dashboard-portfolio-chart-section.scss";

import React from "react";
import SvgLoader from "shared/components/svg-loader/svg-loader.js";

const DashboardPortfolioChartLoader = () => {
  return (
    <div className="dashboard-portfolio-chart-section__loader">
      <ChartLoaderHeader />
      <ChartLoader />
    </div>
  );
};

const ChartLoader = () => (
  <div className="dashboard-portfolio-chart-section__chart-loader">
    <SvgLoader
      id="7"
      height="351"
      width="1011"
    >
      <path d="M-139.031401,357.429319 C-46.384058,357.429319 -46.384058,357.429319 46.263285,357.429319 C138.910628,357.429319 138.910628,357.429319 231.557971,357.429319 C324.205314,357.429319 324.205314,357.429319 416.852657,357.429319 C509.5,357.429319 509.5,357.429319 602.147343,357.429319 C694.794686,357.429319 694.794686,357.429319 787.442029,357.429319 C880.089372,357.429319 880.089372,357.429319 972.736715,357.429319 C1065.38406,357.429319 1065.38406,357.429319 1158.0314,357.429319 L1158.0314,315.257801 C1065.38406,315.257801 1065.38406,184.057522 972.736715,184.057522 C880.089372,184.057522 880.089372,6 787.442029,6 C694.794686,6 694.794686,137.200279 602.147343,137.200279 C509.5,137.200279 509.5,141.886003 416.852657,141.886003 C324.205314,141.886003 324.205314,104.400209 231.557971,104.400209 C138.910628,104.400209 138.910628,287.143455 46.263285,287.143455 C-46.384058,287.143455 -46.384058,348.057871 -139.031401,348.057871 L-139.031401,357.429319 Z"></path>
    </SvgLoader>
  </div>
);

const ChartLoaderHeader = () => (
  <div className="dashboard-portfolio-chart-section__loader-header">
    <ChartLoaderTextHeader />
    <ChartLoaderText />
    <ChartLoaderRight />
    <ChartLoaderLabelText id="10" />
    <ChartLoaderLabelText id="11" />
  </div>
);

const ChartLoaderTextHeader = () => (
  <div className="dashboard-portfolio-chart-section__loader-text">
    <SvgLoader
      id="1"
      height="120"
      width="220"
    >
      <rect x="0" y="0" rx="8" ry="8" width="57" height="15" />
      <rect x="0" y="40" width="40" height="15" rx="8" ry="8"></rect>
      <rect x="0" y="70" width="200" height="22" rx="8" ry="8"></rect>
      <rect x="0" y="105" width="100" height="10" rx="8" ry="8"></rect>
    </SvgLoader>
  </div>
);

const ChartLoaderText = () => (
  <div className="dashboard-portfolio-chart-section__loader-text">
    <SvgLoader
      id="2"
      height="120"
      width="220"
    >
      <rect x="0" y="40" width="40" height="15" rx="8" ry="8"></rect>
      <rect x="0" y="70" width="200" height="22" rx="8" ry="8"></rect>
      <rect x="0" y="105" width="100" height="10" rx="8" ry="8"></rect>
    </SvgLoader>
  </div>
);

const ChartLoaderRight = () => (
  <div className="dashboard-portfolio-chart-section__loader-right">
    <SvgLoader
      id="3"
      height="120"
      width="70"
    >
      <rect x="0" y="40" width="40" height="15" rx="8" ry="8"></rect>
      <rect x="0" y="70" width="60" height="22" rx="8" ry="8"></rect>
    </SvgLoader>
  </div>
);

const ChartLoaderLabelText = ({id}) => (
  <div className="dashboard-portfolio-chart-section__loader-label-text">
    <SvgLoader
      id={id}
      height="20"
      width="210"
    >
      <rect x="0" y="0" width="210" height="20" rx="8" ry="8"></rect>
    </SvgLoader>
  </div>
);

export default DashboardPortfolioChartLoader;

