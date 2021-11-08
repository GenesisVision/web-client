import BannerPreview from "components/banner-preview/banner-preview";
import { DefaultBlock } from "components/default.block/default.block";
import Page from "components/page/page";
import withDefaultLayout from "decorators/with-default-layout";
import { ProgramFollowDetailsFull } from "gv-api-web";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { api } from "services/api-client/swagger-custom-client";

const _Page: NextPage<{ follow: ProgramFollowDetailsFull }> = ({ follow }) => {
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  if (!origin) return null;

  const title = `Banners for follow: ${follow.publicInfo.title}`;
  const banner800png = `${origin}/banners/follow/${follow.publicInfo.url}/800x418.png`;
  const banner800svg = `${origin}/banners/follow/${follow.publicInfo.url}/800x418.svg`;
  const banner600png = `${origin}/banners/follow/${follow.publicInfo.url}/600x600.png`;
  const banner600svg = `${origin}/banners/follow/${follow.publicInfo.url}/600x600.svg`;
  const banner250png = `${origin}/banners/follow/${follow.publicInfo.url}/250x250.png`;
  const banner250svg = `${origin}/banners/follow/${follow.publicInfo.url}/250x250.svg`;
  const banner728png = `${origin}/banners/follow/${follow.publicInfo.url}/728x89.png`;
  const banner728svg = `${origin}/banners/follow/${follow.publicInfo.url}/728x89.svg`;
  const banner240png = `${origin}/banners/follow/${follow.publicInfo.url}/240x400.png`;
  const banner240svg = `${origin}/banners/follow/${follow.publicInfo.url}/240x400.svg`;

  return (
    <Page description={title} title={title}>
      <DefaultBlock solid>
        <h3>PNG banners</h3>
        <BannerPreview url={banner800png} title={follow.publicInfo.title} />
        <BannerPreview url={banner600png} title={follow.publicInfo.title} />
        <BannerPreview url={banner250png} title={follow.publicInfo.title} />
        <BannerPreview url={banner728png} title={follow.publicInfo.title} />
        <BannerPreview url={banner240png} title={follow.publicInfo.title} />
      </DefaultBlock>
      <DefaultBlock solid>
        <h3>SVG banners</h3>
        <BannerPreview
          url={banner800svg}
          title={follow.publicInfo.title}
          type={"svg"}
        />
        <BannerPreview
          url={banner600svg}
          title={follow.publicInfo.title}
          type={"svg"}
        />
        <BannerPreview
          url={banner250svg}
          title={follow.publicInfo.title}
          type={"svg"}
        />
        <BannerPreview
          url={banner728svg}
          title={follow.publicInfo.title}
          type={"svg"}
        />
        <BannerPreview
          url={banner240svg}
          title={follow.publicInfo.title}
          type={"svg"}
        />
      </DefaultBlock>
    </Page>
  );
};

_Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const follow = await api.follows().getFollowAssetDetails(id as string);

  return {
    follow
  };
};

const FollowBannersPage = compose(withDefaultLayout)(_Page);
export default FollowBannersPage;
