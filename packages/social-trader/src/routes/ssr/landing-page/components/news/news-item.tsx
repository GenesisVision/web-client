import { PlatformNews } from "gv-api-web";
import React from "react";

const _NewsItem: React.FC<PlatformNews> = ({ title, body, isHot, url }) => (
  <li className="news-list__item">
    <a
      href={url}
      className="news-list__item-link"
      title={title}
      target="_blank"
    >
      <div className="news-list__item-title">
        {isHot && <span className="news-list__item-tag">HOT</span>}
        {title}
      </div>
      <div className="news-list__item-text">{body}</div>
    </a>
  </li>
);
const NewsItem = React.memo(_NewsItem);
export default NewsItem;
