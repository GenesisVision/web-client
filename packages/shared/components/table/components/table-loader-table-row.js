import React from "react";
import SvgLoader from "../../svg-loader/svg-loader";

const TableLoaderTableRow = () => {
  return (
    <tr>
      <td className="table__cell programs-table__cell programs-table__cell--name">
        <TableLoaderCell width={100} id={23243} />
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
const TableLoaderCell = ({ width}) => (
  <div style={{ width: width }}>
    <SvgLoader
      height="20"
      width={width}
    >
      <rect x="0" y="0" rx="8" ry="8" width={width} height="20" />
    </SvgLoader>
  </div>
);
export default TableLoaderTableRow;
