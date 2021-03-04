import { PlatformWithdrawalInfo } from "gv-api-web";
import { useTranslation } from "i18n";
import FeesGeneral from "pages/landing-page/components/fees-info/fees-general";
import FeesTrading from "pages/landing-page/components/fees-info/fees-trading";
import TabControls from "pages/landing-page/components/tab-controls/tab-controls";
import { feesTabs } from "pages/landing-page/static-data/fees";
import React, { useCallback, useState } from "react";

import styles from "./fees-section.module.scss";

interface Props {
  platformWithdrawalInfo: Array<PlatformWithdrawalInfo>;
}

const FeesSection: React.FC<Props> = ({ platformWithdrawalInfo }) => {
  const { t } = useTranslation();
  const [currentTabId, setCurrentTab] = useState(0);

  const handleChange = useCallback(
    (id: number) => {
      if (id !== undefined && id !== currentTabId) setCurrentTab(id);
    },
    [currentTabId]
  );
  return (
    <section className={styles["fees-section"]}>
      <div className={styles["fees-section__container"]}>
        <div className={styles["fees-section__wrapper-controls"]}>
          <h1>{t("fees:fees")}</h1>
          <p className={styles["fees-section__text"]}>{t("fees:text-1")}</p>
          <TabControls
            currentTabId={currentTabId}
            tabsItems={feesTabs}
            onChange={handleChange}
            variant={"fees"}
          />
        </div>
      </div>
      <div className={styles["fees-section__tab-info"]}>
        {currentTabId === 0 && (
          <FeesGeneral platformWithdrawalInfo={platformWithdrawalInfo} />
        )}
        {currentTabId === 1 && <FeesTrading />}
      </div>
    </section>
  );
};

export default FeesSection;
