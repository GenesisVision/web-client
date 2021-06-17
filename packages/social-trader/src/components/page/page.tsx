import BackButton from "components/back-button/back-button";
import { TitleContext } from "components/link/link.helper";
import {
  IPageSeoWrapperProps,
  PageSeoWrapper
} from "components/page/page-seo-wrapper";
import { Row } from "components/row/row";
import { useRefLink } from "hooks/ref-link";
import * as React from "react";
import { PropsWithChildren } from "react";

const Page = ({
  type,
  showTitle,
  title,
  description,
  children,
  schemas,
  previewImage,
  url,
  noIndex,
  noFollow
}: PropsWithChildren<Props>) => {
  useRefLink();
  return (
    <TitleContext.Provider value={title}>
      <PageSeoWrapper
        noFollow={noFollow}
        noIndex={noIndex}
        type={type}
        url={url}
        schemas={schemas}
        title={title}
        description={description}
        previewImage={previewImage}
      >
        <div>
          <BackButton />
        </div>
        {showTitle && (
          <Row size={"xlarge"}>
            <h1>{title}</h1>
          </Row>
        )}
        <Row onlyOffset size={"large"}>
          {children}
        </Row>
      </PageSeoWrapper>
    </TitleContext.Provider>
  );
};

interface Props extends IPageSeoWrapperProps {}

export default Page;
