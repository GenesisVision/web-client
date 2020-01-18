import "./trades.scss";

import Page from "components/page/page";
import React from "react";
import { useTranslation } from "react-i18next";

const _Mt5: React.FC = () => {
  const [t] = useTranslation();
  const title = t("mt5-page.title");
  return (
    <Page showTitle title={title}>
      <div className="mt-frame">
        <iframe
          title={title}
          src="https://trade.mql5.com/trade?servers=GenesisMarketsLp-Demo,GenesisMarketsLp-Live&amp;trade_server=GenesisMarketsLp-Live&amp;demo_server=GenesisMarketsLp-Demo&amp;lang=en&amp;save_password=on"
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
