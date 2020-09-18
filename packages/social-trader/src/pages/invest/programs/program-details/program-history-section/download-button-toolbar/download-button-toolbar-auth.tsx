import DownloadButton from "components/download-button/download-button";
import { DateRangeFilterType } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import * as React from "react";
import { useCallback } from "react";

interface Props {
  method: (id: string, dateRange: DateRangeFilterType) => Promise<Blob>;
  dateRange: DateRangeFilterType;
  id: string;
  title: string;
}

const _DownloadButtonToolbarAuth: React.FC<Props> = ({
  method,
  dateRange,
  id,
  title
}) => {
  const loadFile = useCallback(() => {
    const dateNow = dayjs(new Date()).format("YYYY-MM-DD_HH-mm-ss");
    method(id, dateRange).then(blob =>
      saveAs(blob, `${title}_statistic_${dateNow}.xlsx`)
    );
  }, [id, dateRange, title]);
  return <DownloadButton authHandle={loadFile} />;
};

const DownloadButtonToolbarAuth = React.memo(_DownloadButtonToolbarAuth);
export default DownloadButtonToolbarAuth;
