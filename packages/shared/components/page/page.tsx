import * as React from "react";
import DocumentTitle from "react-document-title";
import { InjectedTranslateProps, translate } from "react-i18next";
import BackButton from "shared/components/back-button/back-button";
import { ROLE_ENV } from "shared/constants/constants";

interface IPage {
  title: string;
}
const Page: React.FC<IPage & InjectedTranslateProps> = ({
  t,
  title,
  children
}) => {
  return (
    <DocumentTitle title={t(`${ROLE_ENV}.app.title`) + title}>
      <React.Fragment>
        <BackButton />
        {children}
      </React.Fragment>
    </DocumentTitle>
  );
};

export default translate()(Page);
