import { SocialLinkViewModelTypeEnum } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import GVButton from "shared/components/gv-button";
import CopyIcon from "shared/components/icon/copy-icon";
import SocialLinksBlock from "shared/components/social-links-block/social-links-block";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import Copy from "shared/decorators/with-copy";

const SocialLinksMock = {
  url: "",
  logo: "",
  name: "",
  value: "",
  type: "Undefined" as SocialLinkViewModelTypeEnum
};
const SocialLinksMocks = Array(5)
  .fill("")
  .map(() => SocialLinksMock);

const _InviteBlock: React.FC<{ data?: string }> = ({ data = "" }) => {
  const [t] = useTranslation();
  return (
    <div>
      <div className="referral-program__title">
        <h4>{t("profile-page.referral-program.title")}</h4>
      </div>
      <div className="referral-program__link-block">
        {t("profile-page.referral-program.referral-link")}
        <div className="referral-program__link">{data}</div>
        <Copy>
          {({ copy }) => (
            <GVButton
              color="secondary"
              onClick={() => copy(data)}
              variant="text"
            >
              <>
                <CopyIcon primary />
                &nbsp;
                {t("buttons.copy")}
              </>
            </GVButton>
          )}
        </Copy>
      </div>
      <div className="referral-program__share-block">
        {t("profile-page.referral-program.share-your-passion")}
        <SocialLinksBlock socialLinks={SocialLinksMocks} />
      </div>
    </div>
  );
};
export const InviteBlock = withBlurLoader(React.memo(_InviteBlock));
