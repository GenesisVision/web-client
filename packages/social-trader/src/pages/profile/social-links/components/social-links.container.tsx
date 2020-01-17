import "./social-links.scss";

import SettingsBlock from "components/settings-block/settings-block";
import withLoader from "decorators/with-loader";
import { SocialLinkViewModel, UpdateSocialLinkViewModel } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { SetSubmittingType } from "utils/types";

import {
  fetchSocialLinks,
  updateSocialLink
} from "../services/social-links.service";
import SocialLinkForm from "./social-link/social-link-form";
import SocialLinksLoader from "./social-links-loader";

const _Links: React.FC<ILinksProps> = ({ socialLinks, onSubmit }) => (
  <div>
    {socialLinks.map(x => (
      <SocialLinkForm key={x.type} socialLink={x} onSubmit={onSubmit} />
    ))}
  </div>
);
const Links = React.memo(withLoader(_Links));

export type TOnEditLinkSubmitFunc = (
  values: UpdateSocialLinkViewModel,
  setSubmitting: SetSubmittingType
) => Promise<void>;

interface ILinksProps {
  socialLinks: SocialLinkViewModel[];
  onSubmit: TOnEditLinkSubmitFunc;
}

const _SocialLinksContainer: React.FC = () => {
  const { data: socialLinks, sendRequest: getSocialLinks } = useApiRequest<
    SocialLinkViewModel[]
  >({ request: fetchSocialLinks });
  const { sendRequest: setSocialLinks } = useApiRequest<SocialLinkViewModel[]>({
    middleware: [getSocialLinks],
    request: updateSocialLink,
    successMessage: "profile-page.social-links.notifications.edit-success"
  });
  useEffect(() => {
    getSocialLinks();
  }, []);

  const _handleSubmitSocialLink: TOnEditLinkSubmitFunc = (
    { type, value }: UpdateSocialLinkViewModel,
    setSubmitting: SetSubmittingType
  ) => setSocialLinks({ type, value }, setSubmitting);
  const handleSubmitSocialLink = useCallback(_handleSubmitSocialLink, []);

  return (
    <SettingsBlock>
      <Links
        condition={socialLinks !== undefined}
        loader={<SocialLinksLoader />}
        socialLinks={socialLinks!}
        onSubmit={handleSubmitSocialLink}
      />
    </SettingsBlock>
  );
};

const SocialLinksContainer = React.memo(_SocialLinksContainer);
export default SocialLinksContainer;
