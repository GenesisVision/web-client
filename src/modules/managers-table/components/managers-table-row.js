import "./managers-table.scss";

import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { GVButton } from "gv-react-components";
import { TableCell, TableRow } from "modules/table/components";
import moment from "moment";
import { composeManagerDetailsUrl } from "pages/manager/manager.page";
import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";

const ManagersTableRow = ({ manager, pathname }) => {
  return (
    <TableRow className="managers-table__row">
      <TableCell className="managers-table__cell--username">
        <ProfileAvatar url={manager.avatar} alt={manager.username} />
        <Link
          to={{
            pathname: composeManagerDetailsUrl(manager.url),
            state: pathname
          }}
        >
          <GVButton variant="text" color="secondary">
            {manager.username}
          </GVButton>
        </Link>
      </TableCell>
      <TableCell className="">{manager.assets.map(x => x)}</TableCell>
      <TableCell className="">{moment(manager.regDate).format("ll")}</TableCell>
    </TableRow>
  );
};

const mapStateToProps = state => {
  const { pathname } = state.routing.location;
  return { pathname };
};

export default compose(
  translate(),
  connect(mapStateToProps)
)(ManagersTableRow);
