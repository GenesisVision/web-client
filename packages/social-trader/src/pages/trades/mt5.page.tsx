import Page from "components/page/page";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./trades.module.scss";

const _Mt5: React.FC = () => {
  const [t] = useTranslation();
  const title = t("mt5-page:title");

  return (
    <Page showTitle title={title}>
      <div className={styles["mt-frame"]}>
        <div className={styles["addblock-warning"]}>
          {t("mt5-page:warning")}
        </div>
        <iframe
          title={title}
          src="https://trade.mql5.com/trade?servers=GenesisMarketsLTD-Demo,GenesisMarketsLTD-Live&amp;trade_server=GenesisMarketsLTD-Live&amp;demo_server=GenesisMarketsLTD-Demo&amp;lang=en&amp;save_password=on"
          allowFullScreen
        >
          {title}
        </iframe>
      </div>
    </Page>
  );
};

const Mt5Page = React.memo(_Mt5);
export default Mt5Page;
