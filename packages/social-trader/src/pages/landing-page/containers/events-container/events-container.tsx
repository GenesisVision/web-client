import classNames from "classnames";
import { PlatformEvent } from "gv-api-web";
import { useTranslation } from "i18n";
import EventsList from "pages/landing-page/components/events-list/events-list";
import React from "react";

import styles from "./events-container.module.scss";

interface Props {
  events: PlatformEvent[];
}

const _FollowsContainer: React.FC<Props> = ({ events }) => {
  const { t } = useTranslation();
  if (!events.length) return null;
  return (
    <section className="home__section home__section--bg-white">
      <div className="home__container">
        <div className={styles["events-container"]}>
          <h2 className={styles["events-container__title"]}>
            {t("landing-page:events.title")}
          </h2>
          <EventsList
            events={events}
            className={styles["events-container__list"]}
          />
        </div>
      </div>
    </section>
  );
};
const EventsContainer = React.memo(_FollowsContainer);
export default EventsContainer;
