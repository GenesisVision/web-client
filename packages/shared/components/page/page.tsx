import * as React from "react";
import DocumentTitle from "react-document-title";
import { useTranslation } from "react-i18next";
import BackButton from "shared/components/back-button/back-button";
import useRole from "shared/hooks/use-role.hook";

const _Page: React.FC<Props> = ({ title, children }) => {
  const [t] = useTranslation();
  const role = useRole();
  return (
    <DocumentTitle title={t(`${role}.app.title`) + title}>
      <>
        <BackButton />
        {children}
      </>
    </DocumentTitle>
  );
};

interface Props {
  title: string;
}

const Page = React.memo(_Page);
export default Page;
