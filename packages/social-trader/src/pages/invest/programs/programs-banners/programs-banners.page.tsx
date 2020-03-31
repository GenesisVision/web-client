import ImageBaseElement from "components/avatar/image-base.element";
import DetailsBlock from "components/details/details-block";
import Page from "components/page/page";
import withDefaultLayout from "decorators/with-default-layout";
import { ProgramFollowDetailsFull } from "gv-api-web";
import { NextPage } from "next";
import React from "react";
import { compose } from "redux";
import { api } from "services/api-client/swagger-custom-client";

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
  const program = await api.programs().getProgramDetails(id as string);

  return {
    program
  };
};

const ProgramsBannersPage = compose(withDefaultLayout)(_Page);
export default ProgramsBannersPage;
