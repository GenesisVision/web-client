import "./download-button.scss";

import * as React from "react";
import DownloadButton from "shared/components/download-button/download-button-toolbar";
import { DateRangeFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";

const _DownloadButtonToolbar: React.FC<Props> = ({
  filtering,
  programId,
  getExportFileUrl
}) => {
  return (
    <DownloadButton
      getExportFileUrl={() => getExportFileUrl(programId, filtering)}
    />
  );
};

interface Props {
  filtering: DateRangeFilterType;
  programId: string;
  getExportFileUrl: (id: string, dateRange: DateRangeFilterType) => string;
}

const DownloadButtonToolbar = React.memo(_DownloadButtonToolbar);

export default DownloadButtonToolbar;
