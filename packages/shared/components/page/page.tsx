import * as React from "react";
import DocumentTitle from "react-document-title";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import BackButton from "shared/components/back-button/back-button";
import withRole, { WithRoleProps } from "shared/decorators/with-role";

const _Page: React.FC<Props> = ({ t, title, children, role }) => (
  <DocumentTitle title={t(`${role}.app.title`) + title}>
    <>
      <BackButton />
      {children}
    </>
  </DocumentTitle>
);

interface Props extends WithTranslation, OwnProps, WithRoleProps {}

interface OwnProps {
  title: string;
}

const Page = compose<React.ComponentType<OwnProps>>(
  withRole,
  translate(),
  React.memo
)(_Page);
export default Page;
