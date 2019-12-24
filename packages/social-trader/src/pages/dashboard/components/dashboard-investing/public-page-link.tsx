import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { managerUrlSelector } from "reducers/header-reducer";
import { MANAGERS_ROUTE } from "routes/manager.routes";

export const PublicPageLink: React.FC = React.memo(() => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const managerUrl = useSelector(managerUrlSelector);
  const url = `${MANAGERS_ROUTE}/${managerUrl}`;
  if (!managerUrl) return null;
  return (
    <Link to={linkCreator(url)}>
      {t("dashboard-page.investing.public-page")}
    </Link>
  );
});
