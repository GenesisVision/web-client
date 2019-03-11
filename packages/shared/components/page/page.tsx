import * as React from "react";
import DocumentTitle from "react-document-title";
import { WithTranslation, withTranslation } from "react-i18next";
import BackButton from "shared/components/back-button/back-button";

interface IPage {
  title: string;
}
const Page: React.FC<IPage & WithTranslation> = ({ t, title, children }) => {
  return (
    <DocumentTitle
      title={t(`${process.env.REACT_APP_PLATFORM}.app.title`) + title}
    >
      <React.Fragment>
        <BackButton />
        {children}
      </React.Fragment>
    </DocumentTitle>
  );
};

export default withTranslation()(Page);
