import "./download-container.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import { useTranslation } from "i18n";
import IconList from "pages/landing-page/components/icon-list/icon-list";
import FacetImg from "pages/landing-page/images/download/facet.svg";
import iPhoneImg from "pages/landing-page/images/download/iPhone.png";
import NotificationImg from "pages/landing-page/images/download/notification.png";
import { appLinks } from "pages/landing-page/static-data/app-links";
import { VIDEO_LINK } from "pages/landing-page/static-data/download";
import React from "react";

const DownloadContainer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="download-container">
      <div className="download-container__info">
        <h2 className="download-container__title">
          {t("landing-page.download.title")}
        </h2>
        <p className="download-container__text">
          {t("landing-page.download.text")}
        </p>
        <IconList
          items={appLinks}
          lightTheme
          className="download-container__app-links"
        />
      </div>
      <div className="download-container__img-wrapper">
        <ImageBaseElement
          src={FacetImg}
          alt="Download app"
          className="download-container__img-facet"
        />
        <ImageBaseElement
          src={NotificationImg}
          alt="Download app"
          className="download-container__img-notification"
        />
        <ImageBaseElement
          src={iPhoneImg}
          alt="Download app"
          className="download-container__img-iphone"
        />
        <a
          title={"Download"}
          href={VIDEO_LINK}
          className="download-container__play"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="download-container__play-btn" />
        </a>
      </div>
    </div>
  );
};

export default DownloadContainer;
