import "./download-button.scss";

import dayjs from "dayjs";
import { saveAs } from "file-saver";
import * as React from "react";
import { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import DownloadButton from "shared/components/download-button/download-button";
import { DateRangeFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import filesService from "shared/services/file-service";

const _DownloadButtonToolbarAuth: React.FC<Props> = ({
  t,
  dateRange,
  programId,
  title
}) => {
  const loadFile = useCallback(() => {
    const dateNow = dayjs(new Date()).format("YYYY-MM-DD_HH-mm-ss");
    filesService
      .getStatisticExportFile(programId, dateRange)
      .then((blob: Blob) => saveAs(blob, `${title}_statistic_${dateNow}.xlsx`));
  }, [programId, dateRange, title]);
  return <DownloadButton authHandle={loadFile} />;
};

interface Props extends WithTranslation {
  dateRange: DateRangeFilterType;
  programId: string;
  title: string;
}

const DownloadButtonToolbarAuth = translate()(
  React.memo(_DownloadButtonToolbarAuth)
);

export default DownloadButtonToolbarAuth;
