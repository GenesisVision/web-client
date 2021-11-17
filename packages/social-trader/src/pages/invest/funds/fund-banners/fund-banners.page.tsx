import BannerPreview from "components/banner-preview/banner-preview";
import { DefaultBlock } from "components/default.block/default.block";
import Page from "components/page/page";
import withDefaultLayout from "decorators/with-default-layout";
import { FundDetailsFull } from "gv-api-web";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { api } from "services/api-client/swagger-custom-client";

const _Page: NextPage<{ fund: FundDetailsFull }> = ({ fund }) => {
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  if (!origin) return null;

  const title = `Banners for fund: ${fund.publicInfo.title}`;
  const banner800png = `${origin}/banners/funds/${fund.publicInfo.url}/800x418.png`;
  const banner800svg = `${origin}/banners/funds/${fund.publicInfo.url}/800x418.svg`;
  const banner600png = `${origin}/banners/funds/${fund.publicInfo.url}/600x600.png`;
  const banner600svg = `${origin}/banners/funds/${fund.publicInfo.url}/600x600.svg`;
  const banner250png = `${origin}/banners/funds/${fund.publicInfo.url}/250x250.png`;
  const banner250svg = `${origin}/banners/funds/${fund.publicInfo.url}/250x250.svg`;
  const banner728png = `${origin}/banners/funds/${fund.publicInfo.url}/728x89.png`;
  const banner728svg = `${origin}/banners/funds/${fund.publicInfo.url}/728x89.svg`;
  const banner240png = `${origin}/banners/funds/${fund.publicInfo.url}/240x400.png`;
  const banner240svg = `${origin}/banners/funds/${fund.publicInfo.url}/240x400.svg`;

  return (
    <Page description={title} title={title}>
      <DefaultBlock solid>
        <h3>PNG banners</h3>
        <BannerPreview url={banner800png} title={fund.publicInfo.title} />
        <BannerPreview url={banner600png} title={fund.publicInfo.title} />
        <BannerPreview url={banner250png} title={fund.publicInfo.title} />
        <BannerPreview url={banner728png} title={fund.publicInfo.title} />
        <BannerPreview url={banner240png} title={fund.publicInfo.title} />
      </DefaultBlock>
      <DefaultBlock solid>
        <h3>SVG banners</h3>
        <BannerPreview
          url={banner800svg}
          title={fund.publicInfo.title}
          type={"svg"}
        />
        <BannerPreview
          url={banner600svg}
          title={fund.publicInfo.title}
          type={"svg"}
        />
        <BannerPreview
          url={banner250svg}
          title={fund.publicInfo.title}
          type={"svg"}
        />
        <BannerPreview
          url={banner728svg}
          title={fund.publicInfo.title}
          type={"svg"}
        />
        <BannerPreview
          url={banner240svg}
          title={fund.publicInfo.title}
          type={"svg"}
        />
      </DefaultBlock>
    </Page>
  );
};

_Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const fund = await api.funds().getFundDetails(id as string);

  return {
    fund
  };
};

const FundBannersPage = compose(withDefaultLayout)(_Page);
export default FundBannersPage;
