import { saveAs } from "file-saver";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import GVButton from "shared/components/gv-button";
import { DateRangeFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import filesService from "shared/services/file-service";

const _DownloadButtonToolbarAuth: React.FC<Props> = ({
  t,
  dateRange,
  programId
}) => {
  const loadFile = () => {
    const fileName =
      dateRange.dateStart && dateRange.dateEnd
        ? `${dateRange.dateStart}_${dateRange.dateEnd}`
        : dateRange.type;
    filesService
      .getStatisticExportFile(programId, dateRange)
      .then(blob => saveAs(blob, `statistic_${fileName}.xlsx`));
  };
  return (
    <div className="dashboard__button">
      <GVButton color="primary" variant="text" onClick={loadFile}>
        {t("program-details-page.history.trades.download")}
      </GVButton>
    </div>
  );
};

interface Props extends WithTranslation {
  dateRange: DateRangeFilterType;
  programId: string;
}

const DownloadButtonToolbarAuth = translate()(
  React.memo(_DownloadButtonToolbarAuth)
);

export default DownloadButtonToolbarAuth;
