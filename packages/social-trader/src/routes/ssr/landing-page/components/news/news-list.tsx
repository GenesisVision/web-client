import "./news-list.scss";

import classNames from "classnames";
import React from "react";
import NewsItem from "routes/ssr/landing-page/components/news/news-item";

interface Props {
  className?: string;
}

const _NewsList: React.FC<Props> = ({ className }) => (
  <ul className={classNames("news-list", className)}>
    <NewsItem
      title="Genesisi vision"
      text="A Global Cryptocurrency LeaderSince 2013"
    />
    <NewsItem
      title="Genesisi vision"
      text="A Global Cryptocurrency LeaderSince 2013"
    />
    <NewsItem
      title="Genesisi vision"
      text="A Global Cryptocurrency LeaderSince 2013"
      tag="HOT"
    />
    <NewsItem
      title="Genesisi vision"
      text="A Global Cryptocurrency LeaderSince 2013"
    />
  </ul>
);

const NewsList = React.memo(_NewsList);
export default NewsList;
