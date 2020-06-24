import ImageBaseElement from "components/avatar/image-base.element";
import { useTranslation } from "i18n";
import IconList from "pages/landing-page/components/icon-list/icon-list";
import FacetImg from "pages/landing-page/images/download/facet.svg";
import iPhoneImg from "pages/landing-page/images/download/iPhone.png";
import NotificationImg from "pages/landing-page/images/download/notification.png";
import { appLinks } from "pages/landing-page/static-data/app-links";
import { VIDEO_LINK } from "pages/landing-page/static-data/download";
import React from "react";

import styles from "./download-container.module.scss";

const DownloadContainer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles["download-container"]}>
      <div className={styles["download-container__info"]}>
        <h2 className={styles["download-container__title"]}>
          {t("landing-page:download.title")}
        </h2>
        <p className={styles["download-container__text"]}>
          {t("landing-page:download.text")}
        </p>
        <IconList items={appLinks} lightTheme />
      </div>
      <div className={styles["download-container__img-wrapper"]}>
        <ImageBaseElement
          src={FacetImg}
          alt="Download app"
          className={styles["download-container__img-facet"]}
        />
        <ImageBaseElement
          src={NotificationImg}
          alt="Download app"
          className={styles["download-container__img-notification"]}
        />
        <ImageBaseElement
          src={iPhoneImg}
          alt="Download app"
          className={styles["download-container__img-iphone"]}
        />
        <a
          title={"Download"}
          href={VIDEO_LINK}
          className={styles["download-container__play"]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles["download-container__play-btn"]} />
        </a>
      </div>
    </div>
  );
};

export default DownloadContainer;
