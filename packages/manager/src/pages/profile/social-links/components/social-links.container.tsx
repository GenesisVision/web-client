import "./social-links.scss";

import {
  CancelablePromise,
  SocialLinkViewModel,
  UpdateSocialLinkViewModelTypeEnum
} from "gv-api-web";
import * as React from "react";
import { ResolveThunks, connect } from "react-redux";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators } from "redux";
import SettingsBlock from "shared/components/settings-block/settings-block";
import withLoader from "shared/decorators/with-loader";

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

interface ILinksProps {
  socialLinks: SocialLinkViewModel[];
  onSubmit(id: string, value: string): CancelablePromise<void>;
}

class _SocialLinksContainer extends React.PureComponent<Props, State> {
  state: State = {
    socialLinks: undefined
  };

  componentDidMount() {
    this.updateSocialLinks();
  }

  handleSubmitSocialLink = (
    type: UpdateSocialLinkViewModelTypeEnum,
    value: string
  ) => {
    return this.props.service.updateSocialLink({ type, value }).then(() => {
      this.updateSocialLinks();
    });
  };

  updateSocialLinks = () => {
    fetchSocialLinks().then(data => {
      this.setState({ socialLinks: data.socialLinks });
    });
  };

  render() {
    const { socialLinks } = this.state;
    return (
      <div className="asset-settings profile__container--padding-top social-links">
        <SettingsBlock
          content={
            <Links
              condition={socialLinks !== undefined}
              loader={<SocialLinksLoader />}
              socialLinks={socialLinks!}
              onSubmit={this.handleSubmitSocialLink}
            />
          }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): Props => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      updateSocialLink
    },
    dispatch
  )
});

const SocialLinksContainer = connect(
  null,
  mapDispatchToProps
)(_SocialLinksContainer);
export default SocialLinksContainer;

interface State {
  socialLinks?: SocialLinkViewModel[];
}

interface Props {
  service: ResolveThunks<ServiceThunks>;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  updateSocialLink: typeof updateSocialLink;
}
