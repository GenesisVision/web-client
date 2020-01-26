import "./download-button.scss";

import GVButton from "components/gv-button";
import { ExportIcon } from "components/icon/export-icon";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _DownloadButton: React.FC<Props> = ({
  title,
  getExportFileUrl,
  authHandle
}) => {
  const [t] = useTranslation();
  return (
    <a
      title={title || t("program-details-page.history.trades.download")}
      className="download-button__container"
      href={getExportFileUrl && getExportFileUrl()}
    >
      <GVButton
        noPadding
        className="download-button"
        color="primary"
        variant="text"
        onClick={authHandle}
      >
        <>
          {title || t("program-details-page.history.trades.download")}
          <ExportIcon />
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
