import "./asset-avatar-with-name.scss";

import AssetAvatar, {
  IAssetAvatarProps
} from "components/avatar/asset-avatar/asset-avatar";
import * as React from "react";

const _AssetAvatarWithName: React.FC<Props> = props => {
  const { name } = props;
  return (
    <div className="asset-avatar-with-name">
      <div className="asset-avatar-with-name__avatar">
        <AssetAvatar {...props} />
      </div>
      <div className="asset-avatar-with-name__name">{name}</div>
    </div>
  );
};

interface Props extends IAssetAvatarProps {
  name: string | JSX.Element;
}

const AssetAvatarWithName = React.memo(_AssetAvatarWithName);
export default AssetAvatarWithName;
