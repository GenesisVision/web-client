import Link from "components/link/link";
import { TitleContext } from "pages/dashboard/dashboard.constants";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { managerUrlSelector } from "reducers/header-reducer";
import { MANAGERS_ROUTE } from "routes/manager.routes";
import { createToUrl } from "utils/compose-url";

export const PublicPageLink: React.FC = React.memo(() => {
  const title = useContext(TitleContext);
  const [t] = useTranslation();
  const managerUrl = useSelector(managerUrlSelector);
  const url = `${MANAGERS_ROUTE}/${managerUrl}`;
  if (!managerUrl) return null;
  return (
    <Link to={createToUrl(url, url, title)}>
      {t("dashboard-page.investing.public-page")}
    </Link>
  );
});
