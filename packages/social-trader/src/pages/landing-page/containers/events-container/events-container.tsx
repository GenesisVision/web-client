import clsx from "clsx";
import { PlatformEvent } from "gv-api-web";
import { useTranslation } from "i18n";
import EventsList from "pages/landing-page/components/events-list/events-list";
import React from "react";

import styles from "./events-container.module.scss";

interface Props {
  events: PlatformEvent[];
}

const _EventsContainer: React.FC<Props> = ({ events }) => {
  const { t } = useTranslation();
  if (!events.length) return null;
  return (
    <div className={styles["events-container"]}>
      <h2 className={styles["events-container__title"]}>
        {t("landing-page:events.title")}
      </h2>
      <EventsList
        events={events}
        className={styles["events-container__list"]}
      />
    </div>
  );
};
const EventsContainer = React.memo(_EventsContainer);
export default EventsContainer;
