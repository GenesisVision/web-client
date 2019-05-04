import * as React from "react";
import DocumentTitle from "react-document-title";
import { InjectedTranslateProps, translate } from "react-i18next";
import BackButton from "shared/components/back-button/back-button";
import { ROLE_ENV } from "shared/constants/constants";

const _Page: React.FC<Props> = ({ t, title, children }) => (
  <DocumentTitle title={t(`${ROLE_ENV}.app.title`) + title}>
    <>
      <BackButton />
      {children}
    </>
  </DocumentTitle>
);

interface Props extends InjectedTranslateProps {
  title: string;
}

const Page = React.memo(translate()(_Page));
export default Page;
