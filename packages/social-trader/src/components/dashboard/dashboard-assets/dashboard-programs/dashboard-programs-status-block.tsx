import { ActionsCircleIcon } from "components/icon/actions-circle-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import useAnchor, { anchorNullValue } from "hooks/anchor.hook";
import * as React from "react";

const _DashboardProgramsStatusBlock: React.FC<Props> = ({ status }) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  return (
    <div className="dashboard-programs__cell--status-block">
      {status}
      <ActionsCircleIcon
        className="dashboard-request__icon"
        primary={anchor !== anchorNullValue}
        onClick={setAnchor}
      />
      <Popover
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        anchorEl={anchor}
        noPadding
        onClose={clearAnchor}
      >
        <div>Cancel</div>
      </Popover>
    </div>
  );
};

interface Props {
  status: string;
}

const DashboardProgramsStatusBlock = React.memo(_DashboardProgramsStatusBlock);
export default DashboardProgramsStatusBlock;
