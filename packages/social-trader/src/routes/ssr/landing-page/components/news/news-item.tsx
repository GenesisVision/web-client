import React from "react";
import { TNews } from "routes/ssr/landing-page/static-data/news";

const _NewsItem: React.FC<TNews> = ({ title, text, tag, url }) => (
  <li className="news-list__item">
    <a
      title={title}
      href={url}
      className="news-list__item-link"
      target="_blank"
    >
      <div className="news-list__item-title">
        {tag && <span className="news-list__item-tag">{tag}</span>}
        {title}
      </div>
      <div className="news-list__item-text">{text}</div>
    </a>
  </li>
);
const NewsItem = React.memo(_NewsItem);
export default NewsItem;
