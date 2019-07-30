import { NextPage } from "next";
import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";
import Page from "shared/components/page/page";

const ProgramDetails: NextPage = () => {
  return (
    <Page title="title">
      <>1</>
    </Page>
  );
};

ProgramDetails.getInitialProps = async ctx => {
  return {};
};

export default withDefaultLayout(ProgramDetails);
