import "./managers-table.scss";

import { ManagerProfile } from "gv-api-web";
import * as React from "react";
import { WithTranslation } from "react-i18next";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import GVButton from "shared/components/gv-button";
import Link from "shared/components/link/link";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { managerToPathCreator } from "shared/routes/manager.routes";
import { localizedDate } from "shared/utils/dates";

interface IManagersTableRowProps {
  manager: ManagerProfile;
  title: any;
}
const _ManagersTableRow: React.FC<IManagersTableRowProps & WithTranslation> = ({
  manager,
  title
}) => {
  return (
    <TableRow className="managers-table__row">
      <TableCell className="managers-table__cell--username">
        <ProfileAvatar url={manager.avatar} alt={manager.username} />
        <Link to={managerToPathCreator(manager.url, title)}>
          <GVButton variant="text" color="secondary">
            {manager.username}
          </GVButton>
        </Link>
      </TableCell>
      <TableCell className="">{manager.assets.join(", ")}</TableCell>
      <TableCell className="">{localizedDate(manager.regDate)}</TableCell>
    </TableRow>
  );
};

const ManagersTableRow = React.memo(_ManagersTableRow);
export default ManagersTableRow;
