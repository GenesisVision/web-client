import "./managers-table.scss";

import { GVButton } from "gv-react-components";
import moment from "moment";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { composeManagerDetailsUrl } from "shared/utils/compose-url";

const ManagersTableRow = ({ t, manager, title }) => {
  return (
    <TableRow className="managers-table__row">
      <TableCell className="managers-table__cell--username">
        <ProfileAvatar url={manager.avatar} alt={manager.username} />
        <Link
          to={{
            pathname: composeManagerDetailsUrl(manager.url),
            state: `/ ${title}`
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

export default translate()(ManagersTableRow);
