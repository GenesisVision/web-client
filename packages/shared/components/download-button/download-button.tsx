import "./download-button.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import GVButton from "shared/components/gv-button";
import { DateRangeFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { ReactComponent as ExportIcon } from "shared/media/export.svg";

const _DownloadButton: React.FC<Props> = ({
  title,
  getExportFileUrl,
  authHandle
}) => {
  const [t] = useTranslation();
  return (
    <a
      href={getExportFileUrl && getExportFileUrl()}
      className="download-button__container"
    >
      <GVButton
        className="download-button"
        color="primary"
        variant="text"
        onClick={authHandle}
      >
        <>
          {title || t("program-details-page.history.trades.download")}
          <ExportIcon className="download-icon" />
        </>
      </GVButton>
    </a>
  );
};

interface Props {
  authHandle?: () => void;
  title?: string;
  getExportFileUrl?: () => string;
}

const DownloadButton = React.memo(_DownloadButton);
export default DownloadButton;
