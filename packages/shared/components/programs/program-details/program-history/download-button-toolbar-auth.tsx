import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import GVButton from "shared/components/gv-button";
import { DateRangeFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { fetchStatisticExportFileUrl } from "shared/services/file-service";
import { saveAs } from "file-saver";

const _DownloadButtonToolbarAuth: React.FC<Props> = ({
  t,
  filtering,
  programId
}) => {
  const loadFile = () => {
    fetchStatisticExportFileUrl(programId, filtering).then(blob =>
      saveAs(blob)
    );
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
  filtering: DateRangeFilterType;
  programId: string;
}

const DownloadButtonToolbarAuth = translate()(
  React.memo(_DownloadButtonToolbarAuth)
);

export default DownloadButtonToolbarAuth;
