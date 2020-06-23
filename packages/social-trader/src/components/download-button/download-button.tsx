import GVButton from "components/gv-button";
import { ExportIcon } from "components/icon/export-icon";
import * as React from "react";
import { useTranslation } from "react-i18next";

import styles from "./download-button.module.scss";

const _DownloadButton: React.FC<Props> = ({
  title,
  getExportFileUrl,
  authHandle
}) => {
  const [t] = useTranslation();
  return (
    <a
      title={title || t("buttons.download")}
      className={styles["download-button__container"]}
      href={getExportFileUrl && getExportFileUrl()}
    >
      <GVButton
        noPadding
        className={styles["download-button"]}
        color="primary"
        variant="text"
        onClick={authHandle}
      >
        <>
          {title || t("buttons.download")}
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
