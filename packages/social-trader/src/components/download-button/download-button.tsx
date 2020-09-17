import { Button } from "components/button/button";
import { Center } from "components/center/center";
import { ExportIcon } from "components/icon/export-icon";
import { Text } from "components/text/text";
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
      title={title || t("buttons.download")}
      href={getExportFileUrl && getExportFileUrl()}
    >
      <Button noPadding color="primary" variant="text" onClick={authHandle}>
        <>
          <Center>
            <Text weight={"bold"}>{title || t("buttons.export")}</Text>
            <ExportIcon />
          </Center>
        </>
      </Button>
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
