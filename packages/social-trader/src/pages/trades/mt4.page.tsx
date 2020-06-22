import Page from "components/page/page";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./trades.module.scss";

const _Mt4: React.FC = () => {
  const [t] = useTranslation();
  const title = t("mt4-page:title");
  return (
    <Page showTitle title={title}>
      <div className={styles["mt-frame"]}>
        <iframe
          title={title}
          allowFullScreen
          name="webTerminalHost"
          id="webTerminalHost"
          src="https://trade.mql5.com/trade?version=4"
        >
          {title}
        </iframe>
      </div>
    </Page>
  );
};

const Mt4Page = React.memo(_Mt4);
export default Mt4Page;
