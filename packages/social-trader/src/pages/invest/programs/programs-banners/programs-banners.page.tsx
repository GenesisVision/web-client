import React from "react";
import { compose } from "redux";
import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import { ProgramFollowDetailsFull } from "gv-api-web";
import Page from "components/page/page";
import DetailsBlock from "components/details/details-block";
import programsApi from "services/api-client/programs-api";
import ImageBase from "components/avatar/image-base";
import ImageBaseElement from "components/avatar/image-base.element";

const _Page: NextPage<{ program: ProgramFollowDetailsFull }> = ({
  program
}) => {
  const title = `Banners for program: ${program.publicInfo.title}`;
  return (
    <Page description={title} title={title}>
      <DetailsBlock horizontalPaddings>
        <ImageBaseElement
          src={`/api/programs/${program.publicInfo.url}/200x300`}
          alt={"banner 200x300"}
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
