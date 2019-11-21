import SvgLoader from "components/svg-loader/svg-loader";
import * as React from "react";

const AssetEditSmallLoader = () => (
  <SvgLoader height={125} width={350}>
    <rect x="0" y="0" rx="8" ry="8" width="150" height="20" />
    <rect x="0" y="45" rx="8" ry="8" width="350" height="20" />
    <rect x="0" y="89" rx="22" ry="22" width="135" height="36" />
  </SvgLoader>
);

const AssetSettingsLoader = () => {
  return (
    <div className="asset-settings">
      <div className="asset-settings__header">
        <SvgLoader height={80} width={270}>
          <rect x="0" y="0" rx="8" ry="8" width="270" height="40" />
        </SvgLoader>
      </div>
      <div className="asset-settings__block">
        <div className="asset-settings__block-wrapper">
          <AssetEditSmallLoader />
        </div>
        <div className="asset-settings__block-wrapper">
          <SvgLoader height={180} width={500}>
            <rect x="0" y="0" rx="8" ry="8" width="500" height="120" />
            <rect x="0" y="144" rx="22" ry="22" width="135" height="36" />
          </SvgLoader>
        </div>
      </div>
      <div className="asset-settings__block">
        <AssetEditSmallLoader />
      </div>
      <div className="asset-settings__block">
        <div className="asset-settings__block-wrapper">
          <SvgLoader height={255} width={200}>
            <rect x="0" y="0" rx="8" ry="8" width="150" height="20" />
            <rect x="0" y="45" rx="8" ry="8" width="200" height="210" />
          </SvgLoader>
        </div>
        <div className="asset-settings__block-wrapper">
          <SvgLoader height={115} width={230}>
            <rect x="0" y="0" rx="8" ry="8" width="150" height="20" />
            <rect x="0" y="45" rx="8" ry="8" width="230" height="35" />
            <rect x="0" y="100" rx="8" ry="8" width="230" height="15" />
          </SvgLoader>
        </div>
        <div className="asset-settings__block-wrapper">
          <SvgLoader height={240} width={760}>
            <rect x="0" y="0" rx="8" ry="8" width="150" height="20" />
            <rect x="0" y="45" rx="8" ry="8" width="760" height="35" />
            <rect x="0" y="100" rx="8" ry="8" width="230" height="15" />
            <rect x="0" y="204" rx="22" ry="22" width="91" height="36" />
          </SvgLoader>
        </div>
      </div>
      <div className="asset-settings__block">
        <div className="asset-settings__block-wrapper">
          <SvgLoader height={170} width={230}>
            <rect x="0" y="0" rx="8" ry="8" width="150" height="20" />
            <rect x="0" y="45" rx="8" ry="8" width="230" height="35" />
            <rect x="0" y="134" rx="22" ry="22" width="91" height="36" />
          </SvgLoader>
        </div>
      </div>
      <div className="asset-settings__block">
        <div className="asset-settings__block-wrapper">
          <SvgLoader height={275} width={500}>
            <rect x="0" y="0" rx="8" ry="8" width="150" height="20" />
            <rect x="0" y="45" rx="8" ry="8" width="350" height="20" />
            <rect x="0" y="85" rx="8" ry="8" width="500" height="120" />
            <rect x="0" y="239" rx="22" ry="22" width="135" height="36" />
          </SvgLoader>
        </div>
      </div>
      <div className="asset-settings__block">
        <div className="asset-settings__block-wrapper">
          <SvgLoader height={241} width={485}>
            <rect x="0" y="0" rx="8" ry="8" width="150" height="20" />
            <rect x="0" y="45" rx="8" ry="8" width="150" height="16" />
            <rect x="0" y="85" rx="8" ry="8" width="230" height="35" />
            <rect x="0" y="145" rx="8" ry="8" width="230" height="20" />
            <rect x="255" y="45" rx="8" ry="8" width="150" height="16" />
            <rect x="255" y="85" rx="8" ry="8" width="230" height="35" />
            <rect x="255" y="145" rx="8" ry="8" width="230" height="20" />
            <rect x="0" y="205" rx="22" ry="22" width="91" height="36" />
          </SvgLoader>
        </div>
      </div>
    </div>
  );
};

export default AssetSettingsLoader;
