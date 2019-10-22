import "./download-button.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import GVButton from "shared/components/gv-button";
import { DateRangeFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { ReactComponent as ExportIcon } from "shared/media/export.svg";

const _DownloadButton: React.FC<Props> = ({ title, getExportFileUrl }) => {
  const [t] = useTranslation();
  return (
    <a href={getExportFileUrl()} className="dashboard__button">
      <GVButton className="download-button" color="primary" variant="text">
        <>
          {title || t("program-details-page.history.trades.download")}
          <ExportIcon className="download-icon" />
        </>
      </GVButton>
    </a>
  );
};

interface Props {
  title?: string;
  getExportFileUrl: () => string;
}

const DownloadButton = React.memo(_DownloadButton);
export default DownloadButton;
