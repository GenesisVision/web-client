import DownloadButton from "components/download-button/download-button";
import { DateRangeFilterType } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import * as React from "react";

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
