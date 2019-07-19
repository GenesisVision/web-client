import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import GVButton from "shared/components/gv-button";
import { DateRangeFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";

const _DownloadButtonToolbar: React.FC<Props> = ({
  t,
  filtering,
  programId,
  getExportFileUrl
}) => {
  console.log(filtering);
  console.log(getExportFileUrl(programId, filtering));
  return (
    <a
      href={getExportFileUrl(programId, filtering)}
      className="dashboard__button"
    >
      <GVButton color="primary" variant="text">
        {t("program-details-page.history.trades.download")}
      </GVButton>
    </a>
  );
};

interface Props extends WithTranslation {
  filtering: DateRangeFilterType;
  programId: string;
  getExportFileUrl: (id: string, dateRange: DateRangeFilterType) => string;
}

const DownloadButtonToolbar = translate()(React.memo(_DownloadButtonToolbar));

export default DownloadButtonToolbar;
