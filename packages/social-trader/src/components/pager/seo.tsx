import Head from "next/head";
import { useRouter } from "next/router";
import * as querystring from "querystring";
import React from "react";

export const _SeoPagination: React.FC<{ current: number; total: number }> = ({
  current,
  total
}) => {
  const { pathname } = useRouter();
  const prev = querystring.stringify({ page: current - 1 });
  const canonical = querystring.stringify({ page: current });
  const next = querystring.stringify({ page: current + 1 });

  const prevLink = current === 2 ? pathname : `${pathname}?${prev}`;
  const canonicalLink = current === 1 ? pathname : `${pathname}?${canonical}`;
  const nextLink = `${pathname}?${next}`;

  return (
    <Head>
      {current > 1 && <link key={"prev"} rel={"prev"} href={`${prevLink}`} />}
      <link key={"canonical"} rel={"canonical"} href={canonicalLink} />
      {current < total && <link key={"next"} rel={"next"} href={nextLink} />}
    </Head>
  );
};

const SeoPagination = React.memo(_SeoPagination);
export default SeoPagination;
