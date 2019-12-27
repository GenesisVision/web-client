import "routes/ssr/landing-page/styles/home.scss";

import React from "react";
import FirstSlider from "routes/ssr/landing-page/components/first-slider/first-slifer";
import NewsList from "routes/ssr/landing-page/components/news/news-list";
import { newsItems } from "routes/ssr/landing-page/static-data/news";
import { slides } from "routes/ssr/landing-page/static-data/slides";

const FirstScreen: React.FC = () => (
  <section className="home__section home__section--first-screen">
    <div className="home__container">
      <FirstSlider className="home__grid-row" slidesItems={slides} />
      <div className="home__grid-row home__grid-row--mob-wider">
        <NewsList className="home__grid-item" newsItems={newsItems} />
      </div>
    </div>
  </section>
);

export default FirstScreen;
