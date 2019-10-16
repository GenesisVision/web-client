import { NextPageContext } from "next";
import { Push } from "shared/components/link/link";
import { normalizeUrlString } from "shared/components/link/link.helper";
import { PROGRAMS_ROUTE } from "shared/routes/programs.routes";

const IndexPage = () => {
  return null;
};

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
  if (ctx.res) {
    ctx.res.writeHead(301, { Location: normalizeUrlString(PROGRAMS_ROUTE) });
    ctx.res.end();
    return {};
  }

  Push(PROGRAMS_ROUTE);
  return {};
};

export default IndexPage;
