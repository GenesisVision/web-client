import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import { useTranslation } from "i18n";
import { JoinButton } from "pages/landing-page/components/join-button";
import { TInfoItem } from "pages/landing-page/static-data/info";
import React from "react";

const _InfoItem: React.FC<TInfoItem> = ({ texts, image, button }) => {
  const { t } = useTranslation();
  return (
    <li
      className={classNames("info-list__item", {
        "info-list__item--bg-transparent": image
      })}
    >
      {image && (
        <ImageBaseElement
          src={image}
          alt={t("landing-page:links.trade")}
          className="info-list__item-image"
        />
      )}
      {texts && (
        <div className="info-list__item-text">
          {texts.map((item, index) =>
            item.bold ? (
              <b key={index}>{t(item.text)}</b>
            ) : (
              <span key={index}>{t(item.text)}</span>
            )
          )}
        </div>
      )}
      {button && (
        <div className="info-list__item-btn">
          <JoinButton href={button.link}>{t(button.text)}</JoinButton>
        </div>
      )}
    </li>
  );
};
const InfoItem = React.memo(_InfoItem);
export default InfoItem;
