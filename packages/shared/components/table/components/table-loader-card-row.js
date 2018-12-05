import "shared/modules/programs-table/components/programs-table/programs.scss";

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
  <div className="programs-cards__card-loader" style={{ width: 312 }}>
    <ContentLoader
      height={372}
      width={312}
      speed={2}
      primaryColor="#212c34"
      secondaryColor="#323c43"
    >
      <rect x="0" y="0" rx="8" ry="8" width="312" height="372" />
    </ContentLoader>
  </div>
);

export default TableLoaderCardRow;
