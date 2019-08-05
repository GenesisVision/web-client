import { NextPageContext } from "next";
import Router from "next/router";
import { PROGRAMS_ROUTE } from "shared/routes/programs.routes";

const Index = () => {
  return null;
};

Index.getInitialProps = async (ctx: NextPageContext) => {
  if (ctx.res) {
    ctx.res.writeHead(301, { Location: PROGRAMS_ROUTE });
    ctx.res.end();
    return {};
  }

  Router.push(PROGRAMS_ROUTE);
  return {};
};

export default Index;
