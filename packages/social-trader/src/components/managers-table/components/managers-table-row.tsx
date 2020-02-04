import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import * as React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import { localizedDate } from "utils/dates";

type ManagerProfile = any;

interface IManagersTableRowProps {
  manager: ManagerProfile;
}
const _ManagersTableRow: React.FC<IManagersTableRowProps> = ({ manager }) => {
  const { contextTitle } = useToLink();
  return (
    <TableRow>
      <TableCell>
        <Link to={managerToPathCreator(manager.url, contextTitle)}>
          <AvatarWithName
            avatar={
              <ProfileAvatar url={manager.avatar} alt={manager.username} />
            }
            name={manager.username}
          />
        </Link>
      </TableCell>
      <TableCell>{manager.assets.join(", ")}</TableCell>
      <TableCell>{localizedDate(manager.regDate)}</TableCell>
    </TableRow>
  );
};

const ManagersTableRow = React.memo(_ManagersTableRow);
export default ManagersTableRow;
