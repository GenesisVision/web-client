import classNames from "classnames";
import React from "react";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  text?: string;
  textBold?: string;
  className?: string;
  image?: string;
  button?: {
    text: string;
    link?: string;
  };
  transparent?: boolean;
}

const _TabInfoItem: React.FC<Props> = ({
  text,
  textBold,
  className,
  image,
  button,
  transparent
}) => (
  <li
    className={classNames("tab-info-list__item", className, {
      "tab-info-list__item--bg-transparent": transparent
    })}
  >
    {image && <img src={image} alt="" className="tab-info-list__item-image" />}
    {(text || textBold) && (
      <div className="tab-info-list__item-text">
        {text}
        {textBold && <b>{textBold}</b>}
      </div>
    )}
    {button && (
      <div className="tab-info-list__item-btn">
        <LPButton href={button.link}>{button.text}</LPButton>
      </div>
    )}
  </li>
);
const TabInfoItem = React.memo(_TabInfoItem);
export default TabInfoItem;
