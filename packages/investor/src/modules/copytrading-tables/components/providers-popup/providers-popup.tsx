import "./providers-popup.scss";

import { OrderSignalProgramInfo } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import Table from "shared/components/table/components/table";

const _ProvidersPopup: React.FC<Props> = ({
  columns,
  renderRow,
  anchor,
  onClose,
  otherPrograms,
  t
}) => (
  <Popover
    ownWidth
    className={"providers-table"}
    anchorEl={anchor}
    onClose={onClose}
    horizontal={HORIZONTAL_POPOVER_POS.LEFT}
    vertical={VERTICAL_POPOVER_POS.TOP}
  >
    <Table
      items={otherPrograms}
      columns={columns}
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${column.name}`}
        >
          {t(`investor.copytrading-tables.open-trades-header.${column.name}`)}
        </span>
      )}
      renderBodyRow={renderRow}
    />
  </Popover>
);

interface Props extends WithTranslation {
  columns: SortingColumn[];
  anchor?: EventTarget;
  onClose: () => void;
  otherPrograms: OrderSignalProgramInfo[];
  renderRow: (provider: OrderSignalProgramInfo) => JSX.Element;
}

const ProvidersPopup = translate()(React.memo(_ProvidersPopup));
export default ProvidersPopup;
