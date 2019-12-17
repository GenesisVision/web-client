import { ItemsViewModelProgramDetailsListItem } from "gv-api-web";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import programsApi from "services/api-client/programs-api";
import { composeProgramDetailsUrl } from "utils/compose-url";

const IndexPage: NextPage<{
  programs: ItemsViewModelProgramDetailsListItem;
}> = ({ programs }) => {
  return (
    <main>
      <h1>Mega Landing Page</h1>
      <section>
        <h2>Our programs(12/{programs.total})</h2>
        <ul>
          {programs.items.map(program => {
            return (
              <li key={program.id}>
                <Link href={composeProgramDetailsUrl(program.url)}>
                  <a>{program.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default IndexPage;

IndexPage.getInitialProps = async () => {
  try {
    const programs = await programsApi.getPrograms({
      skip: 0,
      take: 12
    });
    return { programs };
  } catch (e) {
    const programs = {
      total: 0,
      items: []
    };
    return { programs };
  }
};
