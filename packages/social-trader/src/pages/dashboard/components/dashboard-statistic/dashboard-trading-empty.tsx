import { Text } from "components/text/text";
import { CREATE_ACCOUNT_PAGE_ROUTE } from "pages/create-account/create-account.constants";
import { CREATE_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import { DashboardNewUserBlock } from "pages/dashboard/components/dashboard-statistic/dashboard-new-user.block";
import React from "react";
import { useTranslation } from "react-i18next";

export const DashboardTradingEmpty: React.FC = React.memo(() => {
  const [t] = useTranslation();
  return (
    <DashboardNewUserBlock
      leftField={{
        link: CREATE_ACCOUNT_PAGE_ROUTE,
        linkLabel: t(
          "dashboard-page:statistic.get-started.trading.left-field.button"
        ),
        text: (
          <>
            {t("dashboard-page:statistic.get-started.trading.left-field.text")}{" "}
            <Text muted>
              {t(
                "dashboard-page:statistic.get-started.trading.left-field.text-2"
              )}
            </Text>
          </>
        )
      }}
      rightField={{
        link: CREATE_FUND_PAGE_ROUTE,
        linkLabel: t(
          "dashboard-page:statistic.get-started.trading.right-field.button"
        ),
        text: (
          <>
            {t("dashboard-page:statistic.get-started.trading.right-field.text")}
          </>
        )
      }}
    />
  );
});
