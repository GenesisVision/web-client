import React from "react";

interface IStatItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  text: string;
  tag?: string;
  url?: string;
}

const _NewsItem: React.FC<IStatItemProps> = ({ title, text, tag, url }) => (
  <li className="news-list__item">
    <a href={url} className="news-list__item-link">
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
