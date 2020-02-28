import DetailsBlock from "components/details/details-block";
import Page from "components/page/page";
import withDefaultLayout from "decorators/with-default-layout";
import { ProgramFollowDetailsFull } from "gv-api-web";
import { NextPage } from "next";
import React from "react";
import { compose } from "redux";
import programsApi from "services/api-client/programs-api";

const _Page: NextPage<{ program: ProgramFollowDetailsFull }> = ({
  program
}) => {
  const title = `Banners for program: ${program.publicInfo.title}`;
  return (
    <Page description={title} title={title}>
      <DetailsBlock horizontalPaddings>
        <h3>PNG banners</h3>
        <img
          src={`http://localhost:3000/api/programs/${program.publicInfo.url}/250x250.png`}
        />
        <img
          src={`http://localhost:3000/api/programs/${program.publicInfo.url}/728x89.png`}
        />
        <img
          src={`http://localhost:3000/api/programs/${program.publicInfo.url}/240x400.png`}
        />
      </DetailsBlock>
      <DetailsBlock horizontalPaddings>
        <h3>SVG banners</h3>
        <embed
          src={`http://localhost:3000/api/programs/${program.publicInfo.url}/250x250.svg`}
        />
        <embed
          src={`http://localhost:3000/api/programs/${program.publicInfo.url}/728x89.svg`}
        />
        <embed
          src={`http://localhost:3000/api/programs/${program.publicInfo.url}/240x400.svg`}
        />
      </DetailsBlock>
    </Page>
  );
};

_Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const program = await programsApi.getProgramDetails(id as string);

  return {
    program
  };
};

const ProgramsBannersPage = compose(withDefaultLayout)(_Page);
export default ProgramsBannersPage;
