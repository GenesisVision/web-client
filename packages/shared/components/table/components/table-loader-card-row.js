import React, { Fragment } from "react";
import ContentLoader from "react-content-loader";

const TableLoaderCardRow = () => {
  return (
    <Fragment>
      <CardLoader />
      <CardLoader />
      <CardLoader />
      <CardLoader />
    </Fragment>
  );
};

const CardLoader = () => (
  <div className="programs-cards__card">
    <ContentLoader
      height={307}
      width={271}
      speed={2}
      primaryColor="#333d45"
      secondaryColor="#4c5257"
    >
      <rect x="0" y="0" rx="8" ry="8" width="80" height="80" />
      <rect x="110" y="10" rx="4" ry="4" width="100" height="20" />
      <rect x="110" y="40" rx="4" ry="4" width="50" height="10" />
      <circle cx="255" cy="15" r="15" />

      <rect x="0" y="100" rx="8" ry="8" width="163" height="50" />
      <rect x="200" y="100" rx="15" ry="15" width="70" height="26" />

      <rect x="0" y="180" rx="4" ry="4" width="60" height="10" />
      <rect x="0" y="200" rx="4" ry="4" width="80" height="20" />
      <rect x="100" y="180" rx="4" ry="4" width="60" height="10" />
      <rect x="100" y="200" rx="4" ry="4" width="80" height="20" />
      <rect x="200" y="180" rx="4" ry="4" width="60" height="10" />
      <rect x="200" y="200" rx="4" ry="4" width="80" height="20" />
      <rect x="0" y="250" rx="4" ry="4" width="60" height="10" />
      <rect x="0" y="270" rx="4" ry="4" width="80" height="20" />
      <rect x="100" y="250" rx="4" ry="4" width="60" height="10" />
      <rect x="100" y="270" rx="4" ry="4" width="80" height="20" />
      <rect x="200" y="250" rx="4" ry="4" width="60" height="10" />
      <rect x="200" y="270" rx="4" ry="4" width="80" height="20" />
    </ContentLoader>
  </div>
);

export default TableLoaderCardRow;
