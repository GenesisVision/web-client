import "./download-container.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import React from "react";
import IconList from "routes/ssr/landing-page/components/icon-list/icon-list";
import FacetImg from "routes/ssr/landing-page/images/download/facet.svg";
import iPhoneImg from "routes/ssr/landing-page/images/download/iPhone.png";
import NotificationImg from "routes/ssr/landing-page/images/download/notification.png";
import { appLinks } from "routes/ssr/landing-page/static-data/app-links";
import { VIDEO_LINK } from "routes/ssr/landing-page/static-data/download";

const DownloadContainer: React.FC = () => (
  <div className="download-container">
    <div className="download-container__info">
      <h2 className="download-container__title">Download app</h2>
      <p className="download-container__text">
        The best social trading experience.
        <br />
        Download the Genesis Vision app today.
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
      >
        <span className="download-container__play-btn" />
      </a>
    </div>
  </div>
);

export default DownloadContainer;
