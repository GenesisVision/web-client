import * as React from "react";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS,
  anchorElType
} from "shared/components/popover/popover";

const ProviderPopover: React.FC<Props> = ({ anchor, onClose, children }) => {
  return (
    <Popover
      ownWidth
      anchorEl={anchor}
      onClose={onClose}
      horizontal={HORIZONTAL_POPOVER_POS.RELATIVE}
      vertical={VERTICAL_POPOVER_POS.TOP}
    >
      <div className="table-wrapper">
        <div className={"table__scroll"}>
          <div className="table">
            <tbody className="table__body">{children}</tbody>
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default ProviderPopover;

interface Props {
  anchor?: anchorElType;
  onClose: () => void;
}
