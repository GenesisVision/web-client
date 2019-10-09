import "./social-links.scss";

import {
  CancelablePromise,
  SocialLinkViewModel,
  UpdateSocialLinkViewModel
} from "gv-api-web";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import SettingsBlock from "shared/components/settings-block/settings-block";
import withLoader from "shared/decorators/with-loader";
import useApiRequest from "shared/hooks/api-request.hook";
import { SetSubmittingType } from "shared/utils/types";

import {
  fetchSocialLinks,
  updateSocialLink
} from "../services/social-links.service";
import SocialLinkForm from "./social-link/social-link-form";
import SocialLinksLoader from "./social-links-loader";

const _Links: React.FC<ILinksProps> = ({ socialLinks, onSubmit }) => (
  <>
    {socialLinks.map(x => (
      <SocialLinkForm key={x.type} socialLink={x} onSubmit={onSubmit} />
    ))}
  </>
);
const Links = React.memo(withLoader(_Links));

export type TOnEditLinkSubmitFunc = (
  values: UpdateSocialLinkViewModel,
  setSubmitting: SetSubmittingType
) => CancelablePromise<void>;

interface ILinksProps {
  socialLinks: SocialLinkViewModel[];
  onSubmit: TOnEditLinkSubmitFunc;
}

const _SocialLinksContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { data: socialLinks, sendRequest: getSocialLinks } = useApiRequest<
    SocialLinkViewModel[]
  >({ request: fetchSocialLinks });
  const { sendRequest: setSocialLinks } = useApiRequest<SocialLinkViewModel[]>({
    request: args => dispatch(updateSocialLink(args))
  });
  useEffect(() => {
    getSocialLinks();
  }, []);

  const _handleSubmitSocialLink: TOnEditLinkSubmitFunc = (
    { type, value }: UpdateSocialLinkViewModel,
    setSubmitting: SetSubmittingType
  ) => setSocialLinks({ type, value }, setSubmitting).then(getSocialLinks);
  const handleSubmitSocialLink = useCallback(_handleSubmitSocialLink, []);

  return (
    <div className="asset-settings profile__container--padding-top social-links">
      <SettingsBlock>
        <Links
          condition={socialLinks !== undefined}
          loader={<SocialLinksLoader />}
          socialLinks={socialLinks!}
          onSubmit={handleSubmitSocialLink}
        />
      </SettingsBlock>
    </div>
  );
};

const SocialLinksContainer = React.memo(_SocialLinksContainer);
export default SocialLinksContainer;
