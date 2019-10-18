import "./download-button.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import GVButton from "shared/components/gv-button";
import { ExportIcon } from "shared/components/icon/export-icon";
import { DateRangeFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";

const _DownloadButtonToolbar: React.FC<Props> = ({
  t,
  filtering,
  programId,
  getExportFileUrl
}) => {
  return (
    <a
      href={getExportFileUrl(programId, filtering)}
      className="dashboard__button"
    >
      <GVButton className="download-button" color="primary" variant="text">
        <>
          {t("program-details-page.history.trades.download")}
          <ExportIcon />
        </>
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
