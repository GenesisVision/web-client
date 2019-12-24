import BackButton from "components/back-button/back-button";
import { TitleContext } from "components/link/link.helper";
import * as React from "react";
import DocumentTitle from "react-document-title";
import { useTranslation } from "react-i18next";

const _Page: React.FC<Props> = ({ title, children }) => {
  const [t] = useTranslation();
  return (
    <DocumentTitle title={t("app.title") + title}>
      <TitleContext.Provider value={title}>
        <>
          <div>
            <BackButton />
          </div>
          {children}
        </>
      </TitleContext.Provider>
    </DocumentTitle>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const Page = React.memo(_Page);
export default Page;
