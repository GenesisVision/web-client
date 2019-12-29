import "./news-list.scss";

import classNames from "classnames";
import React from "react";
import NewsItem from "routes/ssr/landing-page/components/news/news-item";
import { TNews } from "routes/ssr/landing-page/static-data/news";

interface Props {
  className?: string;
  newsItems: TNews[];
}

const _NewsList: React.FC<Props> = ({ className, newsItems }) => (
  <ul className={classNames("news-list", className)}>
    {newsItems.map((item, index) => (
      <NewsItem
        key={index}
        title={item.title}
        text={item.text}
        tag={item.tag}
        url={item.url}
      />
    ))}
  </ul>
);

const NewsList = React.memo(_NewsList);
export default NewsList;
