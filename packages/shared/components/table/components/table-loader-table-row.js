import React from "react";
import ContentLoader from "react-content-loader";

const TableLoaderTableRow = () => {
  return (
    <tr>
      <td className="table__cell programs-table__cell programs-table__cell--name">
        <TableLoaderCell width={100} />
      </td>
      <td className="table__cell programs-table__cell ">
        <TableLoaderCell width={100} />
      </td>
      <td colSpan={11} className="table__cell programs-table__cell">
        <TableLoaderCell width={1000} />
      </td>
    </tr>
  );
};
const TableLoaderCell = ({ width }) => (
  <div style={{ width: width }}>
    <ContentLoader
      width={width}
      height={20}
      speed={4}
      primaryColor="#333d45"
      secondaryColor="#4c5257"
    >
      <rect x="0" y="0" rx="8" ry="8" width={width} height="20" />
    </ContentLoader>
  </div>
);
export default TableLoaderTableRow;
